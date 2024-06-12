"use client";

import { useState } from "react";
import { supabase } from "@/components/supabase";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");

  async function handleSignUp() {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            nickname,
          },
        },
      });
      if (error) throw error;
      console.log(data);
      alert("회원가입이 완료되었습니다!");
    } catch (error: any) {
      alert(error.message);
    }
  }

  return (
    <div>
      <h1>회원가입</h1>
      <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="닉네임" />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호" />
      <button onClick={handleSignUp}>가입하기</button>
    </div>
  );
}
