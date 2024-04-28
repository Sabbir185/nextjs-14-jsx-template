"use client";
import Sidebar from "../components/layout/sidebar";
import Header from "../components/layout/header";
import { FaHome, FaWrench } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { ImExit } from "react-icons/im";
import { GrServices } from "react-icons/gr";
import MainLoader from "../../components/common/loader";

const Layout = ({ children }) => {
  const user = true;

  if (!user) {
    return (
      <>
        {/* or login page  */}
        <MainLoader /> 
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {user && (
        <>
            <div className="dashboard relative">
              <Sidebar title="Dashboard" menu={menu} />
              <Header title="Admin Panel" />
              <div className="fixed top-0 h-16 z-10 w-full bg-white" />
                  <div className="main-content">
                      <div className="w-full p-5 z-0" style={{minHeight: 400}}>
                          {children}
                      </div>
                  </div>
            </div>
        </>
      )}
    </div>
  );
};
export default Layout;


const menu = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: <FaHome />,
  },
  {
    label: "Live Site",
    href: "/",
    icon: <ImExit />,
  },
  {
    label: "Service",
    icon: <GrServices />,
    child: [
      {
        label: "Category",
        href: "/admin/category",
        icon: <BiCategory />,
      },
    ],
  },
  {
    label: "Site Settings",
    href: "/admin/settings",
    icon: <FaWrench />,
  },
];
