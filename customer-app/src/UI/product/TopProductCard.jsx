import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import ProductCardNew from "../elements/ProductCard";
import { NavLink } from "react-router-dom";



const TopProductCard = ({products}) => {
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
  return (
    <section className="relative overflow-hidden block touch-pan-y h-full">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex overflow-x-scroll p-0 m-0 snap-x duration-300 "
        id="product-container"
      >
        {products?.map((product, index) => (
          <NavLink to={`/product_detail?productId=${product.id}`} key={product.id}>
            <div className="min-w-[288px] w-[1/6] touch-pan-y overflow-x-hidden">
              <ProductCardNew product={product} />
            </div>
          </NavLink>
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
  );
};

export default TopProductCard;
