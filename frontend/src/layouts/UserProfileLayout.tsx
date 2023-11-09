"use-client";
import { useUserContext } from "@/context/AuthContext";
import ResponsiveMobileNav from "@/shared/navbar/ResponsiveMobileNav";
import ProfileNav from "@/shared/navbar/profileNav/ProfileNav";
import UserProfileSideNav from "@/shared/sideNavs/UserProfileSideNav";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useState } from "react";

const UserProfileLayout = ({ children }: { children: ReactNode }) => {
  const { token, user, isLoading: authLoading } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const [sideNaveOpen, setSideNavOpen] = useState(true);

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
      <ProfileNav sideNavOpen={sideNaveOpen} setSideNavOpen={setSideNavOpen} />
      <div className="flex container px-4">
        <div
          className={`fixed z-40 lg:sticky top-0 h-[calc(100vh-75px)] ${
            sideNaveOpen
              ? "w-[66%] md:w-2/5 xl:w-[20%] left-0"
              : "w-[6%] -left-96"
          } duration-300`}
        >
          <UserProfileSideNav sideNavOpen={sideNaveOpen} />
        </div>
        <div
          className={`pt-16 ${
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

export default UserProfileLayout;
