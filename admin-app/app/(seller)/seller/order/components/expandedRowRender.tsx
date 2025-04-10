import axios from "@/api/axios";
import { Image, Table } from "antd";
import { useEffect, useState } from "react";

type PropsType = {
  record: any;
};

const getVariation = (skus: any) => {
  let result = "";
  for (const item of skus) {
    let str = `${item.variation_options.variation_name}: ${item.variation_options.type_value}`;
    if (result !== "") {
      result = result + ", " + str;
      break;
    }
    result += str;
    //result[`${item.variation_options.variation_name}`] = item.variation_options.type_value
  }
  return result;
};
const formatCurrency = (amount: number) => {
  const options = {
    style: "currency",
    currency: "VND",
  };

  return amount.toLocaleString("vi-VN", options).replace("₫", "đ");
};
const ExpandedRowRender = ({ record }: PropsType) => {
  const [isLoadingTable, setIsLoadingTable] = useState(true);
  const [order, setOrder] = useState<any>(null);
  const [orderDetails, setOrderDetails] = useState<any>();
  console.log(record);
  const getOrderByOrderSn = async (order_sn: string) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const res = await axios.get(`order/getOrderByOrderSn/${order_sn}`);
      setIsLoadingTable(false);
      setOrder(res.data);
      const order_details = res.data.Order_details?.map((item: any) => {
        let subTotal = item.product_detail.price * item.quantity;
        return {
          ...item,
          key: item.id,
          sub_total: subTotal,
        };
      });
      setOrderDetails(order_details);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrderByOrderSn(record.order_sn);
  }, [record]);

  return (
    <div className="pl-12">
      <p className="text-[16px]">{`Shipping address:`}</p>
      <p className="text-[16px]">{`Voucher:`}</p>
      {orderDetails && (
        <Table
          columns={[
            {
              title: "Image",
              dataIndex: "product_detail",
              key: "image",
              align: "center",
              width: 110,
              render: (values) => (
                
                  <Image
                    src={values.image || values.Product.image}
                    alt="xxx"
                    width={100}
                    height={50}
                    className="object-cover"
                  />
                
              ),
            },
            {
              title: "Product name",
              dataIndex: "product_detail",
              key: "product_name",
              align: "center",
              width: 250,
              render: (product_detail) => (
                <p className="font-bold text-[15px] text-center max-w-[full]">
                  {product_detail.Product.product_name}
                </p>
              ),
            },
            {
              title: "Variation",
              dataIndex: "product_detail",
              key: "product_variant",
              align: "center",
              render: (Product_variant) => {
                const name = getVariation(
                  Product_variant.skus_variation_options
                );
                return (
                  <p className="font-bold text-slate-600">
                    {name || "Not variation"}
                  </p>
                );
              },
            },
            {
              title: "Quantity",
              dataIndex: "quantity",
              align: "center",
              render: (quantity) => (<p className="text-center">{quantity}</p>),
            },

            {
              title: "Price",
              dataIndex: "product_detail",
              align: "center",
              render: (Product_variant) =>
                (<p className="text-center">{formatCurrency(Product_variant.price)}</p>)
            },
            {
              title: "Subtotal",
              dataIndex: "sub_total",
              align: "center",
              render: (value) => (<p className="text-center">{formatCurrency(value)}</p>)
            },
          ]}
          
          dataSource={orderDetails}
          loading={isLoadingTable}
          pagination={false}
        />
      )}
    </div>
  );
};
export default ExpandedRowRender;
