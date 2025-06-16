"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signInSchema } from "@/lib/zod";
import LoadingButton from "@/components/loading-button";
import { handleCredentialsSignin } from "@/app/actions/authActions";
import { useState, useEffect } from "react";
import ErrorMessage from "@/components/error-message";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignIn() {
  const params = useSearchParams();
  const error = params.get("error");
  const router = useRouter();
  const [globalError, setGlobalError] = useState<string>("");

  useEffect(() => {
    if (error) {
      setGlobalError(error === "OAuthAccountNotLinked" 
        ? "Please use your email and password to sign in." 
        : "An unexpected error occurred. Please try again.");
    }
    router.replace("/auth/signin");
  }, [error, router]);

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
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
    <div className="w-[100vw] flex">
      <div className="bg-blue-500 w-1/3 p-10 text-white h-[100vh]">
        <h2 className="pb-[44px] text-[41px] font-bold">Welcome to Cared For! We&apos;re glad to have you here</h2>
        <p className="pb-[60px]">Connect with Doctors, manage appointments, and access medical resources</p>
        <h4 className="font-bold">Let&apos;s setup your account and explore more!</h4>
      </div>
      <div className="w-[100%] flex justify-center bg-slate-400">
        <div className="">
          {globalError && <ErrorMessage error={globalError} />}
          <h3 className="font-bold pb-[74px]">Sign In to Cared for</h3>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter your email address" autoComplete="off" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <LoadingButton pending={form.formState.isSubmitting}>Sign in</LoadingButton>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}