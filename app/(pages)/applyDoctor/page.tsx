<<<<<<< HEAD
=======
// "use client";

// import { useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import LoadingButton from "@/components/loading-button";
// import ErrorMessage from "@/components/error-message";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { applyDocSchema } from "@/lib/zod";
// import {  handleApplyDoc} from "@/app/actions/authActions";

// export default function ApplyDoc() {
//   const [globalError, setGlobalError] = useState("");

//   const form = useForm<z.infer<typeof applyDocSchema>>({
//     resolver: zodResolver(applyDocSchema),
//     defaultValues: {
//       name: "",
//       lastName: "",
//       email: "",
//       address: "",
//       specialization: "",
//     },
//   });

//   const onSubmit = async (values: z.infer<typeof applyDocSchema>) => {
//     try {
//       const result: ServerActionResponse = await handleApplyDoc(values);
//       if (result.success) {
//         console.log("Account created successfully.");
//         setGlobalError(""); // Clear any previous errors on success
//       } else {
//         setGlobalError(result.message);
//       }
//     } catch (error) {
//       setGlobalError("An unexpected error occurred. Please try again.");
//     }
//   };

//   return (
//     <div className="grow flex items-center justify-center p-4">
//       <Card className="w-full max-w-md">
//         <CardHeader>
//           <CardTitle className="text-3xl font-bold text-center text-gray-800">
//             Sign Up as Doctor
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           {globalError && <ErrorMessage error={globalError} />}
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//               {["name", "lastName", "address", "specialization", "email"].map((field) => (
//                 <FormField
//                   control={form.control}
//                   key={field}
//                   name={field as keyof z.infer<typeof applyDocSchema>}
//                   render={({ field: fieldProps }) => (
//                     <FormItem>
//                       <FormLabel>
//                         {field.charAt(0).toUpperCase() + field.slice(1)}
//                       </FormLabel>
//                       <FormControl>
//                         <Input {...fieldProps} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               ))}
//               <LoadingButton pending={form.formState.isSubmitting}>
//                 apply
//               </LoadingButton>
//             </form>
//           </Form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
>>>>>>> b7d7d9d9c37877a3b11cc7e126f48ab98bd51844


import DoctorApplicationForm from "@/components/DoctorApplicationForm";

export default function ApplyDoctorPage() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Apply as a Doctor</h1>
      <DoctorApplicationForm />
    </div>
  );
}