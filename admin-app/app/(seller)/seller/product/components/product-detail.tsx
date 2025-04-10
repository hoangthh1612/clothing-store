import { Modal } from "antd";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
type TypeProps = {
  isDetail: any;
  setIsDetail: any;
  setKeyDetail: any;
  infoProduct: any;
  keyDetail: any;
};

const formatCurrency = (amount: number) => {
    const options = {
      style: "currency",
      currency: "VND"
    };

    return amount.toLocaleString("vi-VN", options).replace("₫", "đ");
  }
  const formatNumber = (amount: number) => {
    const options = {
      style: "currency",
      currency: "VND"
    };

    return amount.toLocaleString("vi-VN", options).replace("₫", "");
  }

const getPriceRange = (product_details: any) => {
  const listPrices = product_details?.map((item: any) => item.price);
  let max = Math.max(...listPrices);
  let min = Math.min(...listPrices);
  if (max === min) return `${formatCurrency(min)}`;
  return `${formatNumber(min)}- ${formatCurrency(max)}`;
};
function areObjectsEqual(obj1: any, obj2: any) {
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
  setKeyDetail,
  keyDetail,
  infoProduct,
}: TypeProps) => {
 
  console.log(infoProduct);
  const list = infoProduct?.product_details?.map((item: any) => {
    let value = item.skus_variation_options?.map((i: any) => {
      return {
        variation_name: i.variation_options.variation_name,
        option: i.variation_options.type_value,
        [i.variation_options.variation_name]: i.variation_options.type_value,
      };
    });

    return {
      id: item.id,
      quantity: item.quantity,
      price: item.price,
      variation_options: value,
    };
  });
  

  return (
    <Modal
      open={isDetail}
      title="Product detail"
      width="60%"
      footer={null}
      onCancel={() => {
        setKeyDetail(0);
        setIsDetail(false);
      }}
    >
      <div className="flex flex-col">
        <div className="flex h-[300px] w-full">
          <div className="flex-1">
            {infoProduct && (
              <img
                className=" h-full w-full border-[1px] rounded-md"
                src={infoProduct.image}
                alt="image-product"
                style={{
                  maxWidth: "75%",
                  maxHeight: "100%"

                }}
                
              />
            )}
          </div>
          <div className="flex-1 px-3">
            <div className="flex flex-col ml-5 space-y-5">
              <div className="flex items-center space-x-2">
                <p className="text-xl text-gray-500">Product name: </p>
                <span className="text-2xl font-bold">
                  {infoProduct && infoProduct.product_name}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <p className="text-xl text-gray-500">Brand: </p>
                <span className="text-2xl font-bold">
                  {infoProduct && infoProduct.brand}
                </span>
              </div>
            {
                infoProduct?.variations?.length !== 0 && (
                    <div className="flex items-center space-x-2">
                        <p className="text-xl text-gray-500">Price: </p>
                        <span className="text-2xl font-bold text-blue-400">
                            {infoProduct && getPriceRange(infoProduct?.product_details)}
                        </span>
                    </div>
                )
            }
              {infoProduct?.variations?.length === 0 && (
                <>
                    <div className="flex items-center space-x-2">
                        <p className="text-xl text-gray-500">Price: </p>
                        <span className="text-2xl font-bold text-blue-400">
                        {formatCurrency(infoProduct?.product_details[0].price)}
                        </span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <p className="text-xl text-gray-500">Quantity: </p>
                        <span className="text-2xl font-bold text-blue-400">
                        {infoProduct?.product_details[0].quantity}
                        </span>
                    </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="mb-3">
          <p className="text-xl text-[#3E7FFF] mb-3">Description</p>
          <p>{infoProduct && infoProduct.description}</p>
        </div>
        {infoProduct?.variations?.length !== 0 && (
          <div>
            <p className="text-xl">Product table</p>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 300 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Price</TableCell>
                    <TableCell>Quantity</TableCell>
                    {list &&
                      list[0]?.variation_options?.map(
                        (variation: any, index: number) => {
                          return (
                            <TableCell key={index}>
                              {variation.variation_name}
                            </TableCell>
                          );
                        }
                      )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {list &&
                    list?.map((row: any) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        {/* <TableCell component="th" scope="row"> */}
                        <TableCell component="th" scope="row">
                          {formatCurrency(row.price)}
                        </TableCell>
                        <TableCell>{row.quantity}</TableCell>
                        {row?.variation_options?.map(
                          (variation: any, index: number) => (
                            <TableCell key={index}>
                              {variation.option}
                            </TableCell>
                          )
                        )}
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </div>
    </Modal>
  );
};
export default ProductDetailModal;
