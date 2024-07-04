"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { supabase } from "@/libs/supabase";
import { userState } from "@/atoms/userstate";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "./login.scss";
import Button from "@/components/button/button";

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function Login() {
  const setUser = useSetRecoilState(userState);
  const getUser = useRecoilValue(userState);
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  useEffect(() => {
    console.log("유저정보 변경됐누:", getUser);
  }, [getUser]);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user.id);
        setIsLoggedIn(true);
      }
    };
    checkLoginStatus();
  }, [setUser]);

  const handleLogin: SubmitHandler<LoginFormInputs> = async (data) => {
    const { email, password } = data;
    try {
      const { data: loginData, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (loginData.user) {
        setUser(loginData.user.id);
        setIsLoggedIn(true);
      }

      alert("로그인 성공!");
      router.replace("/"); // 로그인 성공 후 메인 페이지로 이동
    } catch (error: any) {
      console.error("로그인 에러:", error);
      alert(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      setIsLoggedIn(false);
      localStorage.removeItem("supabase.auth.token"); // 로컬 스토리지에서 토큰 제거
      localStorage.removeItem("userState"); // userState 삭제
      alert("로그아웃 성공!");
      router.replace("/login"); // 로그아웃 후 로그인 페이지로 이동
    } catch (error: any) {
      console.error("로그아웃 에러:", error);
      alert(error.message);
    }
  };

  if (isLoggedIn) {
    return (
      <div className="login-container">
        <p>이미 로그인된 상태입니다.</p>
        <button onClick={() => router.replace("/")}>메인 페이지로 이동</button>
        <button onClick={handleLogout}>로그아웃</button>
      </div>
    );
  }

  return (
    <div className="login-container">
      <h1>로그인</h1>
      <form onSubmit={handleSubmit(handleLogin)} className="login-form">
        <div className="form-group">
          <input
            type="email"
            {...register("email", {
              required: "이메일을 입력해주세요.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "유효한 이메일 주소를 입력해주세요.",
              },
            })}
            placeholder="이메일"
          />
          {errors.email && <p className="error-message">{errors.email.message}</p>}
        </div>
        <div className="form-group">
          <input
            type="password"
            {...register("password", {
              required: "비밀번호를 입력해주세요.",
            })}
            placeholder="비밀번호"
          />
          {errors.password && <p className="error-message">{errors.password.message}</p>}
        </div>
        <button type="submit" className="submit-button">
          로그인
        </button>
      </form>
    </div>
  );
}
