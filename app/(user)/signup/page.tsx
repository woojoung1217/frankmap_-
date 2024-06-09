"use client";

import { FormEvent } from "react";

export default function page() {
  let email = "";
  let password = "";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const emailInput = document.getElementById("email") as HTMLInputElement;
    const passwordInput = document.getElementById("password") as HTMLInputElement;

    const email = emailInput.value;
    const password = passwordInput.value;

    try {
      const response = await fetch("./api/signup.ts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("회원가입 실패");
      }

      console.log("성공");
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      console.log(message);
    }
  };

  return (
    <div>
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">이메일</label>
          <input type="email" id="email" required />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input type="password" id="password" required />
        </div>
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}
