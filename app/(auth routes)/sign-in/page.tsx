'use client'
import { RegistedUser } from "@/types/user"
import css from "./SignInPage.module.css"
import { loginUser } from "@/lib/api/clientApi";
import { useRouter } from "next/router";

const SignIn = () => {
  const router = useRouter();
  const handleLogin = async (formData:FormData) => {
    const data = Object.fromEntries(formData) as RegistedUser;
    const res = await loginUser(data)
   }
  return (
    <main className={css.mainContent}>
 <form className={css.form} action={handleLogin}>
    <h1 className={css.formTitle}>Sign in</h1>

    <div className={css.formGroup}>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" name="email" className={css.input} required />
    </div>

    <div className={css.formGroup}>
      <label htmlFor="password">Password</label>
      <input id="password" type="password" name="password" className={css.input} required />
    </div>

    <div className={css.actions}>
      <button type="submit" className={css.submitButton}>
        Log in
      </button>
    </div>

    {/* <p className={css.error}>{error}</p> */}
  </form>
</main>
  )
}

export default SignIn