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
  theme,
} from "antd";
import {
  ShoppingCartOutlined,
  BellFilled,
  BellOutlined,
  MailOutlined,
  PoweroffOutlined,
  SearchOutlined,
  SolutionOutlined,
  ShoppingFilled,
} from "@ant-design/icons";
// import Link from "next/link";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import vnflag from "Resources/assets/img/vi.png";
import enflag from "Resources/assets/img/en.png";
import { useCookies } from "react-cookie";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { stop } from "../../../redux/features/isAddToCartSlice";
import Cookies from "js-cookie";
import useLogout from "../../../Hooks/useLogout";
import logo from "../../../Resources/assets/img/logo.svg";

import logoBk from "Resources/assets/img/bk2.png";

import React from "react";
//import Breadcrumbs from "./breadCrumb";
// import Image from "next/image";
//import { useAuthContext } from "@/Context/AuthProvider";
// import axios, { axiosPrivate } from "@/api/axios";
// import { useRouter } from "next/navigation";
// import useAuth from "@/hooks/useAuth";
// import useLogout from "@/hooks/useLogout";
import { useEffect, useState } from "react";
// import { socket } from "@/hooks/socket/socket";
import { notification } from "antd";
//import BreadCrumbs from "../BreadCrumb/breadCrumb";

const { Text } = Typography;
// import type { MenuProps } from 'antd';

const SELLER_URL = "http://localhost:3000";
//////////////////

