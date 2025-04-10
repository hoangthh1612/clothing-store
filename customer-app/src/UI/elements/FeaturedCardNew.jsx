import {
  Button,
  Col,
  Popover,
  Rate,
  Row,
  Space,
  InputNumber,
  Typography,
  message
} from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { click } from "../../redux/features/isAddToCartSlice";
import { useDispatch } from "react-redux";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { addData } from "../../redux/features/checkoutSlice";



const { Text, Title } = Typography;

const formatCurrency = (amount) => {
  const options = {
    style: "currency",
    currency: "VND"
  };

  return amount.toLocaleString("vi-VN", options).replace("₫", "đ");
}
const formatNumber = (amount) => {
  const options = {
    style: "currency",
    currency: "VND"
  };

  return amount.toLocaleString("vi-VN", options).replace("₫", "");
}


const getPriceRange = (product_details) => {
  const listPrices = product_details?.map((item) => item.price);
  let max = Math.max(...listPrices);
  let min = Math.min(...listPrices);
  if (max === min) return `${formatCurrency(min)}`;
  return `${formatNumber(min)}- ${formatCurrency(max)}`;
};
function areObjectsEqual(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1?.length !== keys2?.length) {
    return false;
  }

  for (let key of keys1) {
    if (!keys2?.includes(key) || obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
}

const getPriceOrQuantity = (value, product_detail) => {
  let result = {};
  for (const item of product_detail) {
    let obj = {};

    for (const i of item.variation_options) {
      obj[`${i.variation_name}`] = i.option;
    }

    // if(JSON.stringify(obj) === JSON.stringify(value)) {
    if (areObjectsEqual(value, obj)) {
      result.quantity = item.quantity;
      result.price = item.price;
      result.id = item.id;
      return result;
    }
  }
  return undefined;
};

export default function FeaturedCardNew({
  product,
  containerRef,
  isShow,
  setIsShow,
  currentProduct,
}) {


  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Add product to cart successfully',
    });
  };



  const navigate = useNavigate();
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  // console.log(product);
  const [values, setValues] = useState({});
  const [price, setPrice] = useState();
  const [rangePrice, setRangePrice] = useState();
  const [inputNumber, setInputNumber] = useState(1);
  const [quantity, setQuantity] = useState();
  const [productDetails, setProductDetails] = useState([]);
  const [productDetailId, setProductDetailId] = useState();
  const [inputQuantity, setInputQuantity] = useState(1);
  const [isVariation, setIsVariation] = useState(false);
  const [errMessage, setErrMessage] = useState(null);
  const variations = product?.variations?.map((item) => {
    const options = item.variation_options?.map((i) => {
      //console.log(i.type_value);
      return {
        option_name: i.type_value,
      };
    });
    return {
      variation_name: item.type_name,
      options,
    };
  });

  useEffect(() => {
    setInputNumber(1);
    setInputQuantity(1);
  }, [values]);

  const hasKeyValue = (obj, key, value) => {
    return obj?.hasOwnProperty(key) && obj[key] === value;
  };
  const handleVarationOption = (e, option_name, variation_name) => {
    e.preventDefault();
    // console.log("Click....");
    // console.log(`${variation_name}: ${option_name}`);
    setValues((pre) => ({ ...pre, [variation_name]: option_name }));
  };
  const handleInputNumber = (value) => {
    // console.log(value);
    setInputNumber(value);
  };

  useEffect(() => {
    let product_details = product?.product_details?.map((item) => {
      const variation_options = item.skus_variation_options?.map((i) => {
        return {
          variation_name: i.variation_options.variation_name,
          option: i.variation_options.type_value,
        };
      });
      return {
        id: item.id,
        quantity: item.quantity,
        price: item.price,
        variation_options,
      };
    });
    setProductDetails(product_details);
    product && setRangePrice(getPriceRange(product.product_details));
    product && product.variations?.length !== 0 && setIsVariation(true);
  }, [product]);
  // console.log(productDetails);

  useEffect(() => {
    const result = getPriceOrQuantity(values, productDetails);
    result && setPrice(result.price);
    result && setQuantity(result.quantity);
    result && setProductDetailId(result.id);
  }, [values]);

  const checkErrMessage = (quantity, isVariation) => {
    if (!quantity && isVariation) {
      return "Please select product variation";
    }
    return null;
  };

  useEffect(() => {
    if (quantity && isVariation) {
      setErrMessage(null);
    }
  }, [quantity, isVariation]);

  const handleClickBuyNow = () => {
    let message = checkErrMessage(quantity, isVariation);
    if (message) {
      setErrMessage(message);
      return;
    }

    const { product_details, ...others } = product;

    let product_detail = {};
    for (let item of product_details) {
      if (item.id === productDetailId) {
        product_detail = {
          ...item,
          Product: others,
        };
        break;
      }
    }
    const values = {
      storeId: product_detail.Product.storeId,
      totalPrice: inputQuantity * price,
      data: [
        {
          quantity: inputQuantity,
          product_detail,
          productDetailId,
          storeId: product_detail.Product.storeId,
        },
      ],
    };
    // console.log(values);

    dispatch(addData(values));
    //navigate("/checkout");
    window.open("http://localhost:3001/checkout", "_blank", "noreferrer");
  };
  const handleClickAddToCart = async () => {
    let message = checkErrMessage(quantity, isVariation);
    if (message) {
      setErrMessage(message);
      return;
    }
    const values = {
      productDetailId,
      quantity: inputQuantity,
    };

    try {
      const res = await axiosPrivate.post("/cart/create", values);
      // console.log(res.data);
      dispatch(click());

      success();
      // window.open(
      //   "http://localhost:3001/shopping_cart",
      //   "_blank",
      //   "noreferrer"
      // );
    } catch (error) {
      console.log(error);
    }
  };
  const increment = (e) => {
    e.preventDefault();
    let value = inputQuantity + 1;
    //setInputQuantity(value);
    value > quantity ? setInputQuantity(quantity) : setInputQuantity(value);
  };
  const decrement = (e) => {
    e.preventDefault();
    let value = inputQuantity - 1;

    setInputQuantity(value);
  };
  const handleChangeQuantity = (e) => {
    const inputValue = e.target.value;
    const numericValue = parseInt(inputValue, 10);
    // console.log(numericValue);
    if (!isNaN(numericValue) && numericValue !== 0) {
      setInputQuantity(numericValue);
    }
    if (quantity) {
      if (numericValue > quantity) setInputQuantity(quantity);
    }
  };
  
  const content = (
    <div className="rounded-xl border-2 p-xl">
       {contextHolder}
      <Row gutter={[16, 16]}>
        <Col className="w-[200px]">
          <div>
            <img
              //src="https://lzd-img-global.slatic.net/g/p/bc9dc49231c13c51e0ebe413ee3f8fa2.jpg_156x156q80.jpg_.webp"
              src={product.image}
              alt="product"
              className="rounded-xl w-full"
            />
          </div>
          {/* <p>Although all OLEDs deliver similar fantastic picture</p> */}
        </Col>
        <Col>
          <div>
            <Title level={2}>{product && product.product_name}</Title>
            <Rate disabled defaultValue={5} />
            {/* <Title level={2}>Color </Title> */}
            <Row>
              <Text type="danger" className="text-2xl">
                {price ? formatCurrency(price) : getPriceRange(product.product_details)}
              </Text>
            </Row>
            {variations?.map((variation, index1) => (
              <Fragment key={index1}>
                <Text className="text-2xl">{variation.variation_name}</Text>
                <Row>
                  <Space>
                    {variation.options?.map((option, index2) => (
                      <Button
                        className={`${
                          hasKeyValue(
                            values,
                            variation.variation_name,
                            option.option_name
                          )
                            ? "bg-blue-400"
                            : ""
                        }`}
                        onClick={(e) =>
                          handleVarationOption(
                            e,
                            option.option_name,
                            variation.variation_name
                          )
                        }
                        key={index2}
                      >
                        {option.option_name}
                      </Button>
                    ))}
                  </Space>
                </Row>
              </Fragment>
            ))}
            <Row gutter={[16, 16]} className="mt-xl">
              <Col>
                <Row>
                  <div className="flex">
                    <button
                      disabled={inputQuantity === 1}
                      onClick={decrement}
                      className="border-[1px] px-3 py-2 font-medium"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      className="w-[70px] px-4 py-2 border-[1px] text-center"
                      onChange={handleChangeQuantity}
                      value={inputQuantity}
                    />
                    <button
                      onClick={increment}
                      className="border-[1px] px-3 py-2"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-xl ml-3">
                    {!isVariation
                      ? quantity === 0
                        ? `out of stock`
                        : `${quantity} pieces available`
                      : quantity
                      ? quantity === 0
                        ? `out of stock`
                        : `${quantity} pieces available`
                      : ""}
                  </p>
                </Row>
              </Col>
            </Row>

            {/* {quantity && <p className="text-xl">{quantity} in stocks</p>} */}
          </div>
        </Col>
      </Row>
      {errMessage && <p className="text-red-150">{errMessage}</p>}
      <Row className="mt-5" justify="center">
        <Space wrap align="center">
          <Button type="primary" size="large" onClick={handleClickAddToCart}>
            Add to cart
          </Button>
          <Button
            className="bg-red-400"
            danger
            size="large"
            onClick={handleClickBuyNow}
          >
            <span className="text-black">Buy Now</span>
          </Button>
        </Space>
      </Row>
    </div>
  );

  return (
    
    <Popover
      content={content}
      trigger="click"
      getPopupContainer={() => containerRef.current}
      open={isShow}
      onOpenChange={setIsShow}
    >
      {/* <div className="relative p-xl border-2 rounded-lg border-solid hover:border-red-150 border-transparent transition duration-300 ease-in-out"> */}
      {/* <div className="px-3 py-2 w-full h-[160px] flex border-[2px] border-slate-300 rounded-lg border-solid border-red-500 border-[5px]"> */}
      <div className={`px-3 py-2 w-full h-[160px] flex border-[2px] rounded-lg border-solid ${currentProduct?.id === product.id ? "border-red-500 border-[5px]" : "border-slate-300"}`}>
        {/* <div className="text-center">
          <Text type="danger">Featured now</Text>
        </div> */}
        <div className="w-[35%] relative h-full px-2 py-1">
          <img
            src={product && product.image}
            alt="product"
            className="rounded-[4px] top-[10%] right-[5%] object-contain absolute max-w-[95%] max-h-[95%]"
          />
        </div>

        <div className="w-[65%] px-[5px] block py-[12px]">
          <p className="text-[16px] min-h-[30%] text-slate-500">{product && product.product_name}</p>
          {/* <Rate value={5} disabled /> */}
          {/* <h2 className="mb-0">In Stock 50</h2> */}
          <p className="text-[18px] text-red-500">
            {getPriceRange(product.product_details)}
          </p>
          <div>&nbsp;</div>
          <div>&nbsp;</div>
        
          <div className="flex-wrap font-bold text-xl text-sky-600">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{product.order}</div>
        </div>

        

        {/* </div> */}


      </div>
       
    </Popover>
  );
}
