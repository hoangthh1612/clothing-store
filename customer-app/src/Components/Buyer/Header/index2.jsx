import logo from '../../../Resources/assets/img/logo.svg';

import './index.css';
import React, { Fragment, useState, useEffect } from 'react';
import {
  Menu,
  Input,
  Button,
  Avatar,
  Select,
  Badge,
  Dropdown,
  Space,
  Drawer,
} from 'antd';
import {
  ShoppingCartOutlined,
  SearchOutlined,
  BellOutlined,
  PoweroffOutlined,
  MenuFoldOutlined,
  SwapOutlined,
  HomeOutlined,
  ShoppingOutlined,
  FundProjectionScreenOutlined,
} from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import vnflag from 'Resources/assets/img/vi.png';
import enflag from 'Resources/assets/img/en.png';
import { useCookies } from 'react-cookie';
import useAxiosPrivate from '../../../Hooks/useAxiosPrivate';
import { stop } from '../../../redux/features/isAddToCartSlice';
import Cookies from "js-cookie"
import useLogout from '../../../Hooks/useLogout';
const SELLER_URL = "http://localhost:3000";

const { Search } = Input;
const { Option } = Select;

const MenuNavbar = () => {
  const navigate = useNavigate();
  const [isOpenDrawer, setOpenDrawer] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [numOfCart, setNumOfCart] = useState(0);
  const axiosPrivate = useAxiosPrivate();

  const addToCart = useSelector(state => state.isAddToCart);
  const dispatch = useDispatch();
  //const logOut = useLogout();
  const onLogout = async (e) => {
    e.preventDefault();
    //await logOut();
    localStorage.clear();
    setTimeout(() => {
      navigate('/login');
    }, 500)
  }
  const items = [
    {
      label: <Link to="/account">Acocunt Settings</Link>,
      key: 'x1',
    },
    {
      label: <Link to="/orders">Orders</Link>,
      key: 'x2',
    },
    // {
    //   label: <Link to="/chat">Message</Link>,
    //   key: 'x3',
    // },
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
      key: '4',
    },
  ];
  const itemsSideBar = [
    {
      label: 'NgVanB',
      key: 1,
      icon: (
        <Avatar
          // src={user.img ? user.img : constants.DEFAULT_USER_AVT}
          // gap={1}
          className="m-auto  w-28px h-28px"
        >
          T
        </Avatar>
      ),
      children: [...items],
    },
    {
      label: 'Notifications',
      key: 2,
      icon: <BellOutlined className="!text-[28px]" />,
    },
    {
      label: (
        <Select defaultValue="en" className="w-[100px]">
          <Option value="vi">
            <img
              src={vnflag}
              width="25px"
              height="25px"
              style={{ verticalAlign: 'sub' }}
              className="align-sub me-sm"
              alt="vn flag"
            />
            VI
          </Option>
          <Option value="en">
            <img
              src={enflag}
              width="25px"
              height="25px"
              style={{ verticalAlign: 'sub' }}
              className="align-sub me-sm"
              alt="en flag"
            />
            EN
          </Option>
        </Select>
      ),
      key: 3,
      icon: <SwapOutlined className="!text-[28px]" />,
      disabled: true,
    },
    {
      label: 'Cart',
      key: 4,
      icon: <ShoppingCartOutlined className="!text-[28px]" />,
    },
    { type: 'divider' },
    {
      label: (
        <div className="just-show-576px ">
          <Link to="/">Home</Link>
        </div>
      ),
      key: 5,
      icon: <HomeOutlined className="!text-[28px] just-show-576px" />,
    },
    {
      label: (
        <div className="just-show-576px ">
          <Link to="/product">Product</Link>
        </div>
      ),
      key: 6,
      icon: <ShoppingOutlined className="!text-[28px] just-show-576px" />,
    },
    {
      label: (
        <div className="just-show-576px ">
          <Link to="/live">Live</Link>
        </div>
      ),
      key: 7,
      icon: (
        <FundProjectionScreenOutlined className="!text-[28px] just-show-576px" />
      ),
    },
  ];

  const {pathname} = useLocation();
 
  const handleClickCart = () => {
    navigate('/shopping_cart');
  };

  useEffect(() => {
    const getCart = async () => {
      const res = await axiosPrivate.get('/cart/getCartByUserId');
      setNumOfCart(res.data.length);
    }
    if(isAuth) {
      if(addToCart) {
        getCart();
        dispatch(stop());
      }
      else {
        getCart();
      }
    }
  }, [addToCart, isAuth])

  const handleClickNotifications = () => {
    navigate('/notifications');
  };
  const [user, setUser] = useState();
  useEffect(() => {
    let user;
    if (typeof localStorage !== "undefined") {
      //user = JSON.parse(localStorage.getItem("user") || "");
      user = localStorage.getItem("user");

      user && setUser(JSON.parse(user));
    }
  }, []);
 

 
  useEffect(() => {
    let user = localStorage.getItem("user");
    user && setIsAuth(true);
  }, [])
  
  const navItems = [
    // {
    //     label: 'Home',
    //     href: '/',
    //     key: 'home'
    // },
    {
        label: 'Product',
        href: '/product',
        key: 'product'
    },
    {
        label: 'Live',
        href: '/live',
        key: 'live'
    },
    // {
    //     label: 'Seller',
    //     href: 'http://localhost:3000/',
    //     key: 'seller'
    // }


  ]
  return (
    <Fragment>
      <div className="flex items-center justify-center">
        <div key="logo" className="mr-5 logo">
          <Link to="/">
            <img src={logo} alt="Company Logo" />
          </Link>
        </div>
        <div className="flex flex-3 link-list">
          {/* <div className="mr-5"> */}
            {/* <HomeOutlined />  */}
            {/* <span>Home</span> */}
            {/* <Link to="/">Home</Link> */}
            {/* <Link className={`font-bold ${pathname === '/' && "text-blue-600"}`} to="/">Home</Link> */}
          {/* </div> */}
          {/* {navItems?.map((item) => 
          (
            <div key={item.key} className="px-2">
                <Link className={`font-bold ${pathname.includes(item.href) && "text-blue-600"}`} to={item.hrxef}>{item.label}</Link>
            </div>    
          ))} */}
          {/* <div key="shop" className="mr-5">
            <Link to="/product">Product</Link>
          </div>
          <div key="live" className="mr-5">
            <Link to="/live">Live</Link>
          </div> */}
        </div>
        <div className="mr-5 flex-1 flex">
          <Search
            placeholder="Search"
            // style={{ minWidth: '300px' }}
            size="large"
            // className="mx-5"
            enterButton={<Button icon={<SearchOutlined />} type="primary" />}
          />
        </div>
        <div className='mr-3'>
          <Link to={`${SELLER_URL}`} target="_blank" rel="noopener noreferrer"><span className='text-red-150'>Seller center</span></Link>
        </div>
        <div key="login" className="mr-5 username">
          {isAuth ? (
            <Fragment>
              {/* <span className="title"> */}
              {/* {helpers.reduceProductName(user.name, 12)} */}
              <Dropdown
                menu={{
                  items,
                  style: { padding: '1rem 0rem', width: '200px' },
                }}
              // autoFocus
              >
                {/* <a onClick={(e) => e.preventDefault()}> */}
                <Space>
                  <Avatar
                    // src={user.img ? user.img : constants.DEFAULT_USER_AVT}
                    // gap={1}
                    className="m-auto  w-28px h-28px"
                  >
                    
                  </Avatar>
                  {user ? user : "hoangthh"}
                  {/* <DownOutlined /> */}
                </Space>
                {/* </a> */}
              </Dropdown>
              {/* </span> */}
            </Fragment>
          ) : (
            <>
              <Link to="/login">Login</Link>
                <span>{" | "}</span>
              <Link to='/register'>Register</Link>
            </>
              
            )}
        </div>
        {
          isAuth &&
          <div className="mr-5 notification">
            {/* <Badge count={numOfNoti}> */}
            <Badge count={0}>
              <Avatar shape="square" size="small" icon={<BellOutlined onClick={handleClickNotifications} />} />
            </Badge>
          </div>
        }

        {/* <div className="mr-5 languages">
          <Select defaultValue="en" className="w-[100px]">
            <Option value="vi">
              <img
                src={vnflag}
                width="25px"
                height="25px"
                style={{ verticalAlign: 'sub' }}
                className="align-sub mr-sm inline"
                alt="vn flag"
              />
              VI
            </Option>
            <Option value="en">
              <img
                src={enflag}
                width="25px"
                height="25px"
                style={{ verticalAlign: 'sub' }}
                className="align-sub mr-sm inline"
                alt="en flag"
              />
              EN
            </Option>
          </Select>
        </div> */}
        {
          isAuth &&
          <div className="mr-5 cart">
            <Badge count={numOfCart}>
              <Avatar
                shape="square"
                size="small"
                icon={<ShoppingCartOutlined onClick={handleClickCart} />}
              />
            </Badge>
          </div>
        }

        <div className="lg:hidden sm:block">
          <Button onClick={() => setOpenDrawer(true)}>
            <MenuFoldOutlined />
          </Button>
          <Drawer
            // title="Drawer with extra actions"
            placement={'right'}
            width="400"
            onClose={() => setOpenDrawer(false)}
            open={isOpenDrawer}
            // headerStyle={{ display: 'none' }}
            // extra={
            //   <Space>
            //     <Button onClick={() => setOpenDrawer(false)}>X</Button>
            //   </Space>
            // }
            bodyStyle={{ padding: '24px 0' }}
          >
            <Menu
              // onClick={onClick}
              // style={{ width: 256 }}
              className="w-full !border-e-0"
              // defaultSelectedKeys={['1']}
              // defaultOpenKeys={['sub1']}
              mode="inline"
              items={itemsSideBar}
              muti
            />
          </Drawer>
        </div>
      </div>
    </Fragment>
    // <nav className="flex justify-between items-center">
    //   <div className="logo">
    //     <img src={logo} alt="" />
    //   </div>
    //   <div>
    //     <ul className="flex list-none items-center">
    //       <li>
    //         <a href="">Home</a>
    //       </li>
    //       <li>
    //         <a href="">Shop</a>
    //       </li>
    //       <li>
    //         <a href="">Live</a>
    //       </li>
    //       <li>
    //         <Search
    //           placeholder="Search"
    //           style={{ minWidth: '300px' }}
    //           size="large"
    //           enterButton={<Button icon={<SearchOutlined />} />}
    //         />
    //       </li>
    //       <ul className="flex list-none items-center">
    //         <li className="pe-4">
    //           <Avatar
    //             // src={user.img ? user.img : constants.DEFAULT_USER_AVT}
    //             className="me-4  w-28px h-28px"
    //           />
    //           <span className="title">
    //             {/* {helpers.reduceProductName(user.name, 12)} */}
    //             Tiến Thành
    //           </span>
    //         </li>
    //         <li className="pe-4">
    //           <Badge
    //             className="pos-absolute"
    //             size="default"
    //             style={{ color: '#fff' }}
    //             count={10}
    //             overflowCount={9}
    //             // offset={[18, -10]}
    //           />
    //         </li>
    //         <li className="pe-4">
    //           <Select
    //             defaultValue="vn"
    //             style={{ width: 80 }}
    //             onChange={() => {}}
    //             options={[
    //               { value: 'vn', label: 'VN' },
    //               { value: 'en', label: 'EN' },
    //             ]}
    //           />
    //         </li>
    //       </ul>
    //     </ul>
    //   </div>
    //   <div></div>
    // </nav>
  );
};

export default MenuNavbar;
