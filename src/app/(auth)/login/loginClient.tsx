// src/features/auth/components/LoginClient.tsx
"use client";

import dynamic from "next/dynamic";

const LoginForm = dynamic(
  () => import("../../../features/auth/components/loginForm").then(m => m.LoginForm),
  { ssr: false }
);

export default function LoginClient() {
  return <LoginForm />;
}
