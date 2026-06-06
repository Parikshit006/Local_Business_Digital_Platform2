import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "../i18n";

export default function SignInSignUp() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // LOGIN
    const handleSignIn = async (e) => {
    e.preventDefault();

    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
    const res = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: form.email,
        password: form.password,
      }),
    });

    const data = await res.json();
    if (!res.ok) return alert(data.message);

    // Store token + user
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    
    if (data.user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/user-dashboard");
    }
  };

  // SIGNUP
  const handleSignUp = async (e) => {
    e.preventDefault();

    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
    const res = await fetch(`${apiUrl}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (!res.ok) {
      alert(data.message);
      return; 
    }

    alert(t("auth.signupSuccess"));
    setIsLogin(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-4">

      {/* OUTER CARD */}
      <div className="w-full max-w-6xl h-[85vh] rounded-2xl overflow-hidden shadow-2xl">

        <main className="h-full flex flex-col md:flex-row items-stretch">

          {/* LEFT SIDE */}
          <section className="hidden md:flex md:w-1/2 bg-primary relative flex-col justify-between p-10 overflow-hidden">
            
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-container opacity-10 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-fixed opacity-5 rounded-full blur-3xl -ml-48 -mb-48"></div>

            {/* Content */}
            <div className="relative z-10">
              <div className="mb-10">
                <span className="text-secondary-fixed-dim text-xs uppercase tracking-[0.2em] mb-4 block">
                  {t("auth.digitalFrontier")}
                </span>
                <h1 className="text-4xl font-bold text-white leading-tight">
                  {t("auth.yourCompletePlatform")}
                </h1>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-white font-medium text-lg mb-1">
                    {t("auth.omnichannelTitle")}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {t("auth.omnichannelDesc")}
                  </p>
                </div>

                <div>
                  <h3 className="text-white font-medium text-lg mb-1">
                    {t("auth.automatedTitle")}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {t("auth.automatedDesc")}
                  </p>
                </div>

                <div>
                  <h3 className="text-white font-medium text-lg mb-1">
                    {t("auth.secureTitle")}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {t("auth.secureDesc")}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="relative z-10 mt-auto pt-10">
              <div className="p-5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10">
                <p className="text-white/80 text-sm italic">
                  {t("auth.testimonialQuote")}
                </p>
              </div>
            </div>

            {/* Pattern */}
            <div
              className="absolute inset-0 z-0 opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)",
                backgroundSize: "32px 32px",
              }}
            ></div>
          </section>

          {/* RIGHT SIDE */}
          <section className="w-full md:w-1/2 bg-surface flex flex-col justify-center items-center p-0">

            {/* INNER CONTENT (PADDING MOVED HERE) */}
            <div className="w-full max-w-md px-8 py-10">

              {/* Header */}
              <div className="flex justify-between items-center mb-10">
                <div className="text-2xl font-extrabold text-primary tracking-tighter">
                  LocalBoost
                </div>
              </div>

              {/* Title */}
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-primary mb-2">
                  {isLogin ? t("auth.welcomeBack") : t("auth.createAccount")}
                </h2>
                <p className="text-on-surface-variant text-sm">
                  {isLogin
                    ? t("auth.enterCredentials")
                    : t("auth.fillDetails")}
                </p>
              </div>

              <form
                className="space-y-5"
                onSubmit={isLogin ? handleSignIn : handleSignUp}
              >

                {!isLogin && (
                  <>
                    <input
                      name="name"
                      placeholder={t("auth.fullName")}
                      onChange={handleChange}
                      required
                      className="w-full h-12 px-4 rounded-lg bg-surface-container-lowest"
                    />

                    <input
                      name="phone"
                      placeholder={t("auth.phoneNumber")}
                      onChange={handleChange}
                      required
                      className="w-full h-12 px-4 rounded-lg bg-surface-container-lowest"
                    />
                  </>
                )}

                <input
                  type="email"
                  name="email"
                  placeholder={t("auth.emailAddress")}
                  onChange={handleChange}
                  required
                  className="w-full h-12 px-4 rounded-lg bg-surface-container-lowest"
                />

                <input
                  type="password"
                  name="password"
                  placeholder={t("auth.password")}
                  onChange={handleChange}
                  required
                  className="w-full h-12 px-4 rounded-lg bg-surface-container-lowest"
                />

                <button
                  type="submit"
                  className="w-full py-3 bg-secondary text-white font-bold rounded-xl"
                >
                  {isLogin ? t("auth.signInButton") : t("auth.signUpButton")}
                </button>
              </form>

              {/* Toggle */}
              <p className="mt-6 text-sm text-center text-on-surface-variant">
                {isLogin
                  ? t("auth.noAccount")
                  : t("auth.haveAccount")}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-1 text-primary font-bold"
                >
                  {isLogin ? t("auth.createAccountLink") : t("auth.loginLink")}
                </button>
              </p>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}
