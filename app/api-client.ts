import ky from "ky";

export const client = ky.create({
  prefixUrl: "http://localhost:3000/api/",
});
