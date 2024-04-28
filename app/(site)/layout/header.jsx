"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const Header = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header
      className={`border-b-[1px]  lg:pt-[37px] lg:pb-[27px] py-4  border`}
    >
      <nav className="container  h-[54px] flex items-center ">
        <div className="w-full flex items-center justify-between">
          <Link
            href="/"
            className="md:w-[131px] md:h-[65px] w-[110px] h-[40px]"
          >
            <Image
              src={"/next.svg"}
              alt="logo"
              width={132}
              height={66}
              className="md:w-[131px] md:h-[65px] w-[110px] h-[40px]"
            />
          </Link>
          <div className="flex items-center gap-[100px]">
            <menu className="lg:flex gap-10 items-center hidden text-secondary">
              <Link
                href="/"
                className={`flex items-center  gap-[6px] font-medium text-base duration-500 hover:text-primary `}
              >
                <span>{"Home"}</span>
              </Link>

              <Link
                href="/#about-us"
                className={`flex  items-center gap-[6px] font-medium text-base duration-500 hover:text-primary `}
              >
                <span>{"About Us"}</span>
              </Link>
              <Link
                href="/privacy-policy"
                className={`flex  items-center gap-[6px] font-medium text-base duration-500  hover:text-primary`}
              >
                <span>{"Privacy Policy"}</span>
              </Link>
              <Link
                href="/terms-condition"
                className={`flex  items-center gap-[6px] font-medium text-base duration-500 hover:text-primary `}
              >
                <span>{"Terms & Condition"}</span>
              </Link>
            </menu>
            <div className="flex items-center lang gap-2 text-primary -me-3   ">
              {!open ? (
                <FaBars
                  onClick={() => setOpen(!open)}
                  className="lg:hidden text-xl"
                />
              ) : (
                <IoMdClose
                  onClick={() => setOpen(!open)}
                  className="lg:hidden text-xl"
                />
              )}
            </div>
          </div>
        </div>
        <div
          className={`absolute bg-white z-50 top-[87px] left-0 w-[100%] lg:hidden  pt-5 pb-10 flex flex-col px-5 gap-5 ${
            open ? "flex" : "hidden"
          } transition-all duration-1000`}
          style={{ filter: "drop-shadow(0px  20px 10px rgba(0, 0, 0, 0.20))" }}
        >
          <Link
            href="/"
            className={`flex items-center  gap-[6px] font-medium text-base duration-500  ${
              pathname === "/" ? "text-primary " : "hover:text-primary"
            } `}
            onClick={() => setOpen(!open)}
          >
            <span>{"Home"}</span>
          </Link>

          <Link
            href="/#about-us"
            className={`flex  items-center gap-[6px] font-medium text-base duration-500  ${
              pathname === "/about-us" ? "text-primary" : "hover:text-primary"
            } `}
            onClick={() => setOpen(!open)}
          >
            <span>{"About Us"}</span>
          </Link>
          <Link
            href="/privacy-policy"
            className={`flex  items-center gap-[6px] font-medium text-base duration-500  ${
              pathname === "/privacy-policy"
                ? "text-primary"
                : "hover:text-primary"
            } `}
            onClick={() => setOpen(!open)}
          >
            <span>{"Privacy Policy"}</span>
          </Link>
          <Link
            href="/terms-condition"
            className={`flex  items-center gap-[6px] font-medium text-base duration-500  ${
              pathname === "/terms-condition"
                ? "text-primary"
                : "hover:text-primary"
            } `}
            onClick={() => setOpen(!open)}
          >
            <span>{"Terms & Condition"}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
};
export default Header;
