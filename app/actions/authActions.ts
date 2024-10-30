"use server";

import { signIn, signOut } from "@/auth";
import { signUpSchema, applyDocSchema } from "@/lib/zod";
import { AuthError } from "next-auth";

import bcryptjs from "bcryptjs";
import prisma from "@/lib/prisma";

export async function handleCredentialsSignin({ email, password }: {
    email: string,
    password: string
}) {
    try {
        await signIn("credentials", { email, password, redirectTo: "/" });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return {
                        message: 'Invalid credentials',
                    }
                default:
                    return {
                        message: 'Something went wrong.',
                    }
            }
        }
        throw error;
    }
}




export async function handleSignOut() {
    await signOut();
}


export async function handleSignUp({ name, email, password, confirmPassword }: {
    name: string,
    email: string,
    password: string,
    confirmPassword: string
}) {
    try {
        const parsedCredentials = signUpSchema.safeParse({ name, email, password, confirmPassword });
        if (!parsedCredentials.success) {
            return { success: false, message: "Invalid data." };
        }

        // check if the email is already taken
        const existingUser = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (existingUser) {
            return { success: false, message: "Email already exists. Login to continue." };
        }

        // hash the password
        const hashedPassword = await bcryptjs.hash(password, 10);
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        return { success: true, message: "Account created successfully." };
    } catch (error) {
        console.error("Error creating account:", error);
        return { success: false, message: "An unexpected error occurred. Please try again." };
    }
}




// export async function handleApplyDoc({ name,lastName,specialization,address, email }: {
//     name: string,
//     email: string,
//     lastName: string,
//     specialization: string,
//     address: string,
//     password: string,
 
// }) 

// {
//     try {
//         const parsedCredentials = applyDocSchema.safeParse({ name, email, lastName,specialization,address});
//         if (!parsedCredentials.success) {
//             return { success: false, message: "Invalid data." };
//         }

//         // check if the email is already taken
//         const existingUser = await prisma.user.findUnique({
//             where: {
//                 email,
//             },
//         });

//         if (existingUser) {
//             return { success: false, message: "Email already exists. Login to continue." };
//         }


//         return { success: true, message: "Account created successfully." };
//     } catch (error) {
//         console.error("Error creating account:", error);
//         return { success: false, message: "An unexpected error occurred. Please try again." };
//     }
// }


export async function handleApplyDoc({ name, lastName, specialization, address, email }: {
    name: string,
    email: string,
    lastName: string,
    specialization: string,
    address: string
}) {
    try {
        // Assuming applyDocSchema is defined similarly to signUpSchema
        const parsedCredentials = applyDocSchema.safeParse({ name, email, lastName, specialization, address });
        if (!parsedCredentials.success) {
            return { success: false, message: "Invalid data." };
        }

        // Check if the email is already taken
        const existingUser  = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (existingUser ) {
            return { success: false, message: "Email already exists. Login to continue." };
        }

        // If needed, you can create a new user or perform other actions here
        // For example, if you want to create a doctor profile, you might do something like this:

        // await prisma.doctor.create({
        //     data: {
        //         name,
        //         lastName,
        //         specialization,
        //         address,
        //         email,
        //     },
        // });

        return { success: true, message: "Application submitted successfully." };
    } catch (error) {
        console.error("Error applying for doctor:", error);
        return { success: false, message: "An unexpected error occurred. Please try again." };
    }
}