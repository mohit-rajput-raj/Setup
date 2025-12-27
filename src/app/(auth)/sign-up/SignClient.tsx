"use client";

import dynamic from "next/dynamic";

const SignUpForm = dynamic(
  () => import("../../../features/auth/components/Sign-upForm").then(m => m.SignUpForm),
  { ssr: false }
);

export default function SignUpClient() {
  return <SignUpForm />;
}
