
import { object, string } from "zod";

export const signInSchema = object({
    email: string({ required_error: "Email is required" })
        .min(1, "Email is required")
        .email("Invalid email"),
    password: string({ required_error: "Password is required" })
        .min(1, "Password is required")
        .min(8, "Password must be more than 8 characters")
        .max(32, "Password must be less than 32 characters"),
});



export const signUpSchema = object({
    name: string({ required_error: "Name is required" })
        .min(1, "Name is required.")
        .max(50, "Name must be less than 50 characters"),
    email: string({ required_error: "Email is required" })
        .min(1, "Email is required.")
        .email("Invalid email"),
    password: string({ required_error: "Password is required" })
        .min(1, "Password is required")
        .min(8, "Password must be more than 8 characters")
        .max(32, "Password must be less than 32 characters"),
    confirmPassword: string({ required_error: "Confirm password is required" })
        .min(1, "Confirm password is required")
        .min(8, "Password must be more than 8 characters")
        .max(32, "Password must be less than 32 characters"),
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export const applyDocSchema = object({
    name: string({ required_error: "First name is required" })
        .min(1, "First name is required")
        .max(50, "First name must be less than 50 characters"),
    lastName: string({ required_error: "Last name is required" })
        .min(1, "Last name is required")
        .max(50, "Last name must be less than 50 characters"),
    specialization: string({ required_error: "Specialization is required" })
        .min(1, "Specialization is required")
        .max(50, "Specialization must be less than 50 characters"),
    experience: string({ required_error: "Experience is required" })
        .min(1, "Experience is required")
        .max(50, "Experience must be less than 50 characters"),
    address: string({ required_error: "Address is required" })
        .min(1, "Address is required")
        .max(100, "Address must be less than 100 characters"),
});