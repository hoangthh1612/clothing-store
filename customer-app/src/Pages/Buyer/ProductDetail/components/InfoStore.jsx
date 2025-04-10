import { useEffect, useRef, useState } from "react";
import axios from "../../../../api/axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ProductCardNew from "../../../../UI/elements/ProductCard";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const InfoStore = ({ product, reviews }) => {
  const navigate = useNavigate();
  const [shopName, setShopName] = useState();
  const [avatar, setAvatar] = useState();
  const [numsOfProduct, setNumOfProduct] = useState();
  const [numsOfFollower, setNumsOfFollower] = useState();
  const [productReviews, setProductReviews] = useState();
  const [topProducts, setTopProducts] = useState([]);

  const [scrollPosition, setScrollPosition] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const containerRef = useRef(null);

  const handleScroll = () => {
    const container = containerRef.current;
    if (container) {
      setScrollPosition(container.scrollLeft);
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    }
  };

  const handleArrowClick = (e, direction) => {
    e.preventDefault();
    const container = document.getElementById("product-container");
    const scrollAmount = 150; // Điều chỉnh giá trị scroll

    if (direction === "left") {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }

    setScrollPosition(container.scrollLeft);
    setShowLeftArrow(container.scrollLeft > 0);
    setShowRightArrow(
      container.scrollLeft < container.scrollWidth - container.clientWidth
    );
  };

  useEffect(() => {
    product && setShopName(product.Store.shop_name);
    product && setAvatar(product.Store.avatar);
  }, [product]);

  const getFollow = async (storeId) => {
    try {
      const res = await axios.get(`/follow/getFollowsByStoreId/${storeId}`);
      setNumsOfFollower(res.data.length);
    } catch (error) {
      console.log(error);
    }
  };
  const getTopProductsOfStore = async (storeId) => {
    try {
      const res = await axios.get(
        `/product/getProductBestSellerOfStore/${storeId}`
      );
      setTopProducts(res.data);
    } catch (error) {}
  };
  useEffect(() => {
    const getProductsByStoreId = async (storeId) => {
      const res = await axios.get(`/product/getProductByStoreId/${storeId}`);
      setNumOfProduct(res.data.length);
    };
    // const getProductReviewByProductId = async (productId) => {
    //    const res = await axios.get(`/product-review/getProductReviewByProductId/${productId}`);
    //   setProductReviews(res.data);
    // }
    if (product) {
      getProductsByStoreId(product.storeId);
      getFollow(product.storeId);
      getTopProductsOfStore(product.storeId);
      //getProductReviewByProductId(product.id);
    }
  }, [product]);
  const handleViewShop = (e) => {
    e.preventDefault();
    let storeId = product.storeId;
    navigate(`/store?storeId=${storeId}`);
  };
  console.log(topProducts);
  // console.log(productReviews);

  return (
    <>
      <section className="h-[80px] w-full bg-white mt-5 px-5">
        <div className="h-full flex items-center space-x-10">
          <div className="flex items-center">
            <div className="mr-3">
              {
                <img
                  className="w-[60px] h-[60px] rounded-[50%] object-cover border-[1px]"
                  src={avatar && avatar}
                  alt="Logo shop"
                />
              }
            </div>
            <div className="flex flex-col">
              <p className="font-bold text-xl">{shopName}</p>
              <button
                onClick={handleViewShop}
                className="px-4 py-1 border-[1px] border-black"
              >
                View Shop
              </button>
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            <p className="text-[18px] text-slate-600">
              Products: <span className="text-blue-400">{numsOfProduct}</span>
            </p>

            <p className="text-[18px] text-slate-600">
              Followers: <span className="text-blue-400">{numsOfFollower}</span>
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white mt-5 px-5">
        <p className="text-2xl h-[60px] flex items-center px-2 text-red-150">
          Top picks from shop
        </p>
        <section className="relative overflow-hidden block touch-pan-y h-full">
          <div
            ref={containerRef}
            onScroll={handleScroll}
            className="flex overflow-x-scroll p-0 m-0 snap-x duration-300 "
            id="product-container"
          >
            {topProducts?.map((product, index) => (
              <Link
                to={`/product_detail?productId=${product.id}`}
                key={product.id}
              >
                <div className="min-w-[220px] w-[1/6] touch-pan-y overflow-x-hidden">
                  <ProductCardNew product={product} />
                </div>
              </Link>
            ))}
            {showLeftArrow && (
              <div
                className="absolute top-[50%] bg-blue-100 translate-y-[-50px] text-[30px] cursor-pointer left-0"
                onClick={(e) => handleArrowClick(e, "left")}
              >
                <LeftOutlined className="flex items-center py-3" />
              </div>
            )}
            {showRightArrow && (
              <div
                className="absolute top-[50%] bg-blue-100 translate-y-[-50px] text-[30px] cursor-pointer right-[0]"
                onClick={(e) => handleArrowClick(e, "right")}
              >
                <RightOutlined className="flex items-center py-3" />
              </div>
            )}
          </div>
        </section>
      </section>
    </>
  );
};

export default InfoStore;
