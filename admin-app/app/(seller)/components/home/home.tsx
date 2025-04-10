"use client";

import { getProductByStore } from "@/api/product/getProductStore";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import {
  SettingOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  SoundOutlined,
  ShoppingFilled
} from "@ant-design/icons";

import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import { Table, Tag, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
//import axios from "axios";
import { useEffect, useState } from "react";
import { ExpandLessOutlined, ExpandMoreOutlined } from "@mui/icons-material";
import ExpandedRowRender from "../../seller/order/components/expandedRowRender";
type DataType = {
  key: string;
  id: string;
  order_sn: string;
  total_price: number;
  shipping_address: string;
  order_status: string;
  createdAt: string;
  updatedAt: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Order_sn",
    dataIndex: "order_sn",
    key: "id",
    defaultSortOrder: "ascend",
    sorter: (a: any, b: any) => a.order_sn.localeCompare(b.order_code),
    render: (text: string) => <p className="font-bold">{text}</p>,
  },

  {
    title: "Total price",
    dataIndex: "total_price",
    key: "total",
    defaultSortOrder: "ascend",
    sorter: (a: any, b: any) => a.total_price - b.total_price,
    render: (text: any) => {
      const newText = text.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
      return newText;
    },
  },
  // {
  //   title: 'Shipping address',
  //   dataIndex: 'shipping_address',
  //   key: 'address',
  // },
  {
    title: "Payment method",
    dataIndex: "payment_method",
    key: "payment",
    render: (payment) => {
      return (
        // <Tag color="blue">{payment}</Tag>
        <p className="text-[16px] text-slate-600">{payment}</p>
      );
    },
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "order_status",
    render: (status: any, { id }: { id: string }, index: number) => {
      let color = null;
      switch (status) {
        case "COMPLETED":
          color = "green";
          break;
        case "PENDING":
          color = "geekblue";
          break;
        case "WAITING_DELIVERY":
          color = "orange";
          break;
        default:
          //Canceled
          color = "red";
          break;
      }
      return (
        <Tag color={color} key={index}>
          {status.toUpperCase()}
        </Tag>
      );
    },
  },

  {
    title: "Created date",
    key: "order_date",
    dataIndex: "createdAt",
    sorter: (a: any, b: any) => {
      const dateA = Date.parse(a.createdAt);
      const dateB = Date.parse(b.createdAt);
      return dateA - dateB;
    },
    render: (text: string) => {
      const date = new Date(text).toLocaleString();
      return date;
    },
  },
  {
    title: "Updated date",
    key: "update_date",
    dataIndex: "updatedAt",
    sorter: (a: any, b: any) => {
      const dateA = Date.parse(a.updatedAt);
      const dateB = Date.parse(b.updatedAt);
      return dateA - dateB;
    },
    render: (text: string) => {
      const date = new Date(text).toLocaleString();

      return date;
    },
  },
  {
    title: "",
    render: (row: any) => {
      return (
        // <Link href={`./order/order_detail?id=${row.order_sn}`}>View detail</Link>
        <button className="bg-red-400 hover:bg-red-500 px-3 py-[2px] rounded-md text-white">
          Cancel
        </button>
      );
    },
  },
];


