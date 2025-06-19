"use client";


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
import { handleCredentialsSignin } from "@/app/actions/authActions";
import { useState, useEffect } from "react";
import ErrorMessage from "@/components/error-message";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignInPage() {
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
    <div className="flex w-full pt-12">
      {/* Left Side: Welcome Message */}
      <div className="w-1/2 h-[90vh] relative ">
        <img
          alt="Smiling young girl painting her hand with blue paint, colorful books stacked in the background with a red apple on top"
          className="w-full h-full object-cover"
          height="1080"
          src="https://storage.googleapis.com/a1aa/image/b1f18c06-842a-4363-b916-75a9a8945dce.jpg"
          width="960"
        />
        <div
          className="absolute bottom-16 left-12 text-white max-w-xs"
          style={{ textShadow: "0 0 10px rgba(0,0,0,0.7)" }}
        >
          <h3 className="text-2xl font-extrabold mb-1">Transform Education,</h3>
          <p className="text-lg font-normal">One Click at a Time</p>
          <div className="flex space-x-2 mt-6">
            <span className="w-3 h-3 rounded-full bg-white"></span>
            <span className="w-3 h-3 rounded-full bg-white/50"></span>
            <span className="w-3 h-3 rounded-full bg-white/50"></span>
          </div>
        </div>
        <Button
          aria-label="Previous slide"
          className="absolute top-1/2 left-4 -translate-y-1/2 text-white text-2xl opacity-80 hover:opacity-100"
        >
          <i className="fas fa-chevron-left"></i>
        </Button>
        <Button
          aria-label="Next slide"
          className="absolute top-1/2 right-4 -translate-y-1/2 text-white text-2xl opacity-80 hover:opacity-100"
        >
          <i className="fas fa-chevron-right"></i>
        </Button>
      </div>
      {/* Left Side: Welcome Message */}

      {/* Right Side: Sign In Form */}

      <div className="w-1/2 h-[90vh] flex flex-col justify-start px-12 pt-6 ">
        <div className="flex items-center space-x-2 mb-24">
          <div className="bg-blue-600 rounded-full p-3">
            <i className="fas fa-graduation-cap text-white text-lg"></i>
          </div>

          <h1 className="text-xl font-extrabold">
            Cared
            <span className="">For</span>
          </h1>
        </div>

        <div className="w-full flex justify-center">
          <div className="w-full max-w-md p-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full max-w-md mx-auto"
              >
                <h2 className="text-2xl font-extrabold mb-8">
                  Login to your Account
                </h2>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Eg. kuntech@gmail.com"
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
                    <FormItem className="pt-4">
                      <FormLabel >Password</FormLabel>
                      <FormControl >
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

                {globalError && <ErrorMessage error={globalError} />}
                <LoadingButton pending={form.formState.isSubmitting}>
                  <span className="w-full p-2 mt-8 text-white bg-[#005EFF] font-black ">
                    {" "}
                    Sign in <i className="fas fa-sign-in-alt"></i>
                  </span>
                </LoadingButton>

                {/* Signup Option */}
                <div className="mt-4 text-center">
                  <p className="text-sm">
                    Don&apos;t have an account?
                    <Button
                      variant="link"
                      onClick={() => router.push("/auth/signup")}
                      className="text-[#005EFF]"
                    >
                      Sign up
                    </Button>
                  </p>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
