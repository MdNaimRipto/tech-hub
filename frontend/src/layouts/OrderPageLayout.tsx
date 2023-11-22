"use-client";
import { useUserContext } from "@/context/AuthContext";
import Footer from "@/shared/footer/Footer";
import Navbar from "@/shared/navbar/mainNav/Navbar";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useState } from "react";

const OrderPageLayout = ({ children }: { children: ReactNode }) => {
  const { token, user, isLoading: authLoading } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!authLoading) {
      if (!token && !user) {
        router.push("/authentication/login");
      } else {
        setIsLoading(true);
      }
    }
  }, [authLoading, token, user, router, isLoading]);

  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default OrderPageLayout;
