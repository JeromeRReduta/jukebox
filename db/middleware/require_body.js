// // import throwMiddlewareError from "./middleware_error.js";

// /** Credit for this pattern from FullStack table4U */
// export default async function requireBody(...fields) {
//   return (req, res, next) => {
//     try {
//       if (!req.body) {
//         throwMiddlewareError({ code: 400, message: "Missing body" });
//       }
//       const missing = fields.filter((field) => !(field in req.body));
//       if (missing.length > 0) {
//         throwMiddlewareError({
//           code: 400,
//           message: `Missing: ${missing.join(",")}`,
//         });
//       }
//       next();
//     } catch (e) {
//       next(e);
//     }
//   };
// }
