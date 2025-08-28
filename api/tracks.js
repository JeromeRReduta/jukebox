import throwMiddlewareError from "#db/middleware/middleware_error";
import requireValidId from "#db/middleware/require_valid_id";
import express from "express";

const router = express.Router();

router.use((req, res, next) => {
  if (!req.playlistRepo || !req.trackRepo) {
    throwMiddlewareError({
      code: 500,
      message: "Someone forgot to link the repo properly - it's me :)",
    });
  }
  next();
});

router.route("/").get(async (req, res) => {
  return res.status(200).send(await req.trackRepo.getAllAsync());
});

router.param("id", requireValidId);
router.param("id", async (req, res, next, id) => {
  try {
    const track = await req.trackRepo.getByIdAsync({ id });
    if (!track) {
      throwMiddlewareError({ code: 404, message: "Doesn't exist!" });
    }
    req.track = track;
    next();
  } catch (e) {
    next(e);
  }
});
router.route("/:id").get((req, res) => {
  res.status(200).send(req.track);
});

export default router;
