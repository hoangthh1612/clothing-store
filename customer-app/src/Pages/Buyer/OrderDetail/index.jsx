import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import {
  DeleteOutlined,
  EditOutlined,
  FileSearchOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Table,
  Button,
  Row,
  Col,
  Typography,
  Layout,
  Image,
  Descriptions,
  Popconfirm,
} from "antd";
import orderAPI from "api/order";
import axios from "../../../api/axios";
import ProductDetailModal from "./newComponent/product_detail";
import LocalActivityOutlinedIcon from '@mui/icons-material/LocalActivityOutlined';
import ShowFormReview from "./newComponent/showFormReivew";


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

const OrderDetail = () => {
  const [isDetail, setIsDetail] = useState(false);
  const [infoProduct, setInfoProduct] = useState(null);
  const [keyDetail, setKeyDetail] = useState(0);
  const [products, setProducts] = useState(null);
  const [values, setValues] = useState(null);
  const navigate = useNavigate();

  // const getProductsOfStore = async () => {
  //     const res = await axios.get("/product/getProductByStore");
  //     setProducts(res.data);
  //   };

  const handleDetailProduct = (e, record) => {
    e.preventDefault();
    setKeyDetail(record.id);
    console.log(record.id);
    // for(const item of orderDetails.product_detail) {
    //   if(item.id === record.id) {
    //     setInfoProduct(item);
    //   }
    // }

    setInfoProduct(orderDetails.product_detail);

    setIsDetail(true);
  };
  /////////////////////////////////////

  const [order, setOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState();
  const [searchParams] = useSearchParams();
  const [isCanceled, setIsCanceled] = useState(false);
  const [isModalReview, setIsModalReview] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const getOrderByOrderSn = async (order_sn) => {
    try {
      const res = await axios.get(`order/getOrderByOrderSn/${order_sn}`);
      setOrder(res.data);
      const order_details = res.data.Order_details?.map((item) => {
        let subTotal = item.product_detail.price * item.quantity;
        return {
          ...item,
          key: item.id,
          sub_total: subTotal,
        };
      });
      setOrderDetails(order_details);
      setTotalPrice(res.data.order.total_price);
      // res.data.order.total_price
    } catch (error) {
      console.log(error);
    }
  };

  const formatCurrency = (amount) => {
    const options = {
      style: "currency",
      currency: "VND",
    };

    return amount.toLocaleString("vi-VN", options).replace("₫", "đ");
  };
 
  useEffect(() => {
    let order_sn = searchParams.get("id");
    //let order_sn = 9;
    // console.log(order_sn);
    getOrderByOrderSn(order_sn);
  }, [isCanceled]);

  useEffect(() => {
    if (order) {
      if (order.order_status === "PENDING") {
        setIsCanceled(true);
      }
    }
  }, [order]);
  // console.log(order);
  if (!order) {
    return <div>Loading...</div>;
  }

  // console.log("day la order detail can quna tam", orderDetails);
  const handleCancelOrder = async (e) => {
    e.preventDefault();
    let order_sn = searchParams.get("id");
    let action = "cancel";
    try {
      const res = axios.put(
        `/order/updateOrderStatus?orderSn=${order_sn}&action=${action}`
      );
      setIsCanceled(false);

      setTimeout(() => {
        navigate("/orders");
      }, 100);
    } catch (error) {
      console.log(error);
    }
  };
  const { Title, Text } = Typography;
  const handleReviewProduct = (e, record) => {
    e.preventDefault();
    setIsModalReview(true);
    setValues(record)
    
  }
  return (
    <Layout style={{ padding: "24px 50px" }}>
      {/* <Title level={3} className="text-center">ORDER DETAIL: {order.order_sn}</Title>
            <Row>
                <Col span="8">
                    <Title level={4}>RECEIVER</Title>
                    <p><span style={{ fontWeight: 'bold' }}>Receiver: </span> {order.User.fullname}</p>
                    <p><span style={{ fontWeight: 'bold' }}>Shipping address:</span> {order.shipping_address}</p>
                    <p><span style={{ fontWeight: 'bold' }}>Email: </span> {order.User.email}</p>
                    <p><span style={{ fontWeight: 'bold' }}>Phone number:</span> {order.User.phone_number}</p>
                </Col>

                <Col span="8">
                    <Title level={4}>PAYMENTS</Title>
                    <p><span style={{ fontWeight: 'bold' }}>Order Date:</span> {new Date(order.order_date).toLocaleString()}</p>
                    <p><span style={{ fontWeight: 'bold' }}>Order Status:</span> {order.order_status}</p>
                    <p><span style={{ fontWeight: 'bold' }}>Total Amount:</span> {order.total_price.toLocaleString("vi-VN", { style: "currency", currency: "VND", })}</p>
                    <p><span style={{ fontWeight: 'bold' }}>Payment method:</span> {order.payment_method}</p>
                </Col>

            </Row> */}

      <ProductDetailModal
        isDetail={isDetail}
        infoProduct={infoProduct}
        keyDetail={keyDetail}
        setIsDetail={setIsDetail}
        orderDetails={orderDetails}
        order={order}
        totalPrice = {totalPrice}
      />

      {/* {
                isCanceled && (
                    <div className='flex my-5'>
                        <p className='mr-3 font-bold text-xl'>Cancel this order ?</p>
                        <button onClick={handleCancelOrder} className='px-4 py-1 bg-red-400 border-[1px] rounded-lg'>Cancel</button>
                    </div>
                )
            } */}
      <Table
        columns={[
          {
            title: "Product image",
            dataIndex: "product_detail",
            key: "image",
            render: (product_detail) => (
              <Image
                src={
                  product_detail?.image !== "undefined"
                    ? product_detail?.image
                    : product_detail?.Product.image
                }
                alt="xxx"
                width={80}
                height={80}
              />
            ),
          },
          {
            title: "Product name",
            dataIndex: "product_detail",
            key: "product_name",
            render: (product_detail) => product_detail.Product.product_name,
          },
          {
            title: "Variation",
            dataIndex: "product_detail",
            key: "product_variant",
            render: (Product_variant) => {
              const name = getVariation(Product_variant.skus_variation_options);
              return name || "Not variation";
            },
          },
          {
            title: "Quantity",
            dataIndex: "quantity",
            render: (quantity) => quantity,
          },

          {
            title: "Price",
            dataIndex: "product_detail",
            render: (Product_variant) => formatCurrency(Product_variant.price),
          },
          {
            title: "Subtotal",
            dataIndex: "sub_total",
            render: (value) => formatCurrency(totalPrice),
          },
          {
            // key: "8",
            title: "Actions",
            render: (record) => {
              return (
                <div className="flex space-x-2 items-center">
                  <button onClick={(e) => handleReviewProduct(e, record)}>
                    <LocalActivityOutlinedIcon
                      color="warning"
                      fontSize="small"
                    />
                  </button>
                  <FileSearchOutlined
                    onClick={(e) => handleDetailProduct(e, record)}
                    className={`text-blue-500`}
                  />

                  {isCanceled && (
                    <Popconfirm
                      title="Cancel order?"
                      description="Are you sure, you want to cancel this order?"
                      okType="danger"
                      onConfirm={(e) => {
                        handleCancelOrder(e);
                      }}
                    >
                      <DeleteOutlined
                        style={{ color: "red", marginLeft: "10px" }}
                        // onClick={(e) => {
                        // //   onDeleteProduct(e, record);
                        //     if(isCanceled){
                        //         handleCancelOrder(e);
                        //     }
                        // }}
                      />
                    </Popconfirm>
                  )}
                </div>
              );
            },
          },
        ]}
        dataSource={orderDetails}
      />
      <ShowFormReview
        isModalReview={isModalReview}
        setIsModalReview={setIsModalReview}
        values={values}
        setValues={setValues}
      />
      <div>
        <Button
          onClick={() => {
            // Redirect to order history page
            window.location.href = "/orders";
          }}
        >
          Back
        </Button>
      </div>
    </Layout>
  );
};

export default OrderDetail;
