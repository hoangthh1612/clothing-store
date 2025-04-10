"use client";
import { redirect } from "next/navigation";
import Header from "./components/header/header";
import { Suspense, useEffect } from "react";
import SidebarMenu from "./components/sidebar/sidebarMenu";
import ProtectRoute from "../components/ProtectRoute";
import Loading from "./loading";

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Perform localStorage action
    const user = localStorage.getItem("user");
    if (!user) {
      redirect("/login");
    }
  }, []);
  return (
    <>
      <div className="flex flex-col h-screen w-screen" id="app-seller">
        <header className="fixed top-0 left-0 z-50 min-h-[50px] max-h-[50px] w-full bg-white border-b-2">
          <Header />
        </header>
        <div className="flex flex-1 justify-start items-start pt-[50px] app-container">
          <aside className="fixed z-20 h-[calc(100%-50px)] bg-white">
            <SidebarMenu />
          </aside>
          <main className="relative w-full page-container pl-[285px]">
            <div className="mx-20 my-5 page-content-wrapper">
              {children}
              {/* <ProtectRoute>
                <Suspense fallback={<Loading />}>
                {children}
                </Suspense>
                
              </ProtectRoute> */}
              </div>
          </main>
        </div>
      </div>
    </>
  );
}
