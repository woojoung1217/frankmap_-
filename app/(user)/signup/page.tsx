"use client";

import { createClient } from "@supabase/supabase-js";
import { useState } from "react";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const supabaseUrl = "https://jyrfxniwlrpwpcdjivbe.supabase.co";
    const supabaseKey =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5cmZ4bml3bHJwd3BjZGppdmJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc0MTc3MTcsImV4cCI6MjAzMjk5MzcxN30.Z_tGSYleW1nANDdys23jsCCUkEh888R6GniRPNMofzM";
    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        throw error;
      }
      console.log("Signup successful", user);
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      console.log(message);
    }
  };

  return (
    <div>
      <input type="text" placeholder="이름" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignup}>회원가입</button>
    </div>
  );
};

export default Signup;
