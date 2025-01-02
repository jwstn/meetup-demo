import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authMiddleware } from "@/middleware";
import * as zod from "zod";

import { authClient, signIn } from "@/lib/auth-client";
import { FormProvider, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Link, createFileRoute } from "@tanstack/react-router";
import { createServerFn, json } from "@tanstack/start";
import { GalleryVerticalEnd } from "lucide-react";
import { toast } from "sonner";

export const contactFormSchema = zod.object({
  email: zod
    .string()
    .min(2, {
      message: "email must be at least 2 characters.",
    })
    .email(),
  password: zod.string().min(8, {
    message: "password must be at least 8 characters.",
  }),
});

export const loginUser = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(
    // @ts-ignore
    async ({ data: formData }) => {
      // @ts-ignore
      const submission = parseWithZod(formData, { schema: contactFormSchema });

      if (submission.status !== "success") {
        console.log("submission not successfull!");
        return json(submission.reply());
      }

      const { data, error } = await signIn.email({
        email: submission.value.email,
        password: submission.value.password,
      });

      if (error !== null && data === null) {
        return { error, data: null };
      }

      return { data, error: null };
    },
  );

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = Route.useNavigate();

  const [form, fields] = useForm({
    onValidate: ({ formData }) => {
      return parseWithZod(formData, { schema: contactFormSchema });
    },
    defaultValue: {
      email: "",
      password: "",
    },
    onSubmit: async (event) => {
      event.preventDefault();
      event.stopPropagation();

      const formData = new FormData(event.target);

      const { data, error } = await loginUser({
        data: formData,
      });

      if (error !== null && error.message) {
        return toast.error(error.message);
      }

      navigate({ to: "/" });

      toast.success("Login successfull 🚀", {
        description: `You are now logged in as ${data.user.name}`,
      });
    },
  });

  return (
    <main className="flex min-h-dvh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <FormProvider context={form.context}>
            <form id={form.id} method="POST" onSubmit={form.onSubmit}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center gap-2">
                  <a
                    href="https://www.fondof.de"
                    className="flex flex-col items-center gap-2 font-medium"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-md">
                      <GalleryVerticalEnd className="size-6" />
                    </div>
                    <span className="sr-only">Acme Inc.</span>
                  </a>
                  <h1 className="text-xl font-bold">Welcome to Acme Inc.</h1>
                  <div className="text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link to="/sign-up" className="underline underline-offset-4">
                      Sign up
                    </Link>
                  </div>
                </div>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor={fields.email.name}>Email</Label>
                    <Input
                      key={fields.email.key}
                      id={fields.email.id}
                      name={fields.email.name}
                      type="email"
                      placeholder="m@example.com"
                      required
                    />
                    <span className="text-sm text-red-500">{fields.email?.errors}</span>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor={fields.password.name}>Password</Label>
                    <Input
                      key={fields.password.key}
                      id={fields.password.id}
                      name={fields.password.name}
                      type="password"
                      placeholder="*********"
                      required
                    />
                    <span className="text-sm text-red-500">
                      {fields.password?.errors}
                    </span>
                  </div>
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                </div>
                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                  <span className="relative z-10 bg-background px-2 text-muted-foreground">
                    Or
                  </span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {/* <Button variant="outline" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                      fill="currentColor"
                    />
                  </svg>
                  Continue with Apple
                </Button> */}
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      authClient.signIn.social({ provider: "github" });
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                      />
                    </svg>
                    Continue with Github
                  </Button>
                </div>
              </div>
            </form>
          </FormProvider>
          {/* <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary  ">
            By clicking continue, you agree to our{" "}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </div> */}
        </div>
      </div>
    </main>
  );
}
