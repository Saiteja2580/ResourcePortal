"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { login } from "@/services/auth";


interface signInData {
  username: string;
  password: string;
}

interface Errors {
  username?: string;
  password?: string;
}

const SignInForm = ({ role }: { role: string }) => {
  const [data, setFormData] = useState<signInData>({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<Errors>({});

  const router = useRouter();

  const validateErrors = () => {
    const newErrors: Errors = {};
    const emailRegex = /^[0-9a-zA-Z._%+-]+@kanchiuniv\.ac\.in$/;
    const passwordRegex = /^(?=.*[a-zA-Z0-9])(?=.*[\W_]).{5,}$/;

    if (!emailRegex.test(data.username)) {
      newErrors.username =
        "Invalid email. Use your university email (e.g., 11229a021@kanchiuniv.ac.in)";
    }

    if (!passwordRegex.test(data.password)) {
      newErrors.password = "Enter Password Correctly";
    }

    return newErrors;
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(data);

    const foundErrors = validateErrors();

    if (Object.keys(foundErrors).length != 0) {
      setErrors(foundErrors);
      return;
    }

    const loginFunc = await login(data);
    if (Object.keys(foundErrors).length === 0 && loginFunc.success) {
      console.log("Login Success:", data);
      router.push(`/${role}`);
    }
    //router.push(`/${role}`);
  };

  const handleReset = () => {
    setFormData({ username: "", password: "" });
    setErrors({ username: "", password: "" });
  };

  return (
    <div className="min-h-screen w-[100%] flex justify-center items-center bg-gray-200">
      <div className="w-md flex flex-col gap-5 border-gray-300 border-2 p-10 space-y-2 rounded-xl shadow-xl text-center">
        <h1
          className="font-bold text-2xl text-var(--text-primary)"
          style={styles.header}
        >
          {role === "admin" ? "Admin Login" : "Faculty Login"}
        </h1>
        <form action="" className="flex flex-col gap-5" onSubmit={handleSignIn}>
          <div className="flex flex-col gap-3 ">
            <Label htmlFor="text" className="text-xl font-semibold">
              User Name
            </Label>
            <Input
              required
              type="text"
              className="border-[var(--color-gray-dark)] border-2 text-2xl p-5"
              placeholder="Enter User Name"
              value={data.username}
              onChange={(e) =>
                setFormData({ ...data, username: e.target.value })
              }
            />
            {errors.username && (
              <span className="text-red-600 text-sm text-left">
                {errors.username}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-3 ">
            <Label htmlFor="password" className="text-xl font-semibold">
              Password
            </Label>
            <Input
              type="password"
              placeholder="Enter password"
              className="border-[var(--color-gray-dark)] border-2 text-2xl p-5"
              value={data.password}
              onChange={(e) =>
                setFormData({ ...data, password: e.target.value })
              }
              required
            />

            {errors.password && (
              <span className="text-red-600 text-sm text-left">
                {errors.password}
              </span>
            )}
          </div>
          <div className="flex gap-3">
            <Button
              type="submit"
              className="text-xl font-bold py-3 w-1/2"
              style={styles.button}
            >
              Sign In
            </Button>
            <Button
              className="text-xl font-bold py- w-1/2"
              style={styles.button}
              onClick={handleReset}
            >
              Reset
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;

const styles = {
  button: {
    background:
      "linear-gradient(to right, var(--color-gradient-start), var(--color-gradient-end))",
    boxShadow: "var(--shadow-button)",
    borderRadius: "var(--radius-md)",
    fontFamily: "var(--font-heading)",
    transition: "var(--transition-smooth)",
  },
  header: {
    fontFamily: "var(--font-heading)",
    color: "var(--text-primary)",
  },
};
