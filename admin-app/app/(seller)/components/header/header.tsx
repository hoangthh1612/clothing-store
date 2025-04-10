"use client";

import {
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Dropdown,
  Input,
  Layout,
  Menu,
  Select,
  Space,
  Typography,
} from "antd";
import {
  BellFilled,
  BellOutlined,
  MailOutlined,
  PoweroffOutlined,
  SearchOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import Link from "next/link";
//import Breadcrumbs from "./breadCrumb";
import Image from "next/image";
//import { useAuthContext } from "@/Context/AuthProvider";
import axios, { axiosPrivate } from "@/api/axios";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import useLogout from "@/hooks/useLogout";
import { useEffect, useState } from "react";
import { socket } from "@/hooks/socket/socket";
import BreadCrumbs from "../breadCrumb/breadCrumb";

//////////////////////////
//here

import {
  theme
} from "antd";

import React from 'react';
//import Breadcrumbs from "./breadCrumb";

//import { useAuthContext } from "@/Context/AuthProvider";
import type { MenuProps } from 'antd';
import { notification } from 'antd';
//import BreadCrumbs from "../BreadCrumb/breadCrumb";

 // Xử lý lại header ở đây ----------------------------------------//


 const template = [
   {
     type: "Type of Notification 1",
     title: "Title of Notification 1",
     message: "Message from Notification 1",
     time: "Time send notification 1",
     direct: "",
   },

   {
     type: "Type of Notification 1",
     title: "Title of Notification 1",
     message: "Message from Notification 1",
     time: "Time send notification 1",
     direct: "",
   },
   {
     type: "Type of Notification 1",
     title: "Title of Notification 1",
     message: "Message from Notification 1",
     time: "Time send notification 1",
     direct: "",
   }
 ]

 const NotificationItem = (props: any) =>{
   return <>
           <Link href={props.data.direct}></Link>
           {/* <div id="toast-notification" className="w-full max-w-xs p-4 text-black bg-white rounded-lg shadow dark:bg-gray-100 dark:text-black" role="alert"> */}
           <div id="toast-notification" className="w-full max-w-sm p-4 text-black bg-white rounded-lg shadow dark:bg-gray-100 dark:text-black" role="alert">
               <div className="flex items-center mb-3">
                   <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-black">{props.data.type}</span>
                   {/* <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white justify-center items-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-notification" aria-label="Close">
                       <span className="sr-only">Close</span>
                       <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                           <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                       </svg>
                   </button> */}
               </div>
               <div className="flex items-center">
                   <div className="relative inline-block shrink-0">
                       <img className="w-12 h-12 rounded-full" src="https://brasol.vn/wp-content/uploads/2022/09/logo-bach-khoa-ho-chi-minh.jpg" alt="Jese Leos image"/>
                       <span className="absolute bottom-0 right-0 inline-flex items-center justify-center w-6 h-6 bg-blue-600 rounded-full">
                           <svg className="w-3 h-3 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 18" fill="currentColor">
                               <path d="M18 4H16V9C16 10.0609 15.5786 11.0783 14.8284 11.8284C14.0783 12.5786 13.0609 13 12 13H9L6.846 14.615C7.17993 14.8628 7.58418 14.9977 8 15H11.667L15.4 17.8C15.5731 17.9298 15.7836 18 16 18C16.2652 18 16.5196 17.8946 16.7071 17.7071C16.8946 17.5196 17 17.2652 17 17V15H18C18.5304 15 19.0391 14.7893 19.4142 14.4142C19.7893 14.0391 20 13.5304 20 13V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4Z" fill="currentColor"/>
                               <path d="M12 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V9C0 9.53043 0.210714 10.0391 0.585786 10.4142C0.960859 10.7893 1.46957 11 2 11H3V13C3 13.1857 3.05171 13.3678 3.14935 13.5257C3.24698 13.6837 3.38668 13.8114 3.55279 13.8944C3.71889 13.9775 3.90484 14.0126 4.08981 13.996C4.27477 13.9793 4.45143 13.9114 4.6 13.8L8.333 11H12C12.5304 11 13.0391 10.7893 13.4142 10.4142C13.7893 10.0391 14 9.53043 14 9V2C14 1.46957 13.7893 0.960859 13.4142 0.585786C13.0391 0.210714 12.5304 0 12 0Z" fill="currentColor"/>
                               </svg>
                           <span className="sr-only">Message icon</span>
                       </span>
                   </div>
                   <div className="ms-3 text-sm font-normal">
                       <div className="text-sm font-semibold text-gray-900 dark:text-black">{props.data.title}</div>
                       <div className="text-sm font-normal">{props.data.message}</div> 
                       <span className="text-xs font-medium text-blue-600 dark:text-blue-500">{props.data.time}</span>   
                   </div>
               </div>
           </div>
   </>
}



///////////////////////////////////////


//import BreadCrumbs from "../BreadCrumb/breadCrumb";
const isAuth = true;
const { Text } = Typography;

const Header = () => {

  const { useToken } = theme;
  const { token } = useToken();
 
  const contentStyle: React.CSSProperties = {
    // backgroundColor: token.colorBgElevated,
    // backgroundColor: "red",
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
    maxWidth: '800px',
    width: '400px',
    backgroundColor: "red",
   };
   
   const menuStyle: React.CSSProperties = {
    boxShadow: 'none',
    backgroundColor: "#99CCFF",
    overflowY: 'scroll',
    maxHeight: '500px',
    width: '400px',
    maxWidth: '800px'
   };
   

  const logout = useLogout();
  const router = useRouter();


  //const {setAuth} = useAuth();

  //-------- xử lý header ở đây --------------------//
  const [message, setMessage] = useState("");
  const [notiHiden, setNotiHiden] = useState(true);
  const [listNoti, setListNoti] = useState(template);
  const [messageSocket, setMessageSocket] = useState("");
  const [countNoti, setCountNoti] = useState(0);

  const items3 : MenuProps['items'] = listNoti.map((item, index)=> {
    return {
      key: index,
      label: (<><NotificationItem data = {item}/></>)
    }
})


  const [notiRender, setNotiRender] = useState(items3);

  type NotificationType = 'success' | 'info' | 'warning' | 'error';
  const [api, contextHolder] = notification.useNotification();

  const listener= (...args: any) =>{
    console.log("da nhan duoc thong tin tu nguoi ban");
    // setMessage(args[0]);
    // setListNoti(pre => [...pre, args[0]]);
    const dataAdd = {
      type: "Order from buyer",
      title: "Order",
      message: args[0],
      time: "now",
      direct: "/seller/order",
    }

    setListNoti(pre => [dataAdd, ...pre])
    
    setCountNoti(pre => pre+1);
    openNotification('success', {
      // key,
      message: 'Receive order from buyer successfully!!!',
      description: 'Your order be done and will delivery in future!',
      duration: 2
    });
     
  }

  const connectSocket =  () => {
    socket.connect();
    socket.on('foo', listener)
}

  useEffect(()=>{
    connectSocket(); 
  }, [])

  useEffect(()=>{
    setNotiRender(listNoti.map((item, index)=> {
      return {
        key: index,
        label: (<><NotificationItem data = {item}/></>)
      }
  }))

  }, [listNoti])
const openNotification = (type: NotificationType, message: any) => {
    api[type](message);
  }

  const handleLogout = async (e: any) => {
    e.preventDefault();
    //setAuth({});
    await logout();
    localStorage.clear();
    setTimeout(() => {
      router.push('/login');
    }, 500)
  };

  const items2 = [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "Product",
      path: "/seller/product",
    },
    {
      label: "Order",
      path: "/seller/order",
    },
  ];
  const [user, setUser] = useState("" as string);
  const [userInfo, setUserInfo] = useState<any>();

  useEffect(() => {
    let user, userInfo;
    if (typeof localStorage !== "undefined") {
      //user = JSON.parse(localStorage.getItem("user") || "");
      user = localStorage.getItem("user");
      //userInfo = localStorage.getItem("userInfo");
      
      //userInfo && setUserInfo(JSON.parse(userInfo));
      user && setUser(JSON.parse(user));
    }
  }, []);
  console.log(userInfo);
  
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axiosPrivate.get(`/user/getUserByUsername/${user}`);
        setUserInfo(res.data);
        localStorage.setItem("user-info", JSON.stringify(res.data));
        
        // console.log(res.data.id);
        
      } catch (error) {
        console.log(error);
      }
    };

    user && getUser();
  }, [user]);

  const items = [
    {
      label: <Link href="/seller/setting/shop-profile">Shop profile</Link>,
      key: "x1",
      icon: (
        <SolutionOutlined
          style={{
            fontSize: "15px",
          }}
        />
      ),
    },
    {
      label: (
        <Button
          onClick={handleLogout}
          // size="large"

          className="px-0"
          type="text"
          danger={isAuth}
        >
          <PoweroffOutlined />
          Log out
        </Button>
      ),
      key: "4",
    },
  ];
  useEffect(() => {
    if (typeof window !== undefined && window.localStorage){
      //const userData = JSON.parse(localStorage.getItem('userInfo') || '{}');
      // console.log(userData);
    }
  }, [])
  
  return (
    <div className="flex items-center justify-center min-h-[50px] max-h-[50px] header-seller">
      {contextHolder}
      <div className="flex flex-[1]">
        <div key="logo" className="ml-4">
          <Link href="/">
            <Image
              src="/logo.svg"
              //src="/logo8.jpg"
              width={150}
              height={50}
              alt="Company Logo"
            />
          </Link>
        </div>
        <div className="route-page-seller ml-5">
          {/* <Breadcrumbs items={items2} /> */}
          <BreadCrumbs />
        </div>
      </div>
      {/* <div className="header-seller-right"> */}
      <div className="header-seller-right flex flex-[1] items-center justify-start">
        <div className="ml-1 w-2/3">
          <Input.Search
            placeholder="Search"
            enterButton={
              <Button
                icon={<SearchOutlined />}
                type="primary"
                style={{ backgroundColor: "blue" }}
              />
            }
          ></Input.Search>
        </div>
        <div className="flex w-1/3 space-x-2">
          <div className="px-5">
            <>
             
              <Dropdown
                menu={{
                  items,
                  style: { padding: "1rem 0rem", width: "200px" },
                }}
                // autoFocus
              >
               
                <Space>
                  <Avatar
                    src={userInfo && userInfo.avatar}
                    
                    className="m-auto w-28px h-28px border-[1px] object-cover"
                  >
                    
                  </Avatar>
                  {user}
                  {/* <DownOutlined /> */}
                </Space>
                {/* </a> */}
              </Dropdown>
              {/* </span> */}
            </>
          </div>
          <div className="border-r-[1px] border-b-gray-400"></div>
          <div className="flex items-center">
            <div className="notification">
              {/* <Badge count={2} dot>
                <MailOutlined
              
                  style={{ fontSize: 20 }}
                />
              </Badge> */}
            </div>
            <div className="mail ml-5">
            <Dropdown
                trigger={['click']}
                menu={{ items: notiRender }}
                dropdownRender={(menu) => (
                  <div style={contentStyle}>
                    {React.cloneElement(menu as React.ReactElement, { style: menuStyle })}
                  </div>
                )}
              >
  
                <Badge count={countNoti}>
                <BellOutlined
                  style={{ fontSize: 20 }}
                  onClick={() => {
                    // setNotificationsOpen(true);      
                    setCountNoti(0);                         
                  }}
                />
              </Badge>

            </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
