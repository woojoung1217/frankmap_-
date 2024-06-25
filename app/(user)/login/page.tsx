"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { supabase } from "@/libs/supabase";
import { userState } from "@/atoms/userstate";
import { useRecoilState } from "recoil";
import { useRouter } from "next/navigation";

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function Login() {
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const handleLogin: SubmitHandler<LoginFormInputs> = async (data) => {
    const { email, password } = data;
    try {
      const { data: loginData, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      alert("로그인 성공!");

      console.log("loginData:", loginData); // loginData 전체 로그 출력

      // 로그인된 사용자 정보를 userState에 저장
      setUser(loginData.user.id);

      router.replace("/");
    } catch (error: any) {
      console.error("로그인 에러:", error);
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>로그인</h1>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div>
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
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <input
            type="password"
            {...register("password", {
              required: "비밀번호를 입력해주세요.",
            })}
            placeholder="비밀번호"
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}
