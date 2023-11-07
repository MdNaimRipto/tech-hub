"use-client";
import { envConfig } from "@/config/envConfig";
import { useUserContext } from "@/context/AuthContext";
import ResponsiveMobileNav from "@/shared/navbar/ResponsiveMobileNav";
import ProfileNav from "@/shared/navbar/profileNav/ProfileNav";
import UserProfileSideNav from "@/shared/sideNavs/UserProfileSideNav";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";
import AdminDashBoardNav from "@/shared/navbar/adminDashboardNav/AdminDashBoardNav";
import AdminDashboardSideNav from "@/shared/sideNavs/AdminDashBoardSideNav";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const {
    token,
    user,
    isLoading: authLoading,
    setToken,
    setUser,
  } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const [sideNaveOpen, setSideNavOpen] = useState(true);

  const router = useRouter();

  useEffect(() => {
    function redirectToLogin() {
      router.push("/authentication/login");
      Cookies.remove("token");
      setToken(undefined);
      setUser(null);
    }
    if (!authLoading) {
      if (token && user) {
        if (user?.userRole !== "admin" || user?.uid !== envConfig.admin_uid) {
          redirectToLogin();
        }
      } else {
        setIsLoading(true);
      }
    }
  }, [authLoading, token, user, router, setToken, setUser]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1280) {
        // Mobile and tablet view
        setSideNavOpen(false);
      } else {
        setSideNavOpen(true);
      }
    };

    // Initial check
    handleResize();
    // Add event listener to update on window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <AdminDashBoardNav
        sideNavOpen={sideNaveOpen}
        setSideNavOpen={setSideNavOpen}
      />
      <div className="flex container px-4">
        <div
          className={`absolute z-40 lg:static ${
            sideNaveOpen
              ? "w-[66%] md:w-2/5 xl:w-[20%] left-0"
              : "w-[6%] -left-96"
          } duration-300`}
        >
          <AdminDashboardSideNav sideNavOpen={sideNaveOpen} />
        </div>
        <div
          className={`${
            sideNaveOpen ? "w-full lg:w-[80%]" : "w-full lg:w-[94%]"
          } duration-300`}
        >
          {children}
        </div>
      </div>
      <ResponsiveMobileNav />
    </>
  );
};

export default AdminLayout;
