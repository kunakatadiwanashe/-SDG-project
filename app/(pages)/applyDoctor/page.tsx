
import DoctorApplicationForm from "@/components/DoctorApplicationForm";

export default function ApplyDoctorPage() {
  return (
    <div className="max-w-2xl mx-auto p-6">

      <h1 className="text-2xl font-bold mb-6 text-blue-500">Apply as a Volunteer Doctor</h1>

      <DoctorApplicationForm />
    </div>
  );
}