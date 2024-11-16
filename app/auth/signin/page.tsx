"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signInSchema } from "@/lib/zod";
import LoadingButton from "@/components/loading-button";
import {
  handleCredentialsSignin
} from "@/app/actions/authActions";
import { useState, useEffect } from "react";
import ErrorMessage from "@/components/error-message";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignIn() {
  const params = useSearchParams();
  const error = params.get("error");
  const router = useRouter();

  const [globalError, setGlobalError] = useState<string>("");

  useEffect(() => {
    if (error) {
      switch (error) {
        case "OAuthAccountNotLinked":
          setGlobalError("Please use your email and password to sign in.");
          break;
        default:
          setGlobalError("An unexpected error occurred. Please try again.");
      }
    }
    router.replace("/auth/signin");
  }, [error, router]);

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    try {
      const result = await handleCredentialsSignin(values);
      if (result?.message) {
        setGlobalError(result.message);
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex w-full">
      {/* Left Side: Welcome Message */}
      <div className="bg-blue-500 w-1/3 p-10 text-white h-screen">
        <h2 className="pb-11 text-4xl font-bold">
          Welcome to Cared For! We&apos;re glad to have you here
        </h2>
        <p className="pb-15">
          Connect with Doctors, manage appointments, and access medical resources
        </p>
        <h4 className="font-bold">Let’s set up your account and explore more!</h4>
      </div>

      {/* Right Side: Sign In Form */}
      <div className="w-full flex justify-center bg-slate-400">
        <div className="w-full max-w-md p-8">
          {globalError && <ErrorMessage error={globalError} />}
          <h3 className="font-bold pb-18">Sign In to Cared For</h3>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <LoadingButton pending={form.formState.isSubmitting}>
                Sign in
              </LoadingButton>
            </form>
          </Form>

          {/* Signup Option */}
          <div className="mt-4 text-center">
            <p className="text-sm">
              Don&apos;t have an account? 
              <Button variant="link" onClick={() => router.push('/auth/signup')}>
                Sign up
              </Button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}