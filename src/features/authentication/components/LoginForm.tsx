"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import React from "react";
import {
  LoginFormFields,
  loginFormValidator,
} from "../schemas/LoginFormFields";
import { loginUserAction } from "../actions/loginUserAction";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginForm({
  defaultValues = {
    username: "",
    password: "",
  },
}: {
  defaultValues?: Partial<LoginFormFields>;
}) {
  const form = useForm<LoginFormFields>({
    resolver: zodResolver(loginFormValidator),
    defaultValues,
  });

  const router = useRouter();

  async function onSubmit(values: LoginFormFields) {
    const result = await loginUserAction(values);
    if (result.success && result.redirect) {
      router.replace(result.redirect);
    }
    if (!result.success) {
      toast.error(result.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* [Username Field] */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter your username"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* [Password Field] */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter your password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* [Form Actions] */}
              <Button
                className="w-full bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 h-9 rounded-md px-3"
                type="submit"
              >
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
