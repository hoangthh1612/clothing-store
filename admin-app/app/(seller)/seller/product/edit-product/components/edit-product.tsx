'use client'

import axios from "@/api/axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { Add, DeleteOutline } from "@mui/icons-material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FormBasic from "./form-basic";
import EditSaleInfo from "./edit-sale-info";
import ProductVariation from "./product-variation";
const EditProduct = () => {
    const [product, setProduct] = useState<any>(null);
    const [productVariants, setProductVariants] = useState<any>(null);
    const [isEditBasicInfoProduct, setIsEditBasicInfoProduct] = useState(false);
    const [isEditTableVariation, setIsEditTableVariation] = useState(false);
    const [isEditVariation, setIsEditVariation] = useState(false);
    const searchParams = useSearchParams();

    const getProduct = async (productId: string) => {
        try {
            const res = await axios.get(`/product/getProductById/${productId}`);           
            setProduct(res.data);
        } catch (error) {
            console.log(error);
            
        }
    }
    useEffect(() => {
        let productId = searchParams.get("productId") as string;
        getProduct(productId);
    }, [])
    useEffect(() => {
        if (product) {
        //   setBasicInfo({
        //     product_name: product.product_name,
        //     description: product.description,
        //   });
          const list = product?.product_details?.map((item: any) => {
            let value = item.skus_variation_options?.map((i: any) => {
              return {
                variation_name: i.variation_options.variation_name,
                option: i.variation_options.type_value,
                [i.variation_options.variation_name]:
                  i.variation_options.type_value,
              };
            });
    
            return {
              id: item.id,
              image: item.image,
              quantity: item.quantity,
              price: item.price,
              variation_options: value,
            };
          });
          setProductVariants(list);
        }
      }, [product]);
  
    return (
      <div className="bg-white px-7 mx-36 py-10">
        <div className="mb-10 flex items-center space-x-3">
          <p className="text-slate-600 font-bold text-2xl">Basic infomation</p>
          {!isEditBasicInfoProduct && (
            <EditOutlined
              onClick={() => {
                setIsEditBasicInfoProduct(true);
              }}
              className="text-[#FF7008]"
            />
          )}
        </div>
        <div className="pl-10">
          <FormBasic
            product={product}
            setProduct={setProduct}
            setIsEditBasicInfoProduct={setIsEditBasicInfoProduct}
            isEditBasicInfoProduct={isEditBasicInfoProduct}
          />
        </div>

        <div className="mt-20 mb-10">
          <p className="text-slate-600 font-bold text-2xl">Sales information</p>
        </div>
        <div className="ml-10">
          <div className="flex items-center space-x-3 mb-5">
            <p className="font-bold">isVariation: </p>
            <span className="text-xl font-medium text-[#ADD8E6]">
              {product?.variations?.length === 0 ? "No" : "Yes"}
            </span>
          </div>
          {product?.variations.length === 0 && (
            <>
              <div className="md:flex md:items-center mb-5">
                <div className="md:w-1/5">
                  <label className="font-bold" htmlFor={`sales_info.price`}>
                    Price
                  </label>
                </div>
                <div className="md:w-1/4">
                  <input
                    className={`w-full px-2 py-1 bg-transparent appearance-none border-2 rounded-[6px] focus:outline-none focus:bg-white focus:border-blue-400 border-gray-500`}
                    type="number"
                    id={`sales_info.price`}
                  />

                  {/* {errors.sales_info?.price && (
                  <p className="text-red-400">
                    {errors.sales_info?.price.message}
                  </p>
                )} */}
                </div>
              </div>
              <div className="md:flex md:items-center mb-5">
                <div className="md:w-1/5">
                  <label className="font-bold" htmlFor={`sales_info.quantity`}>
                    Quantity
                  </label>
                </div>
                <div className="md:w-1/4">
                  <input
                    // name={`sales_info.quantity`}
                    className={
                      `w-full px-2 py-1 bg-transparent appearance-none border-2 rounded-[6px] focus:outline-none focus:bg-white focus:border-blue-400` +
                      " border-gray-500"
                    }
                    type="number"
                    id={`sales_info.quantity`}
                  />
                  {/* {errors.sales_info?.quantity?.message && (
                  <p className="text-red-400">
                    {errors.sales_info?.quantity.message}
                  </p>
                )} */}
                </div>
              </div>
            </>
          )}
          {product?.variations?.length !== 0 && (
            <>
              <div className="md:flex mb-5">
                <div className="md:w-1/5 flex items-start space-x-2">
                  <p className="font-bold flex items-center">Product Variation</p>
                  {!isEditVariation && (
                    <div className="">
                      <EditOutlined
                      onClick={() => {
                        setIsEditVariation(true);
                      }}
                      className="text-[#FF7008]"
                    />
                    </div>
                  )}
                </div>
                <div className="w-4/5">
                  <ProductVariation
                    product={product}
                    isEditVariation={isEditVariation}
                    setIsEditVariation={setIsEditVariation}
                    productVariants={productVariants}
                    setProduct={setProduct}
                  />
                </div>
              </div>

              <div className="flex">
                <div className="flex items-start space-x-2 w-1/5">
                  <p className="flex items-center font-bold">Variation list</p>
                  {!isEditTableVariation && (
                    <div>
                      <EditOutlined
                      onClick={() => {
                        setIsEditTableVariation(true);
                      }}
                      className="text-[#FF7008]"
                    />
                    </div>
                  )}
                </div>
                <div className="w-4/5">
                <EditSaleInfo
                  productVariants={productVariants}
                  isEditTableVariation={isEditTableVariation}
                  setIsEditTableVariation={setIsEditTableVariation}
                  setProductVariants={setProductVariants}
                />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );

}

export default EditProduct;