"use client";

import { useState } from "react";
import { subMenusData } from "./subMenuData";
import SubMenu from "./subMenu";
//import { subMenusList } from "./subMenusList";

const SidebarMenu = () => {
  //console.log(SidebarOptions);

  return (
    // <div className="p-2">
    //   <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
    //     <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-1 pb-4 border-r-2">
    //       <div className="flex h-16 shrink-0 items-center">
    //         <h1 className="text-3xl font-bold">Logo</h1>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <>
      <div
        className=" bg-white text-gray shadow-xl z-[999] max-w-[285px] w-[285px] 
            overflow-hidden md:relative fixed h-screen"
      >
        <div className="flex flex-col h-full">
          <ul className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col gap-1 font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100 md:h-full h-full">
            {subMenusData?.map((menu: any) => (
              <div key={menu.label} className="flex flex-col gap-1">
                <SubMenu data={menu} />
              </div>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SidebarMenu;
