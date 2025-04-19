import { useForm } from "react-hook-form";
import { supabase } from "../../../config/supabase";
import { useState } from "react";
// import { toast } from "react-hot-toast";

type ForgotForm = {
  email: string;
};

export default function ForgotPasswordPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotForm>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: ForgotForm) => {
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      // toast.error(error.message);
    } else {
      // toast.success("Password reset link sent to your email.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-center">Forgot Password</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="email"
            placeholder="Your Email"
            {...register("email", { required: "Email is required" })}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
}
