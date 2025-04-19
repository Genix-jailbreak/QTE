import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

type VerificationForm = {
  otp: string;
};

export default function EmailVerificationPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<VerificationForm>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const email = localStorage.getItem("pendingEmail");

  const onSubmit = async (data: VerificationForm) => {
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/verify-email", {
        email,
        otp: data.otp,
      });

      toast.success(res.data.message || "Email verified successfully!");
      localStorage.removeItem("pendingEmail");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "OTP Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Verify Your Email</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            placeholder="Enter OTP"
            {...register("otp", { required: "OTP is required" })}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
          {errors.otp && <p className="text-red-500 text-sm">{errors.otp.message}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}
