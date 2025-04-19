import '../config/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { UserCredential } from "firebase/auth";
import { supabase } from "../config/supabase";

const auth = getAuth();

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterFormData {
  email: string;
  password: string;
}

export async function loginUser(data: LoginFormData, methods: ("native" | "firebase" | "supabase")[]) {
  for (const method of methods) {
    try {
      if (method === "native") {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error("Native login failed");

        const responseData = await response.json();
        localStorage.setItem("token", responseData.token);
        return { success: true, token: responseData.token };
      }

      if (method === "firebase") {
        const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
        const token = await userCredential.user.getIdToken();
        return { success: true, token };
      }

      if (method === "supabase") {
        const { data: user, error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });
        if (error) throw error;
        return { success: true, token: user.session?.access_token };
      }
    } catch (error) {
      console.error(`${method} login error:`, error);
      continue; // Try the next method if this one fails
    }
  }

  return { success: false, error: "All login methods failed" };
}

export async function registerUser(data: RegisterFormData, methods: ("native" | "firebase" | "supabase")[]) {
  for (const method of methods) {
    try {
      if (method === "native") {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error("Native registration failed");

        const responseData = await response.json();
        localStorage.setItem("token", responseData.token);
        return { success: true, token: responseData.token };
      }

      if (method === "firebase") {
        const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
        const token = await userCredential.user.getIdToken();
        return { success: true, token };
      }

      if (method === "supabase") {
        const { data, error } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
        });

        if (error) throw error;
        return { success: true, token: data?.user?.access_token };
      }
    } catch (error) {
      console.error(`${method} registration error:`, error);
      continue; // Try the next method if this one fails
    }
  }

  return { success: false, error: "All registration methods failed" };
}

export async function resetPassword(email: string, methods: ("native" | "firebase" | "supabase")[]) {
  for (const method of methods) {
    try {
      if (method === "firebase") {
        await auth.sendPasswordResetEmail(email);
        return { success: true };
      }

      if (method === "supabase") {
        const { error } = await supabase.auth.api.resetPasswordForEmail(email);
        if (error) throw error;
        return { success: true };
      }
    } catch (error) {
      console.error(`${method} reset password error:`, error);
      continue;
    }
  }

  return { success: false, error: "All password reset methods failed" };
}
