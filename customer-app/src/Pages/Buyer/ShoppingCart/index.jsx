import React, { useState, useEffect } from "react";
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
} from "antd";
import Layout from "antd/es/layout/layout";

import { NavLink, useNavigate } from "react-router-dom";

import cartAPI from "api/cart";
import axios from "../../../api/axios";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { CardGiftcardSharp } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { addData } from "../../../redux/features/checkoutSlice";
import { click, stop } from "../../../redux/features/isAddToCartSlice";
import { useSocket } from "../../../context/useSocket";

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

const ShoppingCart = () => {
  const [totalPrice, setTotalPrice] = useState(0);

  const [userId, setUserId] = useState(2);

  const [products, setProducts] = useState([]);

  const [price, setPrice] = useState();

  const [carts, setCarts] = useState();
  const { socket, handleData, data } = useSocket();
 
  // change quantity or check
  const [change, setChange] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();
  const addToCart = useSelector((state) => state.isAddToCart);

  const dispatch = useDispatch();
  // const checkout = useSelector(state => state.checkout);
  // console.log(checkout);
  useEffect(() => {
    const getCart = async () => {
      const res = await axiosPrivate.get("/cart/getCartByUserId");
      // console.log(res.data);
      setCarts(res.data?.map((item) => ({ ...item, checked: false })));
    };
    if (addToCart) {
      getCart();
      dispatch(stop());
    } else {
      getCart();
    }
  }, [addToCart]);

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
      // console.log(res.data);
      setProducts(res.data);
    };
    getProducts();
  }, []);

  const handleQuantityChange = (id, quantity) => {
    const updatedCard = carts.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity: quantity,
        };
      }
      setChange(!change);
      return item;
    });
    setCarts(updatedCard);
  };

  useEffect(() => {
    if (carts) {
      let result = 0;
      for (const item of carts) {
        if (item.checked) {
          result += item.quantity * item.product_detail.price;
        }
      }
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
  const handleRemoveProductFromCart = async (e, id) => {
    e.preventDefault();
    try {
      const res = await axiosPrivate.delete(
        `/cart/removeProductFromCart/${id}`
      );
      // console.log(res.data);
      setCarts((pre) => {
        return pre?.filter((item) => item.productDetailId !== id);
      });
      dispatch(click());
    } catch (error) {
      console.log(error);
    }
  };
  
  
  const handleChange = (value) => {
    setSelectedValue(value);
  };
  const handleCheckout = (e) => {
    e.preventDefault();
    const checkedCarts = carts.filter((cart) => cart.checked === true);
    const data = checkedCarts?.map((item) => {
      return {
        ...item,
        storeId: item.product_detail.Product.storeId,
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
    <Layout style={{ padding: "24px 50px" }}>
      <div>
        <Title level={4}>SHOPPING CART</Title>
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: "16px", flex: "3" }}>
            {carts && (
              <List
                itemLayout="vertical"
                dataSource={carts}
                renderItem={(item) => (
                  <List.Item
                    key={item.id}
                    extra={
                      <Image
                        width={150}
                        src={
                          "https://help.rangeme.com/hc/article_attachments/360006928633/what_makes_a_good_product_image.jpg"
                        }
                      />
                    }
                  >
                    <List.Item.Meta
                      // title={item.product_detail.Product.product_name + ' - ' + formatCurrency(item.product_detail.price)}
                      title={
                        item.product_detail.Product.product_name +
                        " - " +
                        item.product_detail.price * item.quantity
                      }
                      description={getVariation(
                        item.product_detail.skus_variation_options
                      )}
                      // description={
                      //   item.Product_variant.Variant_values.map((variant_value) => (
                      //     <>
                      //       <span key={variant_value.id}>
                      //         {'-'} {variant_value.Option_value.value} {' '}
                      //       </span>
                      //     </>
                      //   ))
                      // }
                    />

                    <Checkbox
                      checked={item.checked}
                      onChange={() => handleCheckboxChange(item.id)}
                    >
                      Choose to checkout
                    </Checkbox>
                    <Divider />
                    <InputNumber
                      min={1}
                      defaultValue={item.quantity}
                      onChange={(quantity) =>
                        handleQuantityChange(item.id, quantity)
                      }
                    />
                    <Select
                      style={{ width: 200 }}
                      placeholder="Select a voucher"
                      value={selectedValue}
                      onChange={handleChange}
                      disabled={true}
                    >
                      <Option value="option1">Voucher 1</Option>
                      <Option value="option2">Voucher 2</Option>
                      <Option value="option3">Voucher 3</Option>
                    </Select>
                    <button
                      onClick={(e) =>
                        handleRemoveProductFromCart(e, item.productDetailId)
                      }
                      className="text-red-150"
                    >
                      delete
                    </button>
                  </List.Item>
                )}
              />
            )}

            <div>
              <Divider />
              <h2>Total Price: ${totalPrice}</h2>
              <Button
                icon={<ShoppingCartOutlined />}
                type="primary"
                // style={{ background: '#1890ff' }}
                onClick={handleCheckout}
                className="bg-[#1890ff]"
              >
                Checkout
                {/* <a href={'/checkout'}>Checkout</a> */}
              </Button>
            </div>
          </div>
          <div className="mr-xl flex-1"></div>
          <div style={{ flex: "1" }}>
            <Title level={4}>RELATED PRODUCTS</Title>
            <List
              itemLayout="vertical"
              dataSource={products}
              renderItem={(product) => (
                <NavLink
                  to={`/product_detail?id=${product.id}`}
                  key={product.id}
                >
                  <List.Item
                    key={product.id}
                    extra={
                      <Image
                        width={100}
                        src={product.image}
                        alt={product.product_name}
                      />
                    }
                  >
                    <List.Item.Meta
                      title={product.product_name}
                      description={
                        <>
                          <Rate
                            disabled
                            defaultValue={
                              Math.floor(Math.random() * (5 - 3 + 1)) + 3
                            }
                            style={{
                              fontSize: window.screen.width > 576 ? 14 : 10,
                            }}
                          />
                          <Text type="danger" strong>
                            {"200 - 300"}
                          </Text>
                        </>
                      }
                    />
                  </List.Item>
                </NavLink>
              )}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShoppingCart;
