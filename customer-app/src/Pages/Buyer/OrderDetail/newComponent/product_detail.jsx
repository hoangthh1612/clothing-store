import { Modal } from "antd";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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




const ProductDetailModal = ({
  isDetail,
  setIsDetail,
//   setKeyDetail,
  keyDetail,
  infoProduct,
  orderDetails,
  order,
  totalPrice,
}) => {
 
//   const list = infoProduct?.product_details?.map((item) => {
//     let value = item.skus_variation_options?.map((i) => {
//       return {
//         variation_name: i.variation_options.variation_name,
//         option: i.variation_options.type_value,
//         [i.variation_options.variation_name]: i.variation_options.type_value,
//       };
//     });

//     return {
//       id: item.id,
//       quantity: item.quantity,
//       price: item.price,
//       variation_options: value,
//     };
//   });
const a = JSON.parse(order.shipping_address);
const b = a.detailAddress + ', ' + a.wardName + ', ' + a.districtName + ', ' + a.provinceName;
const [inputAddress, setInputAddress] = useState(b);

useEffect(()=>{
  const rs = JSON.parse(order.shipping_address)
  setInputAddress(rs.detailAddress + ', ' + rs.wardName + ', ' + rs.districtName + ', ' + rs.provinceName);
  // setAddress2(rs.name + ', '+ rs.phone + ', ' +  rs.detailAddress + ', ' + rs.wardName + ', ' + rs.districtName + ', ' + rs.provinceName);

}, [order])

  return (
    <Modal
      open={isDetail}
      // title= "product_detail"
      // onOk={() => {
      //   setIsDetail(false);
      // }}
      width="60%"
      footer={null}
      onCancel={() => {
        // setKeyDetail(0);
        setIsDetail(false);
      }}
    >
      <div className="flex flex-col">
        <div className="flex h-[300px] w-full">
          <div className="flex-1">
            {/* {infoProduct && ( */}
              <img
                className=" h-full w-full border-[1px] rounded-md"
                src={orderDetails[0]?.product_detail.Product.image}
                alt="image-product"
                style={{
                  maxHeight: 350,
                  maxWidth: 350
                }}
                
              />
            {/* )} */}
   
          </div>
          <div className="flex-1 px-3">
            <div className="flex flex-col ml-5 space-y-5">
              <div className="flex items-center space-x-2">
                <p className="text-xl text-gray-500">Product name: </p>
                <span className="text-2xl font-bold">
                {orderDetails[0]?.product_detail.Product.product_name}
                  {/* {infoProduct && infoProduct.product_name} */}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <p className="text-xl text-gray-500">Brand: </p>
                <span className="text-2xl font-bold">
                {orderDetails[0]?.product_detail.Product.brand}
                </span>
              </div>
            {
                // infoProduct?.variations?.length !== 0 && (
                    <div className="flex items-center space-x-2">
                        <p className="text-xl text-gray-500">Price: </p>
                        <span className="text-2xl font-bold text-blue-400">
                        {formatCurrency(orderDetails[0]?.product_detail.price)}
                            {/* {infoProduct && getPriceRange(infoProduct?.product_details)} */}
                        </span>
                    </div>
                // )
            }
             {/* <div className="flex items-center space-x-2"> */}
                <p className="text-xl text-gray-500">Description: </p>
                <span className="text-lg mt-[30%] mr-[30%] font-bold">
                {orderDetails[0]?.product_detail.Product.description}
                </span>
              
            </div>
          </div>
        </div>
          {/* <div className="mb-3"> */}
                <p className="text-xl text-[#3E7FFF] mb-3">Address:            
                    <span className="text-base text-gray-500"> {inputAddress}</span>
                </p>
               
                <p className="text-xl text-[#3E7FFF] mb-3">Email:
                    <span className="text-base text-gray-500"> {order.User.email} </span>
                </p>
                
                <p className="text-xl text-[#3E7FFF] mb-3">Phone number:
                    <span className="text-base text-gray-500"> {order.User.phone_number} </span>
                </p>
                
          {/* </div> */}

          {/* <div className="mb-3"> */}
              <p className="text-xl text-[#3E7FFF] mb-3">Payment method:
                  <span className="text-base text-gray-500"> {order.payment_method} </span>
              </p>
          {/* </div> */}
          
                
      </div>
    </Modal>
  );
};
export default ProductDetailModal;