//////////////////
const Header = () => {
  //   const logout = useLogout();
  //   const router = useRouter();

  const [numOfCart, setNumOfCart] = useState(0);
  const [isAuth, setIsAuth] = useState(false);
  const { pathname } = useLocation();
  const axiosPrivate = useAxiosPrivate();
  //const {setAuth} = useAuth();

  const navigate = useNavigate();
  const addToCart = useSelector((state) => state.isAddToCart);
  // Xử lý lại header ở đây ----------------------------------------//
  const dispatch = useDispatch();

  const onLogout = async (e) => {
    e.preventDefault();
    //await logOut();
    localStorage.clear();
    setTimeout(() => {
      navigate("/login");
    }, 500);
  };

  ///////////////////////////////
  const { useToken } = theme;
  const { token } = useToken();

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
    },
    {
      type: "Type of Notification 1",
      title: "Title of Notification 1",
      message: "Message from Notification 1",
      time: "Time send notification 1",
      direct: "",
    },
  ];

  const NotificationItem = (props) => {
    return (
      <>
        <Link href={props.data.direct}></Link>
        {/* <div id="toast-notification" className="w-full max-w-xs p-4 text-black bg-white rounded-lg shadow dark:bg-gray-100 dark:text-black" role="alert"> */}
        <div
          id="toast-notification"
          className="w-full max-w-sm p-4 text-black bg-white rounded-lg shadow dark:bg-gray-100 dark:text-black"
          role="alert"
        >
          <div className="flex items-center mb-3">
            <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-black">
              {props.data.type}
            </span>
            {/* <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white justify-center items-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 e-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-notification" aria-label="Close">
                        <span className="sr-only">Close</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    </button> */}
          </div>
          <div className="flex items-center">
            <div className="relative inline-block shrink-0">
              <img
                className="w-12 h-12 rounded-full"
                src="https://memehay.com/meme/20220208/tien-bip-dua-ban-tay-hinh-nhay-cam.jpg"
                alt="Jese Leos image"
              />
              <span className="absolute bottom-0 right-0 inline-flex items-center justify-center w-6 h-6 bg-blue-600 rounded-full">
                <svg
                  className="w-3 h-3 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 18"
                  fill="currentColor"
                >
                  <path
                    d="M18 4H16V9C16 10.0609 15.5786 11.0783 14.8284 11.8284C14.0783 12.5786 13.0609 13 12 13H9L6.846 14.615C7.17993 14.8628 7.58418 14.9977 8 15H11.667L15.4 17.8C15.5731 17.9298 15.7836 18 16 18C16.2652 18 16.5196 17.8946 16.7071 17.7071C16.8946 17.5196 17 17.2652 17 17V15H18C18.5304 15 19.0391 14.7893 19.4142 14.4142C19.7893 14.0391 20 13.5304 20 13V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4Z"
                    fill="currentColor"
                  />
                  <path
                    d="M12 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V9C0 9.53043 0.210714 10.0391 0.585786 10.4142C0.960859 10.7893 1.46957 11 2 11H3V13C3 13.1857 3.05171 13.3678 3.14935 13.5257C3.24698 13.6837 3.38668 13.8114 3.55279 13.8944C3.71889 13.9775 3.90484 14.0126 4.08981 13.996C4.27477 13.9793 4.45143 13.9114 4.6 13.8L8.333 11H12C12.5304 11 13.0391 10.7893 13.4142 10.4142C13.7893 10.0391 14 9.53043 14 9V2C14 1.46957 13.7893 0.960859 13.4142 0.585786C13.0391 0.210714 12.5304 0 12 0Z"
                    fill="currentColor"
                  />
                </svg>
                <span className="sr-only">Message icon</span>
              </span>
            </div>
            <div className="ms-3 text-sm font-normal">
              <div className="text-sm font-semibold text-gray-900 dark:text-black">
                {props.data.title}
              </div>
              <div className="text-sm font-normal">{props.data.message}</div>
              <span className="text-xs font-medium text-blue-600 dark:text-blue-500">
                {props.data.time}
              </span>
            </div>
          </div>
        </div>
      </>
    );
  };

  const contentStyle = {
    // backgroundColor: token.colorBgElevated,
    // backgroundColor: "red",
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
    maxWidth: "800px",
    width: "400px",
    backgroundColor: "red",
  };

  const menuStyle = {
    boxShadow: "none",
    backgroundColor: "#99CCFF",
    overflowY: "scroll",
    maxHeight: "500px",
    width: "400px",
    maxWidth: "800px",
  };

  //////////--------------------------------------------------------//////////
  const [message, setMessage] = useState("");
  const [notiHiden, setNotiHiden] = useState(true);
  const [listNoti, setListNoti] = useState(template);
  const [messageSocket, setMessageSocket] = useState("");
  const [countNoti, setCountNoti] = useState(0);
  const [userInfo, setUserInfo] = useState();

  const items3 = listNoti.map((item, index) => {
    return {
      key: index,
      label: (
        <>
          <NotificationItem data={item} />
        </>
      ),
    };
  });

  const [notiRender, setNotiRender] = useState(items3);

  //   type NotificationType = 'success' | 'info' | 'warning' | 'error';
  const [api, contextHolder] = notification.useNotification();
  const [keyword, setKeyword] = useState("");
  const onSearchChange = (e) => {
    console.log(e.target.value);
    setKeyword(e.target.value);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?keyword=${keyword}`);

  }
  const listener = (...args) => {
    console.log("da nhan duoc thong tin tu nguoi ban");
    // setMessage(args[0]);
    // setListNoti(pre => [...pre, args[0]]);
    const dataAdd = {
      type: "Order from buyer",
      title: "Order",
      message: args[0],
      time: "now",
      direct: "/seller/order",
    };

    setListNoti((pre) => [dataAdd, ...pre]);

    setCountNoti((pre) => pre + 1);
    openNotification("success", {
      // key,
      message: "Receive order from buyer successfully!!!",
      description: "Your order be done and will delivery in future!",
      duration: 2,
    });
  };

  const connectSocket = () => {
    // socket.connect();
    // socket.on('foo', listener)
  };

  useEffect(() => {
    connectSocket();
  }, []);

  useEffect(() => {
    setNotiRender(
      listNoti.map((item, index) => {
        return {
          key: index,
          label: (
            <>
              <NotificationItem data={item} />
            </>
          ),
        };
      })
    );
  }, [listNoti]);
  const openNotification = (type, message) => {
    api[type](message);
  };

  const [user, setUser] = useState("");

  useEffect(() => {
    let user;
    if (typeof localStorage !== "undefined") {
      //user = JSON.parse(localStorage.getItem("user") || "");
      user = localStorage.getItem("user");
      user && setUser(JSON.parse(user));
    }

    // connectSocket();
  }, []);

  useEffect(() => {
    let user = localStorage.getItem("user");
    user && setIsAuth(true);
  }, []);


  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axiosPrivate.get(`/user/getUserByUsername/${user}`);
        localStorage.setItem("user-info", JSON.stringify(res.data));
        setUserInfo(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    user && getUser();
  }, [user]);
  console.log(userInfo);
  useEffect(() => {
    const getCart = async () => {
      const res = await axiosPrivate.get("/cart/getCartByUserId");
      setNumOfCart(res.data.length);
    };
    if (isAuth) {
      if (addToCart) {
        getCart();
        dispatch(stop());
      } else {
        getCart();
      }
    }
  }, [addToCart, isAuth]);

  const itemss = [
    {
      label: <Link to="/account">Acocunt Settings</Link>,
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
      label: <Link to="/orders">Order</Link>,
      key: "x2",
      icon: (
        <ShoppingFilled
          style={{
            fontSize: "15px",
          }}
        />
      ),
    },
    {
      label: (
        <Button
          onClick={onLogout}
          // size="large"

          className="px-0"
          type="text"
          danger={isAuth}
        >
          <PoweroffOutlined />
          Log out
        </Button>
      ),
      key: "5",
    },
  ];

  const handleClickCart = () => {
    navigate("/shopping_cart");
  };

  const navItems = [
    // {
    //   label: "HOME",
    //   href: "/",
    //   key: "home",
    // },
    {
      label: "PRODUCT",
      href: "/product",
      key: "product",
    },
    {
      label: "LIVE",
      href: "/live",
      key: "live",
    },
    // {
    //     label: 'Seller',
    //     href: 'http://localhost:3000/',
    //     key: 'seller'
    // }
  ];

  return (
    <div className="flex items-center justify-center w-full h-full px-3">
      <div className="flex flex-1 space-x-3">
        {contextHolder}
        <div key="logo" className="flex items-center">
          <Link to={"/"}>
            <img
              //src={logoBk}
              src={logo}
              // style={{
              //   maxHeight: "60px",
              //   maxWidth: "60px",

              // }}
              className=""
              alt="Company Logo"
            />
          </Link>
        </div>

        <div className="flex flex-3 link-list space-x-3">
          {/* <div className="mr-5"> */}
          {/* <HomeOutlined />  */}
          {/* <span>Home</span> */}
          {/* <Link to="/">Home</Link> */}
          {/* <Link className={`font-bold pt-6 ${pathname === '/' && "text-blue-600"}`} to="/">HOME</Link> */}
          {/* </div> */}
          <div>
            <Link
              className={`font-bold px-2 py-2 ${
                pathname === "/" && "text-blue-600"
              }`}
              to="/"
            >
              HOME
            </Link>
          </div>
          {navItems?.map((item) => (
            <div key={item.key} className="">
              <Link
                className={`font-bold px-2 py-2 ${
                  pathname.includes(item.href) && "text-blue-600"
                }`}
                to={item.href}
              >
                {item.label}
              </Link>
            </div>
          ))}
        </div>
        <div className="route-page-seller ml-3">
          {/* <Breadcrumbs items={items2} /> */}
          {/* <BreadCrumbs /> */}
        </div>
      </div>
      {/* <div className="header-seller-right"> */}
      <div className="flex flex-[2] items-center justify-start">
        <div className="ml-1 w-[75%]">
          <Input.Search
            placeholder="Search"
            onChange={onSearchChange}
            enterButton={
              <Button
                onClick={handleSearch}
                className="text-center"
                icon={<SearchOutlined />}
                type="primary"
                style={{ backgroundColor: "blue" }}
              />
            }
          ></Input.Search>
        </div>
        <div className="ml-3 w-[10%]">
          <Link to={`${SELLER_URL}`} target="_blank" rel="noopener noreferrer">
            <span className="text-red-150">Seller center</span>
          </Link>
        </div>
        <div className="flex w-[15%] justify-around mr-5">
          <div className="px-5">
            <>
              {/* <span className="title"> */}
              {/* {helpers.reduceProductName(user.name, 12)} */}
              {isAuth ? (
                <Dropdown menu={{ items: itemss }}>
                  <Space>
                    <Avatar 
                      src={userInfo && userInfo.avatar}
                      className="w-28px h-28px border-[1px] object-cover"></Avatar>
                    {user}
                  </Space>
                  {/* </a> */}  
                </Dropdown>
              ) : (
                <>
                  <Link to="/login">Login</Link>
                  <span>{" | "}</span>
                  <Link to="/register">Register</Link>
                </>
              )}
            </>
          </div>
          {isAuth && (
            <div className="border-r-[1px] border-slate-400">
            
            </div>
          )}
          <div className="flex items-center">
            {/* <div className="notification">
              <Badge count={2} dot>
              <MailOutlined
                  //size="small"
                  style={{ fontSize: 20 }}
                  // onClick={() => {
                  //   setCommentsOpen(true);
                  // }}
                />
              </Badge>
        
            </div> */}
            {isAuth && (
              <>
                <div className="mail ml-5">
                  <Badge count={numOfCart}>
                    <ShoppingCartOutlined
                      style={{ fontSize: 20 }}
                      onClick={handleClickCart}
                    />
                  </Badge>
                </div>
                <div className="mail ml-5">
                  <Dropdown
                    trigger={["click"]}
                    menu={{ items: notiRender }}
                    dropdownRender={(menu) => (
                      <div style={contentStyle}>
                        {React.cloneElement(menu, { style: menuStyle })}
                        {/* <Divider style={{ margin: 0 }} />
                    <Space style={{ padding: 8 }}>
                      <Button type="primary">Click me!</Button>
                    </Space> */}
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
