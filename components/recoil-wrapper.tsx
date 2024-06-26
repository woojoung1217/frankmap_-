"use client";
import { RecoilRoot } from "recoil";
import Modal from "./modal/modal";

interface RecoilRootWrapperProps {
  children: React.ReactNode;
}

export default function RecoilRootWrapper({ children }: RecoilRootWrapperProps) {
  return (
    <RecoilRoot>
      {children}
      <Modal />
    </RecoilRoot>
  );
}
