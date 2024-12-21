import { TypographyH4 } from "@/components/typography";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { postQueryOptions } from "../utils/posts";
import { PostErrorComponent } from "./posts.$postId";

export const Route = createFileRoute("/posts_/$postId/deep")({
  loader: async ({ params: { postId }, context }) => {
    const data = await context.queryClient.ensureQueryData(
      postQueryOptions(postId),
    );

    return {
      title: data.title,
    };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [{ title: loaderData.title }] : undefined,
  }),
  errorComponent: PostErrorComponent,
  component: PostDeepComponent,
});

function PostDeepComponent() {
  const { postId } = Route.useParams();
  const postQuery = useSuspenseQuery(postQueryOptions(postId));

  return (
    <div className="p-2 space-y-2">
      <Link
        to="/posts"
        className={cn(
          buttonVariants({ variant: "link" }),
          "text-blue-500 text-base",
        )}
      >
        ← All Posts
      </Link>
      <div className="px-4 space-y-2">
        <TypographyH4>{postQuery.data.title}</TypographyH4>
        <div className="text-sm">{postQuery.data.body}</div>
      </div>
    </div>
  );
}
