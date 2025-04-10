import {
  Button,
  Col,
  Divider,
  InputNumber,
  Layout,
  Radio,
  Rate,
  Row,
  Space,
  Typography,
  Avatar,
  message,
} from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
import { Comment } from "@ant-design/compatible";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Slider } from "../../../Components";
import { Title, Text } from "UI/typo";
import "./index.css";
import productAPI from "api/product";
import { useSearchParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import axios from "../../../api/axios";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { useDispatch, useSelector } from "react-redux";
import { click } from "../../../redux/features/isAddToCartSlice";
import { addData } from "../../../redux/features/checkoutSlice";
import InfoStore from "./components/InfoStore";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const formatCurrency = (amount) => {
  const options = {
    style: "currency",
    currency: "VND",
  };

  return amount.toLocaleString("vi-VN", options).replace("₫", "đ");
};
const formatNumber = (amount) => {
  const options = {
    style: "currency",
    currency: "VND",
  };

  return amount.toLocaleString("vi-VN", options).replace("₫", "");
};

const getPriceRange = (product_details) => {
  let listPrices = product_details?.map((item) => item.price);
  let max = Math.max(...listPrices);
  let min = Math.min(...listPrices);
  if (max === min) return `${formatCurrency(max)}`;
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

const { Paragraph } = Typography;
// const colors = ['RED', 'BLUE', 'GREEN'];
export default function ProductDetailNew() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImg, setCurrentImg] = useState();
  const [searchParams] = useSearchParams();

  const [product, setProduct] = useState(null);
  const [numOfReview, setNumOfReview] = useState();
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(null);
  const [reviews, setReviews] = useState();
 
  const [isAddSuccess, setIsAddSuccess] = useState(false);
  const [isVariation, setIsVariation] = useState(false);
  const [errMessage, setErrMessage] = useState(null);
  const [inputQuantity, setInputQuantity] = useState(1);
  const [sold, setSold] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [listImage, setListImage] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const [values, setValues] = useState({});
  const [rangePrice, setRangePrice] = useState();
  const [productDetails, setProductDetails] = useState([]);
  const [productDetailId, setProductDetailId] = useState();
  const [percentReview, setPercentReview] = useState();
  const [messageApi, contextHolder] = message.useMessage();
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [activedImage, setActivedImage] = useState('');
  const [isActived, setIsActive] = useState(false);
  const [indexImage, setIndexImage] = useState(0);
  
  const containerRef = useRef(null);
  

  const handleScroll = () => {
    const container = containerRef.current;
    if (container) {
      setScrollPosition(container.scrollLeft);
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(container.scrollLeft < container.scrollWidth - container.clientWidth);
    }
  };

  const  handleArrowClick = (e, direction) => {
    e.preventDefault();
    const container = document.getElementById("image-container");
    const scrollAmount = 100; // Điều chỉnh giá trị scroll

    if (direction === "left") {
      container.scrollLeft -= scrollAmount;
      
    } else {
      container.scrollLeft += scrollAmount;
      
    }

    setScrollPosition(container.scrollLeft);
    setShowLeftArrow(container.scrollLeft > 0);
    setShowRightArrow(container.scrollLeft < container.scrollWidth - container.clientWidth);
    
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Add to cart successfully",
    });
  };

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const addToCart = useSelector((state) => state.isAddToCart);

  useEffect(() => {
    let productId = searchParams.get("productId");
    const getProduct = async (productId) => {
      const res = await axios.get(`/product/getProductById/${productId}`);
      // console.log(res.data);
      setProduct(res.data);
      res.data.variations?.length !== 0 && setIsVariation(true);
      if (res.data.variations?.length === 0) {
        for (const item of res.data?.product_details) {
          setQuantity(item.quantity);
          setPrice(item.price);
          setProductDetailId(item.id);
        }
      }
    };
    getProduct(productId);
  }, [searchParams.get("productId")]);
  console.log(product);
  
  // console.log(product);
  const checkErrMessage = (quantity, isVariation) => {
    if (!quantity && isVariation) {
      return "Please select product variation";
    }
    return null;
  };

 
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
  const hasKeyValue = (obj, key, value) => {
    return obj?.hasOwnProperty(key) && obj[key] === value;
  };
  const handleVarationOption = (e, option_name, variation_name) => {
    e.preventDefault();

    //console.log(`${variation_name}: ${option_name}`);
    setValues((pre) => ({ ...pre, [variation_name]: option_name }));
  };

  useEffect(() => {
    if (product) {
      let product_details = product?.product_details?.map((item) => {
        const variation_options = item.skus_variation_options?.map((i) => {
          return {
            variation_name: i.variation_options.variation_name,
            option: i.variation_options.type_value,
          };
        });
        return {
          ...item,
          variation_options,
        };
      });
      let result = 0;
      let images = [];
      images.push(product.image);
      for (const item of product_details) {
        result += item.sold;
        console.log(item.image);
        item.image && images.push(item.image);
      }
      setSold(result);
      setListImage(images);
      setActivedImage(images[0]);
      setProductDetails(product_details);
    }
    product && setRangePrice(getPriceRange(product?.product_details));
  }, [product]);

  console.log(listImage);
  //console.log(productDetails);

  useEffect(() => {
    const result = getPriceOrQuantity(values, productDetails);
    result && setPrice(result.price);
    result && setQuantity(result.quantity);
    result && setProductDetailId(result.id);
    setInputQuantity(1);
  }, [values]);

  useEffect(() => {
    if (quantity && isVariation) {
      setErrMessage(null);
    }
  }, [quantity, isVariation]);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    let message = checkErrMessage(quantity, isVariation);
    if (message) {
      setErrMessage(message);
      return;
    }
    const data = {
      productDetailId,
      quantity: inputQuantity,
    };
    //console.log(data);
    try {
      const res = await axiosPrivate.post("/cart/create", data);
      // console.log(res.data);
      dispatch(click());
      success();
      setIsAddSuccess(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    let message = checkErrMessage(quantity, isVariation);
    if (message) {
      setErrMessage(message);
      return;
    }
    const { product_details, ...others } = product;
    // const product_detail = product_details?.filter((item) => {
    //   if(item.id === productDetailId) {
    //     return {
    //       ...item,
    //       Product: others
    //     }
    //   }
    // });
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
      totalPrice: inputQuantity * price,
      data: [
        {
          storeId: product_detail.Product.storeId,
          quantity: inputQuantity,
          productDetailId,
          product_detail,
        },
      ],
    };
    // console.log(values);

    dispatch(addData(values));
    //navigate("/checkout");
    // window.open("http://localhost:3001/checkout", "_blank", "noreferrer");
    setTimeout(() => {
      navigate("/checkout");
    }, 100);

    // <Link to={'/checkout'} target="_blank" rel="noreferrer"></Link>
  };

  useEffect(() => {
    const id = searchParams.get("productId");
    const getProductReivews = async (id) => {
      const res = await axios.get(
        `/product-review/getProductReviewByProductId/${id}`
      );
      // console.log(res.data);
      setReviews(res.data);
      let result = 0;
      const listRates = res.data.map((item) => item.rating);
      for (let num of listRates) {
        result += num;
      }
      if (result === 0) {
        setNumOfReview(4.5);
        return;
      }
      setNumOfReview(result / listRates.length);
    };
    getProductReivews(id);
  }, []);

  //   if (!product) {
  //     return <div>Loading...</div>;
  //   }
  const increment = (e) => {
    e.preventDefault();
    let value = inputQuantity + 1;
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

  return (
    <Layout className="my-5 mx-[250px]">
      <section className="bg-white flex p-2">
        <section className="shrink-0 w-[40%] flex flex-col px-2 py-1">
          <div className="flex flex-col">
            <div className="relative">
              <img
                //src={currentImg ? currentImg : product.Product_images[0].image}
                src={activedImage}
                alt="product"
                className="object-contain w-full h-full border-[1px]"
              />
            </div>

            <div className="relative overflow-hidden block touch-pan-y h-[100px]">
              {/* <div
              className="flex overflow-x-scroll p-0 m-0 snap-x duration-300"
              id="product-container"
            > */}
              {/* {topProducts?.map((product, index) => (
              <NavLink to={`/product_detail?id=${product.id}`} key={product.id}>
                <div className="min-w-[220px] w-[1/6] touch-pan-y overflow-x-hidden">
                  <ProductCardNew product={product} />
                </div>
              </NavLink>
              
            ))} */}
              <div 
                ref={containerRef}
                onScroll={handleScroll}
                className="flex overflow-x-scroll p-0 m-0 snap-x duration-300"
                id="image-container"
              >
                {listImage?.map((image, index) => (
                  <div
                    onClick={() => {
                      setActivedImage(image);
                      setIndexImage(index);
                    }}
                    key={index}
                    className={`w-[20%] min-w-[100px] h-full inline-block p-[2px]
                     box-border overflow-x-hidden cursor-pointer`}
                  >
                    <img
                      //src={currentImg ? currentImg : product.Product_images[0].image}
                      src={image}
                      alt="product"
                      className={`object-contain w-full h-full ${indexImage === index && `border-[4px] p-[1px] border-red-500`}`}
                    />
                  </div>
                ))}
              </div>

              {showLeftArrow && (
                <div
                  className="absolute top-[50%] bg-blue-100 translate-y-[-50%] text-[20px] cursor-pointer left-0"
                  onClick={(e) => handleArrowClick(e, "left")}
                >
                  <LeftOutlined className="flex items-center py-3" />
                </div>
              )}
              {showRightArrow && (
                <div
                  className="absolute top-[50%] bg-blue-100 translate-y-[-50%] text-[20px] cursor-pointer right-[0]"
                  onClick={(e) => handleArrowClick(e, "right")}
                >
                  <RightOutlined className="flex items-center py-3" />
                </div>
              )}
              {/* </div> */}
            </div>
          </div>
        </section>

        <section className="px-8 py-5 w-[60%]">
          <p className="text-[30px]">{product && product.product_name}</p>
          {numOfReview && (
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 pr-5">
                <p className="text-red-150 underline text-[17px]">
                  {parseFloat(numOfReview)}
                </p>
                <div className="flex items-center">
                  <Rate
                    disabled
                    defaultValue={parseFloat(numOfReview)}
                    allowHalf
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 px-5 border-l-[1px] border-slate-400">
                <span className="text-[17px] underline">{reviews?.length}</span>
                <p className="text-slate-500 text-[16px]">Ratings</p>
              </div>
              <div className="flex items-center space-x-2 px-5  border-l-[1px] border-slate-400">
                <span className="text-[17px] underline">{sold}</span>
                <p className="text-slate-500 text-[16px]">Sold</p>
              </div>
            </div>
          )}
          <div className="mt-5">
            <p className="text-4xl text-red-500 font-bold">
              {price ? formatCurrency(price) : rangePrice}
            </p>
          </div>
          <div className="flex flex-col mt-10">
            {variations?.map((variation, index1) => (
              <section className="flex mb-5" key={index1}>
                <p className="text-xl mt-3 flex-shrink-0 text-slate-400 w-[150px]">
                  {variation.variation_name}
                </p>
                <div className="flex items-center basis-[515px] flex-wrap max-h-[220px]">
                  {variation.options?.map((option, index2) => (
                    <button
                      className={`inline-flex items-center justify-center box-border px-6 border-[1px] 
                      border-slate-300 rounded-md min-w-[100px] min-h-[35px] mt-3 mr-3  ${
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
                    </button>
                  ))}
                </div>
              </section>
            ))}

            <div className="flex items-center mt-8">
              <p className="text-xl text-slate-400 font-medium w-[150px]">
                Quantity
              </p>

              <div className="flex">
                <button
                  disabled={inputQuantity === 1}
                  onClick={decrement}
                  className="border-[1px] px-3 py-2 font-medium border-slate-300"
                >
                  -
                </button>
                <input
                  type="text"
                  className="w-[70px] px-4 py-2 border-[1px] text-center border-slate-300"
                  onChange={handleChangeQuantity}
                  value={inputQuantity}
                />
                <button
                  onClick={increment}
                  className="border-[1px] px-3 py-2 border-slate-300"
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
            </div>
          </div>

          <div className="mt-16 flex flex-col space-y-5">
            {errMessage && <p className="text-red-150">{errMessage}</p>}
            <div className="flex items-center space-x-5">
              {contextHolder}
              <button
                className="flex items-center px-2 py-1 space-x-2 min-w-[140px] min-h-[40px] bg-blue-400 rounded hover:bg-blue-500"
                onClick={handleAddToCart}
              >
                <i className="flex items-center">
                  <ShoppingCartOutlined style={{ fontSize: 20 }} />
                </i>
                <span className="text-[15px] text-black">Add to cart</span>
              </button>
              <button
                className="min-w-[140px] px-2 py-1 min-h-[40px] bg-red-400 rounded"
                onClick={handleBuyNow}
              >
                <span className="text-white">Buy now</span>
              </button>
            </div>
          </div>
        </section>
      </section>

      <section className="bg-white mt-5 min-h-[200px] px-3 py-2">
        <p className="text-xl">Description</p>
        <p className="text-[16px]">{product && product.description}</p>
      </section>
      <InfoStore product={product} reviews={reviews} />

      <section className="bg-white mt-5 px-2 py-1">
        <div className="px-2 py-1">
          <p className="text-2xl">Product Ratings</p>
        </div>
        {reviews?.length === 0 && (
          <p className="text-gray-500 text-2xl">
            There are currently no reviews
          </p>
        )}
        <div className="">
          {reviews &&
            reviews.map((review) => (
              <Comment
                key={review.id}
                className="bg-transparent"
                author={<p>{review.User.username}</p>}
                avatar={
                  <Avatar
                    src={
                      review.User.avatar ||
                      "https://cdn.pixabay.com/photo/2017/05/16/19/43/bicycle-2318682_640.jpg"
                    }
                    alt="Han Solo"
                  />
                }
                datetime={new Date(review.review_date).toLocaleString()}
                content={
                  <>
                    <Title level={5}>{review.review_title}</Title>
                    <p>{review.review_content}</p>
                    <Rate
                      disabled
                      defaultValue={review.rating}
                      // allowHalf
                      className="pr-5 size"
                    />
                  </>
                }
              />
            ))}
        </div>
      </section>

      {/* {isModalOpen ? (
  
          <Modal
            title="Add your review"
            visible={isModalOpen}
            // onOk={handleSubmit}
            onCancel={handleCancel}
            bodyStyle={{ textAlign: "center" }}
            cancelButtonProps={{ type: "default" }}
            footer={[
              <Button key="back" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>,
              <Button
                key="submit"
                type="primary"
                onClick={handleSubmit}
                disabled={reviewTitle === '' || comment === '' || rating === null}
              >
                Save
              </Button>
            ]}
          >
            <Rate
              style={{ fontSize: "2rem" }}
              value={rating}
              onChange={handleRatingChange}
            />
            <Input
              placeholder="Review title"
              value={reviewTitle}
              onChange={(e) => setReviewTitle(e.target.value)}
            />
            <TextArea
              showCount
              maxLength={100}
              style={{ height: 120, resize: "none" }}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Leave your comment"
            />
            
          </Modal>
  
  
        ) : (
            ''
          )} */}
    </Layout>
  );
}
