"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { supabase } from "@/libs/supabase";
import "./signup.scss"

interface SignUpFormInputs {
  email: string;
  password: string;
  nickname: string;
}

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormInputs>();

  const handleSignUp: SubmitHandler<SignUpFormInputs> = async (data) => {
    const { email, password, nickname } = data;
    console.log("x", data);

    try {
      const { data: signUpData, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            nickname: nickname,
          },
        },
      });
      if (error) throw error;
      console.log(signUpData);
      alert("회원가입이 완료되었습니다!");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="signup-container">
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit(handleSignUp)} className="signup-form">
        <div className="form-group">
          <input type="text" {...register("nickname", { required: "닉네임을 입력해주세요." })} placeholder="닉네임" />
          {errors.nickname && <p className="error-message">{errors.nickname.message}</p>}
        </div>
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
        <button type="submit" className="submit-button">가입하기</button>
      </form>
    </div>
  );
}
