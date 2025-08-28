export default function throwMiddlewareError({
  code = 500,
  message = "Broken",
}) {
  const error = new Error(message);
  error.code = code;
  throw error;
}
