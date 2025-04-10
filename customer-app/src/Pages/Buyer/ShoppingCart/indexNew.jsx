import React, { useState, useEffect, Fragment } from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import {
  Button,
  List,
  Image,
  Checkbox,
  InputNumber,
  Divider,
  Select,
  Typography,
  Rate,
  Slider,
  message,
} from "antd";
import Layout from "antd/es/layout/layout";

import { NavLink, useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { useDispatch, useSelector } from "react-redux";
import { addData } from "../../../redux/features/checkoutSlice";
import { click, stop } from "../../../redux/features/isAddToCartSlice";
import { useSocket } from "../../../context/useSocket";
import ShowCart from "./components/ShowCart";
import ProductCardNew from "../../../UI/elements/ProductCard";
import FeaturedCardNew from "../../../UI/elements/FeaturedCardNew";
import TopProductCard from "../../../UI/product/TopProductCard";

const getVariation = (skus) => {
  let result = "";
  for (const item of skus) {
    let str = `${item.variation_options.variation_name}: ${item.variation_options.type_value}`;
    if (result !== "") {
      result = result + "," + str;
      break;
    }
    result += str;
    //result[`${item.variation_options.variation_name}`] = item.variation_options.type_value
  }
  return result;
};

const { Title, Text } = Typography;

const ShoppingCartNew = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [products, setProducts] = useState(null);
  const [price, setPrice] = useState();
  const [carts, setCarts] = useState();
  const [change, setChange] = useState(false);
  const [orderStore, setOrderStore] = useState([]);
  const [numsItemChecked, setNumsItemChecked] = useState();
  const axiosPrivate = useAxiosPrivate();
  const [checkedAll, setCheckedAll] = useState(false);
  const navigate = useNavigate();
  const addToCart = useSelector((state) => state.isAddToCart);

  const dispatch = useDispatch();
  // const checkout = useSelector(state => state.checkout);
  // console.log(checkout);
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
  useEffect(() => {
    const getCart = async () => {
      const res = await axiosPrivate.get("/cart/getCartByUserId");
      //console.log(res.data);
      setCarts(
        res.data?.map((item) => ({
          ...item,
          checked: false,
          storeId: item.product_detail.Product.storeId,
        }))
      );
    };
    if (addToCart) {
      getCart();
      dispatch(stop());
    } else {
      getCart();
    }
  }, [addToCart]);

  // console.log(carts);

  useEffect(() => {
    if (carts && carts.length > 0) {
      // console.log(getVariation(carts[0].product_detail.skus_variation_options));
    }
  }, [carts]);

  const formatCurrency = (amount) => {
    const options = {
      style: "currency",
      currency: "VND",
    };

    return amount.toLocaleString("vi-VN", options).replace("₫", "đ");
  };

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get("/product");
      setProducts(res.data);
    };
    getProducts();
  }, []);

  useEffect(() => {
    if (carts) {
      let result = 0;
      let i = 0;
      for (const item of carts) {
        if (item.checked) {
          result += item.quantity * item.product_detail.price;
          i++;
        }
      }
      setNumsItemChecked(i);
      setTotalPrice(result);
    }
  }, [carts]);

  const handleCheckboxChange = (id) => {
    const updatedCard = carts.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          checked: !item.checked,
        };
      }
      return item;
    });
    setChange(!change);
    setCarts(updatedCard);
    // if (carts != null) {
    //   handleTotalPrice();
    // }
  };

  const handleTotalPrice = () => {
    if (carts != null) {
      let totalPrice = 0;
      carts.forEach((item) => {
        if (item.checked) {
          totalPrice += item.product_detail.price * item.quantity;
        }
      });
      setTotalPrice(totalPrice);
    }
  };

  const { Option } = Select;

  const [selectedValue, setSelectedValue] = useState(null);

  useEffect(() => {
    if (carts) {
      let ids = carts?.map((item) => item.storeId);
      let uniqueArray = [...new Set(ids)];
      let result = [];
      for (const id of uniqueArray) {
        let data = carts?.filter((item) => item.storeId === id);
        let total_price = 0;
        for (const i of data) {
          total_price += i.product_detail.price * i.quantity;
        }
        result.push({ order_store: data, storeId: id, total_price });
      }
      // console.log(result);
      setOrderStore(result);
    }
  }, [carts]);
  const handleCheckboxAll = (e) => {
    setCheckedAll(!checkedAll);
  };
  useEffect(() => {
    const updateCart = carts?.map((item) => ({ ...item, checked: checkedAll }));
    setCarts(updateCart);
  }, [checkedAll]);
  const handleCheckout = (e) => {
    e.preventDefault();
    if (numsItemChecked === 0) {
      return;
    }
    const checkedCarts = carts.filter((cart) => cart.checked === true);
    const data = checkedCarts?.map((item) => {
      return {
        ...item,
      };
    });
    const values = {
      totalPrice,
      data,
    };
    dispatch(addData(values));

    setTimeout(() => {
      navigate("/checkout");
    }, 500);
  };

  return (
    <Layout
      style={{
        padding: "24px 50px",
        margin: "10px 100px",
      }}
    >
      <div className="bg-white px-5 py-2">
        <p className="text-xl my-4 uppercase font-bold">SHOPPING CART</p>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ marginRight: "16px", flex: "3" }}>
            <div className="flex h-[50px] items-center border-[1px] mb-5 px-5">
              <div className="min-w-[60px]">
                <Checkbox onChange={handleCheckboxAll} checked={checkedAll} />
              </div>
              <div className="w-[48%]">
                <p className="font-bold text-[16px]">Product</p>
              </div>
              <div className="w-[14%]">
                <p className="text-center font-bold text-[16px]">Price</p>
              </div>
              <div className="w-[14%]">
                <p className="text-center font-bold text-[16px]">Quantity</p>
              </div>
              <div className="w-[14%]">
                <p className="text-center font-bold text-[16px]">Total Price</p>
              </div>
              <div className="">
                <p className="text-center font-bold text-[16px]">Action</p>
              </div>
            </div>
            {orderStore?.map((item, index) => (
              <Fragment key={index}>
                <ShowCart
                  productStore={item}
                  carts={carts}
                  setCarts={setCarts}
                  setOrderStore={setOrderStore}
                />
              </Fragment>
            ))}
            {carts?.length === 0 && <p>Cart empty</p>}
            {carts?.length !== 0 && (
              <div className="border-[1px] px-3 py-2 flex items-center">
                <div className="mr-4 flex items-center">
                  <p className="text-[16px] mr-3">{`Total(${numsItemChecked} item):`}</p>
                  <span className="text-red-150 text-[28px]">{`${formatCurrency(
                    totalPrice
                  )}`}</span>
                </div>
                <button
                  disabled={carts?.filter((item) => item.checked).length === 0}
                  onClick={handleCheckout}
                  className="bg-[#1890ff] px-5 py-1 rounded-md"
                >
                  Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-5 bg-white px-5 py-2">
        <p className="text-xl my-4 uppercase font-bold">RELATED PRODUCTS</p>
        <TopProductCard products={products} />
      </div>
    </Layout>
  );
};

export default ShoppingCartNew;
