"use client";

import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const token = useAuthStore((state) => state.token)

  useEffect(() => {
    if (token) {
      router.replace("/dashboard")
    } else {
      router.replace("/login")
    }
  }, [token, router])

  return null;
}
