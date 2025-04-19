import { useState } from 'react';
import { SignUpForm } from './SignUpForm';
import { Link, useNavigate } from 'react-router-dom';
import { RegisterFormData, registerUser } from '../../../utils/auth';

export default function SignUpPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    const result = await registerUser(data, authMethods);
    
    if (result.success) {
      navigate("/dashboard");
    } else {
      console.error("Registration failed:", result.error);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="flex flex-col items-center">
            <h2 className="text-center text-3xl font-bold text-gray-900">
              Create your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/auth/signin"
                className="font-medium text-primaryColor hover:text-primaryColor/80"
              >
                Sign in
              </Link>
            </p>
          </div>
          <SignUpForm onSubmit={handleSubmit(onSubmit)} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}