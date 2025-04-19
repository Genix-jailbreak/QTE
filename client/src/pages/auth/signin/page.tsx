import { useState } from 'react';
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, LoginFormData } from "../../../utils/auth";

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const authMethods: ("native" | "firebase" | "supabase")[] = ["firebase", "supabase", "native"];

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    const result = await loginUser(data, authMethods);
    
    if (result.success) {
      navigate("/dashboard");
    } else {
      console.error("Login failed:", result.error);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
            <div className="flex flex-col items-center">
            <h2 className="text-center text-3xl font-bold text-gray-900">
                Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
                Or{" "}
                <Link
                to="/signup"
                className="font-medium text-primaryColor hover:text-primaryColor/80"
                >
                create a new account
                </Link>
            </p>
            </div>
    
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm space-y-4">
                <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email address
                </label>
                <input
                    {...register("email", {
                    required: "Email is required",
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                    }
                    })}
                    type="email"
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primaryColor focus:border-primaryColor sm:text-sm"
                    placeholder="name@company.com"
                />
                {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
                </div>
    
                <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                </label>
                <div className="relative">
                    <input
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters"
                        }
                    })}
                    type={showPassword ? "text" : "password"}
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primaryColor focus:border-primaryColor sm:text-sm"
                    placeholder="••••••••"
                    />
                    <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                    {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                    )}
                    </button>
                </div>
                {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
                </div>
            </div>
    
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                <input
                    {...register("rememberMe")}
                    type="checkbox"
                    className="h-4 w-4 text-primaryColor focus:ring-primaryColor border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                </label>
                </div>
    
                <Link
                to="/forgot-password"
                className="text-sm font-medium text-primaryColor hover:text-primaryColor/80"
                >
                Forgot your password?
                </Link>
            </div>
    
            <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primaryColor hover:bg-primaryColor/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryColor disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading ? (
                <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                    Signing in...
                </>
                ) : (
                "Sign in"
                )}
            </button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;