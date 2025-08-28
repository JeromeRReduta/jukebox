import throwMiddlewareError from "#db/middleware/middleware_error";
import requireValidId from "#db/middleware/require_valid_id";
import express from "express";
import requireBody from "#db/middleware/require_body";

const router = express.Router();
router.use((req, res, next) => {
  if (!req.playlistRepo || !req.playlistsTracksRepo) {
    throwMiddlewareError({
      code: 500,
      message: "Someone forgot to link the repo properly - it's me :)",
    });
  }
  next();
});

router
  .route("/")
  .get(async (req, res) => {
    res.status(200).send(await req.playlistRepo.getAllAsync());
  })
  .post(requireBody("name", "description"), async (req, res) => {
    const newPlaylist = await req.playlistRepo.createAsync({
      name: req.body.name,
      description: req.body.description,
    });
    res.status(200).send(newPlaylist);
  });

router.param("id", requireValidId);
router.param("id", async (req, res, next, id) => {
  try {
    const playlist = await req.playlistRepo.getByIdAsync({
      id: +id,
    });
    if (!playlist) {
      throwMiddlewareError({ code: 404, message: "No matching playlist!" });
    }
    req.playlist = playlist;
    next();
  } catch (e) {
    next(e);
  }
});
router.body;
router.route("/:id").get((req, res, next) => {
  res.status(200).send(req.playlist);
});

router
  .route("/:id/tracks")
  .get(async (req, res, next) => {
    const playlistWithTracks = await req.playlistRepo.getAllAsync({
      id: +req.params.id,
      includeTracks: true,
    });
    res.status(200).send(playlistWithTracks);
  })
  .post(
    requireBody("trackId"),
    (req, res, next) => requireValidId(req, res, next, +req.body.trackId), // cant tell if this is unholy or not
    async (req, res, next) => {
      const newRelation = await req.playlistsTracksRepo.createAsync({
        playlist_id: +req.params.id,
        track_id: +req.body.trackId,
      });
      res.status(200).send(newRelation);
    }
  );

export default router;
