'use client'

import React, { useState, useEffect } from 'react';
import { Table, Button, Row, Col, Typography, Layout, Image, Descriptions } from 'antd';
import axios from '@/api/axios';
import { useRouter, useSearchParams } from 'next/navigation';
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


const OrderDetail = () => {
    const [order, setOrder] = useState<any>(null);
    const [orderDetails, setOrderDetails] = useState<any>();
    const searchParams = useSearchParams();
    const [isConfirm, setIsConfirm] = useState(false);
    const router = useRouter();
    const getOrderByOrderSn = async (order_sn: string) => {
        try {
            const res = await axios.get(`order/getOrderByOrderSn/${order_sn}`);
            setOrder(res.data);
            const order_details = res.data.Order_details?.map((item: any) => {
                let subTotal = item.product_detail.price*item.quantity;
                return {
                    ...item, 
                    key: item.id,
                    sub_total: subTotal
                } 
            }); 
            setOrderDetails(order_details);
            

        } catch (error) {
            console.log(error);
        }
    }

    const formatCurrency = (amount: number) => {
        const options = {
          style: "currency",
          currency: "VND"
        };
    
        return amount.toLocaleString("vi-VN", options).replace("₫", "đ");
      }

    useEffect(() => {
        let order_sn = searchParams.get("id") as string;
        //let order_sn = 9;
        // console.log(order_sn);
        getOrderByOrderSn(order_sn);
    }, [isConfirm]);

    useEffect(() => {
        if(order) {
            if(order.order_status === 'PENDING') {
                setIsConfirm(true);
            }
        }
    }, [order])
    // console.log(order);
    if (!order) {
        return <div>Loading...</div>;
    }
    const handleAcceptOrder = async (e: any) => {
        e.preventDefault();
        let order_sn = searchParams.get("id");
        let action = 'accept';
        try {
            const res = axios.put(`/order/updateOrderStatus?orderSn=${order_sn}&action=${action}`);
            setIsConfirm(false);
        } catch (error) {
            console.log(error);
        }
    }
    const { Title, Text } = Typography;

    return (
       
        <div className='mx-32 my-4 bg-white px-6 py-5'>
            <div className='mb-5'>
                <Button onClick={() => {
                    // Redirect to order history page
                    router.push('/seller/order');
                }}>
                    Back
                </Button>
            </div>
            <p className='text-xl mb-4'>{order.order_sn}</p>
            <div className='flex flex-col space-y-2'>
            <div className='flex'>
                <p className='min-w-[160px]'>Payment method:</p>
                
                <span className='font-bold'>{order.payment_method}</span>
            </div>
            <div className='flex'>
                <p className='min-w-[160px]'>Total price:</p>
                
                <span className='font-bold'>{formatCurrency(order.total_price)}</span>
            </div>
            </div>
           


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

                <Col span="8">
                    <Title level={4}>DELIVERY</Title>
                </Col>
            </Row>

            {
                isConfirm && (
                    <div className='flex my-5'>
                        <p className='mr-3 font-bold text-xl'>Are you want confirm this order ?</p>
                        <button onClick={handleAcceptOrder} className='px-4 py-1 bg-blue-400 border-[1px] rounded-lg'>Accept</button>
                    </div>
                )
            } */}
            <Table
                columns={[
                    {
                        title: 'Product image',
                        dataIndex: 'product_detail',
                        key: 'image',
                        render: (values) => {
                            console.log(values);
                            
                            return <Image src={values.image || values.Product.image} alt='xxx' width={80} height={80} />
                        },
                    },
                    {
                        title: 'Product name',
                        dataIndex: 'product_detail',
                        key: 'product_name',
                        render: product_detail => product_detail.Product.product_name,
                    },
                    {
                        title: 'Variation',
                        dataIndex: 'product_detail',
                        key: 'product_variant',
                        render: Product_variant => {
                        //   const productVariantDetails = [];
                        //   Product_variant.Variant_values.forEach(element => {
                        //     productVariantDetails.push(`${element.Option.name}: ${element.Option_value.value}`);
                        //   });
                      
                        //   return productVariantDetails.join(', ');
                            const name = getVariation(Product_variant.skus_variation_options);
                            return name || "Not variation";
                        },
                    },
                    {
                        title: 'Quantity',
                        dataIndex: 'quantity',
                        render: quantity => quantity,
                    },
                    // {
                    //     title: 'Provided by',
                    //     dataIndex: 'Product_variant',
                    //     key: 'store',
                    //     render: Product_variant => Product_variant.Store ? (
                    //         <span>{Product_variant.Store.description}</span>
                    //     ) : null,
                    // },
                    {
                        title: 'Price',
                        dataIndex: 'product_detail',
                        render: Product_variant => formatCurrency(Product_variant.price),
                    },
                    {
                        title: 'Subtotal',
                        dataIndex: 'sub_total',
                        render: value => formatCurrency(value)
                    },
                ]}
                dataSource={orderDetails}
                pagination={false}
            />
            
        </div>
    );
};

export default OrderDetail;