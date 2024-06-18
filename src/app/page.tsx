'use client'

import {useAuthContext} from "@/context/AuthContext";
import {redirect} from "next/navigation";

export default function Home() {
  const {loginUser} = useAuthContext();
  if (loginUser) {
    redirect("/dashboard")
  } else if (loginUser === null) {
    redirect("/login");
  }
}
