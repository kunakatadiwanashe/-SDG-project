// components/DoctorApplicationForm.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { applyDocSchema } from "@/lib/zod";
import type { z } from "zod";

type FormData = z.infer<typeof applyDocSchema>;

export default function DoctorApplicationForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>({
        resolver: zodResolver(applyDocSchema),
    });

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        setError(null);
        setSuccess(false);

        try {
            console.log("Submitting data:", data); // Debug log

            const response = await fetch("/api/doctor", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
                credentials: "include", // Important for authentication
            });

            console.log("Response status:", response.status); // Debug log

            const result = await response.json();
            console.log("Response data:", result); // Debug log

            if (!response.ok) {
                throw new Error(result.error || "Failed to submit application");
            }

            setSuccess(true);
            reset();
        } catch (err: any) {
            console.error("Form submission error:", err); // Debug log
            setError(err.message || "An error occurred while submitting the form");
        } finally {
            setIsSubmitting(false);
        }
    };



    return (
        <div className="max-w-md mx-auto mt-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                        Application submitted successfully!
                    </div>
                )}

                <div>
                    <label className="block mb-2">First Name</label>
                    <input
                        {...register("name")}
                        className="w-full px-3 py-2 border rounded"
                        type="text"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                </div>

                <div>
                    <label className="block mb-2">Last Name</label>
                    <input
                        {...register("lastName")}
                        className="w-full px-3 py-2 border rounded"
                        type="text"
                    />
                    {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                    )}
                </div>



                <div>
                    <label className="block mb-2">Specialization</label>
                    <input
                        {...register("specialization")}
                        className="w-full px-3 py-2 border rounded"
                        type="text"
                    />
                    {errors.specialization && (
                        <p className="text-red-500 text-sm mt-1">{errors.specialization.message}</p>
                    )}
                </div>

                <div>
                    <label className="block mb-2">Experience</label>
                    <input
                        {...register("experience")}
                        className="w-full px-3 py-2 border rounded"
                        type="text"
                    />
                    {errors.experience && (
                        <p className="text-red-500 text-sm mt-1">{errors.experience.message}</p>
                    )}
                </div>

                <div>
                    <label className="block mb-2">Address</label>
                    <input
                        {...register("address")}
                        className="w-full px-3 py-2 border rounded"
                        type="text"
                    />
                    {errors.address && (
                        <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
                    )}
                </div>
                
                <div>
                    <label className="block mb-2">Phone Number</label>
                    <input
                        {...register("address")}
                        className="w-full px-3 py-2 border rounded"
                        type="text"
                    />
                    {errors.address && (
                        <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-blue-300"
                >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                </button>
            </form>
        </div>
    );
}