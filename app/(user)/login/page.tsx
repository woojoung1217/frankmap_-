"use client";

import { useState } from "react";
import { supabase } from "@/components/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
      if (error) throw error;
      alert("로그인 성공!");
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);

      console.log(message);
    }
  }

  return (
    <div>
      <h1>로그인</h1>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호" />
      <button onClick={handleLogin}>로그인</button>
    </div>
  );
}
