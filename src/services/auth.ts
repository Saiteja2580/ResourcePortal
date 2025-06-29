"use client"; // Essential for Server Actions

import { createClient } from "../../utils/supabase/client"; // Adjust path as needed

interface SignInFormData {
  username: string; // This will be used as email
  password: string;
}

const supabase = createClient();

export async function login(formData: SignInFormData) {
  const email = formData.username;
  const password = formData.password;

  if (!email || !password) {
    console.error("Login failed: Email or password missing.");
    return { success: false, message: "Email and password are required." };
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    console.error("Login failed:", error.message);
    alert("Wrong Credentials");
    return {
      success: false,
      message: error.message || "Invalid credentials. Please try again.",
    };
  } else {
    return {
      success: true,
      message: "Login successful. Redirecting...",
    };
  }
}

export async function logout() {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout failed:", error.message);
      return { success: false, message: error.message };
    }

    return { success: true, message: "Logged out successfully" };
  } catch (error) {
    console.error("Unexpected error during logout:", error);
    return {
      success: false,
      message: "An unexpected error occurred during logout",
    };
  }
}

export async function signup({
  email,
  password,
  name,
  department,
  role,
}: {
  email: string;
  password: string;
  name: string;
  department: string;
  role: string;
}) {
  try {
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          name: name,
          department_id: department,
          role: role,
        },
      },
    });

    if (error) {
      console.error("Signup failed:", error.message);
      return { success: false, message: error.message };
    }

    return { success: true, message: "Signed Up successfully" };
  } catch (error) {
    console.error("Unexpected error during Signup:", error);
    return {
      success: false,
      message: "An unexpected error occurred during signup",
    };
  }
}
