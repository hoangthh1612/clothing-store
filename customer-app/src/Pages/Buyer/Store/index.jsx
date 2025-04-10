import React, { Fragment, useState, useEffect } from "react";
import { useQuery } from "../../../Hooks";
import {
  Col,
  Layout,
  Radio,
  Row,
  Space,
  Input,
  Breadcrumb,
  Typography,
  Card,
  Button,
  Pagination,
} from "antd";
import { ProductList, Slider } from "Components";
import data from "Components/Buyer/DumpData";
import { Link, NavLink, redirect, useSearchParams } from "react-router-dom";
import { Panigation, Product } from "UI/elements";
import { LivestreamCard } from "UI/elements";
import { useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import ProductCardNew from "../../../UI/elements/ProductCard";
import InventoryIcon from "@mui/icons-material/Inventory";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';

const { Title, Text } = Typography;
const { Search } = Input;

// function breadcrumbItem(item ) {
function itemRender(route, params, items, paths) {
  console.log("items", items);
  const last = items.indexOf(route) === items.length - 1;
  return last ? (
    <span>{route.title}</span>
  ) : (
    <Link to={paths.join("/")}>{route.title}</Link>
  );
}

const { Meta } = Card;

const Store = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const [store, setStore] = useState();
  const [numsOfProduct, setNumOfProduct] = useState();
  const [numsOfFollower, setNumsOfFollower] = useState();
  const [followers, setFollwers] = useState();
  const [followed, setFollowed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  console.log(searchParams.get("storeId"));

  const axiosPrivate = useAxiosPrivate();
  const getCategories = async () => {
    const res = await fetch("http://localhost:8080/api/category", {
      method: "GET",
    });
    const data = await res.json();
    setCategories(data);
  };

  // const getProducts = async () => {
  //   const res = await fetch("http://localhost:8080/api/product", {
  //     method: "GET",
  //   });
  //   const data = await res.json();
  //   setProducts(data);
  // };

  useEffect(() => {
    getCategories();
    //getProducts();
  }, []);

  const getStore = async (storeId) => {
    const res = await axios.get(`/store/getStoreById/${storeId}`);
    setStore(res.data);
  };
  const getProductsByStoreId = async (storeId) => {
    const res = await axios.get(`/product/getProductByStoreId/${storeId}`);
    setNumOfProduct(res.data.length);
    setProducts(res.data);
  };
  const getFollow = async (storeId) => {
    try {
      const res = await axios.get(`/follow/getFollowsByStoreId/${storeId}`);
      setNumsOfFollower(res.data.length);
      setFollwers(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    let storeId = searchParams.get("storeId");
    console.log(storeId);

    getStore(storeId);
    getProductsByStoreId(storeId);
    getFollow(storeId);
  }, []);
  useEffect(() => {
    let storeId = searchParams.get("storeId");
    getFollow(storeId);
  }, [followed]);
  let user = JSON.parse(localStorage.getItem("userInfo"));
  let userId = user.id;
  console.log(userId);
  console.log(followed);
  useEffect(() => {
    if (followers) {
      let isFollowed = followers?.findIndex((item) => item.userId === userId);
      console.log(isFollowed);
      isFollowed !== -1 && setFollowed(true);
    }
  }, [followers]);
  console.log(products);
  console.log(store);
  const { livestreams } = data;
  const { sort, value } = useQuery();

  const settings = {
    // className: 'center',
    centerMode: true,
    centerPadding: "0px",
    slidesToShow: 1,
    speed: 500,
    rows: 2,
    slidesPerRow: 6,
    infinite: true,
    draggable: false,
    // adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesPerRow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesPerRow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesPerRow: 2,
        },
      },
    ],
  };
  const onChange = (page, pageSize) => {
    console.log(page, pageSize);
    setCurrentPage(page);
  };
  const startIdx = (currentPage - 1) * pageSize;
  const endIdx = startIdx + pageSize;
  const currentProducts = products.slice(startIdx, endIdx);

  //handle click button
  const handleFollow = async (e) => {
    e.preventDefault();

    let storeId = searchParams.get("storeId");
    if (!followed) {
      try {
        const res = await axiosPrivate.post("/follow/create", {
          storeId: parseInt(storeId),
        });
        setFollowed(true);
        return;
      } catch (error) {
        console.log(error);
        return;
      }
    }
    try {
      const res = await axiosPrivate.delete(`follow/unFollow/${storeId}`);
      setFollowed(false);
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();
  const handleMessageClick = () => {
    // console.log('chat');
    // return redirect('/chat');
    navigate("/chat");
  };

  return (
    <div className="mx-48">
      <div className="flex h-[150px] bg-white px-5 py-2">
        <div className="flex-[1] relative">
          <img
            alt="background"
            src="https://cdn.tgdd.vn/Files/2020/03/30/1245645/vector-landscape-wallpaper-by-wallsbyjfl-_2048x1152-800-resize.jpg" // Đường dẫn đến ảnh nền cửa hàng
            className="w-full h-[130px]"
          />
          <div
            style={{
              position: "absolute",
              top: "40%",
              left: "35%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="flex">
              <div className="mr-5">
                <img
                  className="w-[100px] h-[100px] rounded-[50%] object-cover"
                  src={
                    (store && store.avatar) ||
                    "https://cdn.vectorstock.com/i/1000x1000/08/28/shop-store-flat-icon-vector-14270828.webp"
                  }
                  alt=""
                />
              </div>
              <div className="flex flex-col">
                <p className="font-bold text-xl">{store && store.shop_name}</p>
              </div>
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              top: "55%",
              left: "33%",
              //transform: "translate(-50%, -50%)",
            }}
          >
            <div>
              <button
                className="px-20 py-1 border-[1px] bg-yellow-300"
                onClick={handleFollow}
              >
                {!followed ? "+ Follow" : "Following"}
              </button>
            </div>
          </div>
        </div>

        <div className="flex-[2] flex px-5 py-2">
          <div className="flex flex-col justify-between">
            <div className="flex items-center">
              <i>
                <Inventory2OutlinedIcon fontSize="small" />
              </i>
              <p className="ml-2 text-slate-600 text-xl">
                Products:{" "}
                <span className="text-blue-400">
                  {numsOfProduct && numsOfProduct}
                </span>
              </p>
            </div>
            <div className="flex items-center">
              <i>
                <PersonAddAltOutlinedIcon />
              </i>
              <p className="ml-2 text-slate-600 text-xl">
                Followers:{" "}
                <span className="text-blue-400">
                  {numsOfFollower && numsOfFollower}
                </span>
              </p>
            </div>
            {/* <div className="flex items-center">
              <i><InventoryIcon fontSize="small" color="info" /></i>
              <p className="ml-2 font-medium text-xl">Followers: <span className="text-red-150">{numsOfFollower && numsOfFollower}</span></p>
            </div> */}
          </div>
        </div>
      </div>

      {/* <div style={{ textAlign: "center", fontStyle: "italic" }}>
        <p>
          Chúng tôi tự hào là địa chỉ mua sắm tuyệt vời cho những người yêu
          thích phong cách và sự cá nhân hóa.
        </p>
      </div> */}

      <div>
        <br></br>
        <br></br>
      </div>

      <div className="bg-white px-5 py-2">
        {/* <Slider
          settings={{
            ...settings,
            rows: 1,
            slidesToShow: 1,
            slidesPerRow: 6,
          }}
          textLevel={4}
          title="LIVESTREAMS"
        >
          {livestreams.map((item, index) => (
            <NavLink to={`/live`} key={index} className="px-5">
              <LivestreamCard {...item} />
            </NavLink>
          ))}
        </Slider> */}

        {/* <Slider
          settings={{
            ...settings,
            rows: 1,
            slidesToShow: 1,
            slidesPerRow: 10,
            
          }}
          textLevel={4}
          title="PRODUCT CATEGORIES"
        >
          {categories?.map((item, index) => (
            <NavLink
              to={`/category?sort=category&value=${item.title}`}
              key={index}
              className="px-5"
            >
              <Card
                
                cover={
                  <img
                    alt="example"
                    src={item.image}
                    loading="lazy"
                   
                  />
                }
                bodyStyle={{ display: "none" }}
              ></Card>
              <Title level={5} className="text-center">
                {item.category_name}
              </Title>
            </NavLink>
          ))}
        </Slider> */}
        <div className="mb-8">
        <p className="text-xl my-4 uppercase font-bold">ALL PRODUCTS</p>
          
          <ProductList products={currentProducts} />

          <Pagination
            className="text-center"
            total={products?.length}
            onChange={onChange}
            current={currentPage}
            pageSize={pageSize}
          />
        </div>
        {/* {!(sort && value) ? (
          <Fragment>
            <Title level={4}>ALL PRODUCTS</Title>
            <ProductList products={currentProducts} />
           
            <Pagination
              className="text-center"
              total={products?.length}
              onChange={onChange}
              current={currentPage}
              pageSize={pageSize}
            />
            <Slider
              settings={{
                ...settings,
                rows: 1,
                slidesToShow: 1,
                slidesPerRow: 6,
                responsive: [],
              }}
              textLevel={4}
              title={"ALL PRODUCTS"}
            >
              {products.map((product, index) => (
                <NavLink
                  to={`/product_detail?id=${product.id}`}
                  key={product.id}
                >
                  <ProductCardNew product={product} />
                </NavLink>
              ))}
            </Slider>
            <Panigation className="text-center" />
          </Fragment>
        ) : (
          <Slider
            settings={{
              ...settings,
              rows: 1,
              slidesToShow: 1,
              slidesPerRow: 6,
              responsive: [],
            }}
            textLevel={4}
            title={"TOP PRODUCTS"}
          >
            
          </Slider>
        )} */}
      </div>
    </div>
  );
};

export default Store;
