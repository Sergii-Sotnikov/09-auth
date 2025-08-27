"use client";
import { useRouter } from "next/navigation";
import css from "./SignUpPage.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import { useState } from "react";
import { CreateUserData } from "@/types/user";
import { RegisteredUser } from "@/lib/api/clientApi";
import { ApiError } from "@/types/apiError";

const SignUp = () => {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [error, setError] = useState("");
  const handleSubmit = async (formData: FormData) => {
    const values = Object.fromEntries(formData) as unknown as CreateUserData;
    console.log(values);
    try {
      const user = await RegisteredUser(values);
      setUser(user);
      console.log(user);
      router.push("/profile");
    } catch (error) {
      const err = error as ApiError;
      console.log(err)
      const errorData = err.response?.data;
      setError(
        errorData?.message ?? errorData?.error ?? err.message ?? "Some error"
      );
    }
  };

  console.log(useAuthStore);

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} action={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>
        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
};

export default SignUp;
