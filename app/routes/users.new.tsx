import { FormProvider, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Link, createFileRoute } from "@tanstack/react-router";
import type { FormEvent } from "react";

import { Button, buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { client } from "@/api-client";
import { createUserFormSchema } from "@/routes/api/users.new";

export const Route = createFileRoute("/users/new")({
  component: RouteComponent,
});

function RouteComponent() {
  const [form, fields] = useForm({
    onValidate: ({ formData }) => {
      return parseWithZod(formData, { schema: createUserFormSchema });
    },
    defaultValue: {
      name: "foo bar",
      email: "foo.bar@fondof.de",
      description: "daskhdash dajshd jkashd jkashdjkhas jkdahsdjkhas",
    },
    onSubmit: async (event: FormEvent) => {
      event.preventDefault();
      await client.post("users/new", {
        json: event,
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <FormProvider context={form.context}>
      <form
        id={form.id}
        method="post"
        onSubmit={form.onSubmit}
        className="max-w-screen-lg space-y-4"
      >
        <div className="space-y-2">
          <Label htmlFor="name-input">Name</Label>
          <Input
            type="text"
            placeholder="the name of your contact"
            id="name-input"
            key={fields.name.key}
            name={fields.name.name}
            defaultValue={fields.name.initialValue}
          />
          <span className="text-red-500">{fields.name.errors}</span>
        </div>
        <div className="space-y-2">
          <Label htmlFor="name-input">E-Mail</Label>
          <Input
            type="email"
            placeholder="E-Mail"
            id="email-input"
            key={fields.email.key}
            name={fields.email.name}
            defaultValue={fields.email.initialValue}
          />
          <span className="text-red-500">{fields.email.errors}</span>
        </div>
        <div className="space-y-2">
          <Label htmlFor="name-input">Description</Label>
          <Textarea
            placeholder="Descripte your contact"
            id="description-input"
            key={fields.description.key}
            name={fields.description.name}
            defaultValue={fields.description.initialValue}
          />
          <span className="text-red-500">{fields.description.errors}</span>
        </div>
        <div className="flex space-x-2">
          <Button type="submit">Submit</Button>
          <Link
            to="/"
            className={cn(buttonVariants({ variant: "destructive" }))}
          >
            Cancel
          </Link>
        </div>
      </form>
    </FormProvider>
  );
}
