import { TypographyH3 } from "@/components/typography";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/")({
  component: Home,
});

function Home() {
  return (
    <div className="p-2">
      <TypographyH3>Welcome Home!!!</TypographyH3>
    </div>
  );
}
