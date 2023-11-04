import UserProfile from "@/pages/user/profile";
import ProfileNav from "@/shared/navbar/profileNav/ProfileNav";
import UserProfileSideNav from "@/shared/sideNavs/UserProfileSideNav";
import React, { ReactNode, useEffect, useState } from "react";

const UserProfileLayout = ({ children }: { children: ReactNode }) => {
  const [sideNaveOpen, setSideNavOpen] = useState(true);

  // Detect screen size and set sideNavOpen accordingly
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

  return (
    <>
      <ProfileNav sideNavOpen={sideNaveOpen} setSideNavOpen={setSideNavOpen} />
      <div className="flex items-center container px-4">
        <div
          className={`absolute lg:static ${
            sideNaveOpen
              ? "w-[66%] md:w-2/5 xl:w-[20%] left-0"
              : "w-[6%] -left-96"
          } duration-300`}
        >
          <UserProfileSideNav sideNavOpen={sideNaveOpen} />
        </div>
        <div
          className={`${
            sideNaveOpen ? "w-full lg:w-[80%]" : "w-full lg:w-[94%]"
          } duration-300`}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default UserProfileLayout;
