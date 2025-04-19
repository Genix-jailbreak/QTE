import { useForm } from "react-hook-form";
import { supabase } from "../../../config/supabase";
import { useState, useEffect } from "react";
// import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type ResetForm = {
  password: string;
  confirmPassword: string;
};

export default function ResetPasswordPage() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<ResetForm>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // When user is redirected to this page via the Supabase link, they’re already authenticated temporarily.
    supabase.auth.getUser().then(({ data, error }) => {
      if (error || !data.user) {
        // toast.error("You must access this page through your email link.");
        navigate("/login");
      }
    });
  }, []);

  const onSubmit = async (data: ResetForm) => {
    if (data.password !== data.confirmPassword) {
      // toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: data.password });

    if (error) {
      // toast.error(error.message);
    } else {
      // toast.success("Password reset successful! You can now log in.");
      navigate("/login");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-center">Reset Password</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="password"
            placeholder="New Password"
            {...register("password", { required: "Password is required", minLength: 6 })}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

          <input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword", { required: "Confirm your password" })}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
