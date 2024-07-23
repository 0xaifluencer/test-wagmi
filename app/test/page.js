"use client";

import NotConnected from "@/components/shared/NotConnected";
import Test from "@/components/shared/Test";

import { useAccount } from "wagmi";

const page = () => {
  const { isConnected } = useAccount();

  return <div>{isConnected ? <Test /> : <NotConnected />}</div>;
};

export default page;
