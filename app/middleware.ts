import { createMiddleware } from "@tanstack/start";

export const authMiddleware = createMiddleware().server(async ({ next, data }) => {
  console.log(data, "Request received");
  const result = await next();
  console.log(result, "Response processed");
  return result;
});