const HomePageSeller = () => {

  const [numsOfProduct, setNumsOfProduct] = useState();
  const axiosPrivate = useAxiosPrivate();
  const [totalPrice, setTotalPrice] = useState<any>();
  const [orders, setOrders] = useState<any>(); 
  const [numsFollow, setNumsFollow] = useState(0);
  const [numsOrder, setNumsOrder] = useState(0);
  const [recentOrders, setRecentOrders] = useState<any>([]);
  const getProductOfStore = async () => {
    const res = await getProductByStore(axiosPrivate);
    setNumsOfProduct(res.data?.length);
  }
  const getOrderOfStore = async (type: string | null) => {
    //const res = await axios.get(`/order/getOrderByUserId?type=${type}`);
    const res = await axiosPrivate.get(`/order/getOrderByStoreId?type=${type}`);    
    setOrders(res.data);
    setNumsOrder(res.data.length);
  }
  const getFollowOfStore = async () => {
    const res = await axiosPrivate.get("/follow/getFollowsOfStore");
    setNumsFollow(res.data.length);

  }
  useEffect(() => {
    getProductOfStore();
    getOrderOfStore(null);
    getFollowOfStore();
  }, [])
  
  const expandedRowRender = (record: any) => {
    return <ExpandedRowRender record={record} />;
   
  };
  useEffect(() => {
    if(orders) {
      console.log(orders);
      
      const sortOrders = orders.sort((a: any, b: any) => {
        const dateA = Date.parse(a.updatedAt);
        const dateB = Date.parse(b.updatedAt);
        return dateB - dateA;
      });
      if(orders.length > 5) {
        setRecentOrders(sortOrders.slice(0, 5));
        return;
      }
      setRecentOrders(sortOrders);
    }
  }, [orders])
  const data = orders?.map((item: any) => {
    return {
      key: item.id,
      id: item.id,
      order_sn: item.order_sn,
      total_price: item.total_price,
      shipping_address: item.shipping_address,
      payment_method: item.payment_method,
      order_status: item.order_status,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      // createdAt: getTime(item.createdAt),
      // updatedAt: getTime(item.updatedAt)
    };
  });

  useEffect(() => {
    if(orders) {
      let result = 0;
      for(const item of orders) {
        result += item.total_price;
      }
      setTotalPrice(result);
    }
  }, [orders])
  const formatCurrency = (amount: number) => {
    const options = {
      style: "currency",
      currency: "VND"
    };

    return amount.toLocaleString("vi-VN", options).replace("₫", "đ");
  }
  const { Text, Title, Paragraph } = Typography;
  return (
    <div className="flex flex-col homepage-seller">
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white flex flex-col items-start justify-around pl-2 pt-2 pr-10 pb-5 h-[150px] border-2 border-collapse rounded-[10px]">
          <MonetizationOnOutlinedIcon />
          <p className="text-[20px]">Total Sales</p>
          <span className="text-blue-400 text-xl">{totalPrice && formatCurrency(totalPrice)}</span>
        </div>
        <div className="bg-white flex flex-col items-start justify-around pl-2 pt-2 pr-10 pb-5 h-[150px] border-2 border-collapse rounded-[10px]">
          <ShoppingOutlined style={{fontSize: 20}} />
          <p className="text-[20px]">Total Products</p>
          <span className="text-blue-400 text-xl">{numsOfProduct && numsOfProduct}</span>
        </div>
        <div className="bg-white flex flex-col items-start justify-around pl-2 pt-2 pr-10 pb-5 h-[150px] border-2 border-collapse rounded-[10px]">
          <PersonAddAltOutlinedIcon />
          <p className="text-[20px]">Followers</p>
          <span className="text-blue-400 text-xl">{numsFollow}</span>
        </div>
        <div className="bg-white flex flex-col items-start justify-around pl-2 pt-2 pr-10 pb-5 h-[150px] border-2 border-collapse rounded-[10px]">
          <ShoppingCartOutlined style={{fontSize: 20}} />
          <p className="text-[20px]">Total Orders</p>
          <span className="text-blue-400 text-xl">{numsOrder}</span>
        </div>
      </div>
      <div className="bg-white mt-5 p-5 recent-order">
        <div className="head-text">
          <p className="text-[22px] text-blue-400 mb-5">Recent order</p>
        </div>
        <div>
          <Table
            columns={columns}
            dataSource={data}
            bordered
            expandable={{
              expandedRowRender,
              defaultExpandedRowKeys: ["0"],
              expandIcon: ({ expanded, onExpand, record }) =>
                expanded ? (
                  <button onClick={(e) => onExpand(record, e)}>
                    {<ExpandLessOutlined />}
                  </button>
                ) : (
                  <button onClick={(e) => onExpand(record, e)}>
                    {<ExpandMoreOutlined />}
                  </button>
                ),
            }}
          ></Table>
        </div>
      </div>
    </div>
  );
};

export default HomePageSeller;
