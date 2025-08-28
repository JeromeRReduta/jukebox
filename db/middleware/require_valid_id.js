import throwMiddlewareError from "./middleware_error.js";

const SQL_MAX_INT = 2147483647;
export default async function requireValidId(req, res, next, idStr) {
  try {
    const id = +idStr;
    console.log(
      "is int?",
      Number.isInteger(id),
      "> 0?",
      id > 0,
      "<= max int?",
      id <= SQL_MAX_INT
    );
    const validId = Number.isInteger(id) && id > 0 && id <= SQL_MAX_INT;
    if (!validId) {
      throwMiddlewareError({ code: 400, message: "Bad int!" });
    }
    next();
  } catch (e) {
    next(e);
  }
}
