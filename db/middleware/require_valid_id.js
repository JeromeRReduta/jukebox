import throwMiddlewareError from "./middleware_error.js";

const SQL_MAX_INT = 2147483647;
export default async function requireValidId(req, res, next, id) {
  try {
    const validId = !Number.isInteger(id) && id > 0 && id <= SQL_MAX_INT;
    if (!validId) {
      throwMiddlewareError({ code: 400, message: "Bad int!" });
    }
    next();
  } catch (e) {
    next(e);
  }
}
