'use client'

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const SubMenu = ({ data }: {data: any}) => {
  const [path, setPath] = useState("");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    searchParams.get("type") ? setPath(`${pathname}?type=${searchParams.get("type")}`) : setPath(pathname);
  }, [pathname, searchParams])
  
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  return (
    <>
      <li
        className={`link ${pathname?.includes(data.path) && "text-blue-600"}`}
        onClick={() => setSubMenuOpen(!subMenuOpen)}
      >
        {/* <data.icon size={23} className="min-w-max" /> */}
        {data.icon}
        <p className="flex-1 capitalize font-bold font-sans">{data.label}</p>
        <IoIosArrowDown
          className={` ${subMenuOpen && "rotate-180"} duration-200 `}
        />
      </li>
      <motion.ul
        animate={
          subMenuOpen
            ? {
                height: "fit-content",
              }
            : {
                height: 0,
              }
        }
        className="flex h-0 flex-col pl-10 text-[0.8rem] font-normal overflow-hidden"
      >
        {data.subNav?.map((menu:any) => (
        <li key={menu.label}>
            {/* className="hover:text-blue-600 hover:font-medium" */}
            <Link
            href={menu.path}
            //className={`link-sub-nav !bg-transparent capitalize ${path?.includes(menu.path) && "text-blue-500"}`}
            className={`link-sub-nav !bg-transparent capitalize ${path === menu.path && "text-blue-500"}`}
            
            >
            <p className="font-sans">{menu.label}</p>
            </Link>
        </li>
        ))}
      </motion.ul>
    </>
  );
};

export default SubMenu;
