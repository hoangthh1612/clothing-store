import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "../../../api/axios";
import { ProductList } from "../../../Components";
import { Pagination } from "antd";
import {FileSearchOutlined} from "@ant-design/icons"

const SearchPage = () => {
  const [products, setProducts] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [searchParams] = useSearchParams();
  let keyword = searchParams.get("keyword");
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get("/product");
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, []);

  const filteredProducts = products?.filter((item) => {
    if (
      item.product_name
        .toLowerCase()
        .includes(searchParams.get("keyword").toLowerCase())
    ) {
      return true;
    }
    return false;
  });
  const onChange = (page, pageSize) => {
    console.log(page, pageSize);
    setCurrentPage(page);
  };
  console.log(filteredProducts);
  const startIdx = (currentPage - 1) * pageSize;
  const endIdx = startIdx + pageSize;
  const currentProducts = filteredProducts?.slice(startIdx, endIdx);

  console.log(searchParams.get("keyword"));
  return (
    <>
      {filteredProducts?.length === 0 && (
        <div className="flex justify-center my-auto">
           
            <div className="flex flex-col justify-center items-center">
            <i className="text-[80px] text-gray-400">
            <FileSearchOutlined />
            </i>
            <p className="text-[18px] text-gray-400">No search found</p>
            <p className="text-[18px] text-gray-400">Try different or more general keywords</p>
            </div>
            
        </div>
      )}
      {filteredProducts?.length > 0 && (
        <div className="bg-white mx-16 mt-5 px-5 py-3">
          <div className="mb-5">
            <p className="text-[18px]">
              Search result for{" "}
              <span className="text-blue-400">{`"${keyword}"`}</span>
            </p>
          </div>

          <ProductList products={currentProducts} />

          <Pagination
            className="text-center"
            total={filteredProducts?.length}
            onChange={onChange}
            current={currentPage}
            pageSize={pageSize}
          />
        </div>
      )}
    </>
  );
};

export default SearchPage;
