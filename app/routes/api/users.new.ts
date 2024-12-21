import { json } from "@tanstack/start";
import { createAPIFileRoute } from "@tanstack/start/api";

export const APIRoute = createAPIFileRoute("/api/users/new")({
  POST: async ({ request }) => {
    const formData = await request.formData();
    console.log(Object.fromEntries(formData));
    return json({ message: 'Hello "/api/users/new"!' });
  },
});
