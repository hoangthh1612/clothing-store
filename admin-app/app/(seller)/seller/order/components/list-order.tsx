"use client";
import axios from "@/api/axios";
import {
  Badge,
  Dropdown,
  Input,
  Space,
  Table,
  TableColumnsType,
  Tag,
  DatePicker
} from "antd";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import ExpandedRowRender from "./expandedRowRender";
import { ExpandLessOutlined, ExpandMoreOutlined } from "@mui/icons-material";

const { RangePicker } = DatePicker;


type DataType = {
  key: string;
  id: string;
  order_sn: string;
  total_price: number;
  shipping_address: string;
  order_status: string;
  createdAt: string;
  updatedAt: string;
};

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

interface ExpandedDataType {
  key: React.Key;
  date: string;
  name: string;
  upgradeNum: string;
}

const ListOrder = () => {
  const options = [
    {
      value: "",
      text: "All",
    },
    {
      value: "completed",
      text: "Completed",
    },
    {
      value: "pending",
      text: "Pending",
    },
    {
      value: "waiting_delivery",
      text: "Waiting delivery",
    },
    {
      value: "cancelled",
      text: "Cancelled",
    },
    {
      value: "delivering",
      text: "Delivering",
    },
  ];

  const [selected, setSelected] = useState<any>(options[0].value);
  const [searchedText, setSearchedText] = useState("");
  const [orders, setOrders] = useState<any>(null);
  const [type, setType] = useState<any>(null);
  const [dateRange, setDateRange] = useState<any>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    // const type = searchParams.get("type");
    const getOrderOfStore = async (type: string | null) => {
      //const res = await axios.get(`/order/getOrderByUserId?type=${type}`);
      const res = await axiosPrivate.get(
        `/order/getOrderByStoreId?type=${type}`
      );
      // console.log(res.data);

      setOrders(res.data);
      setDateRange(null);

    };
    getOrderOfStore(type);
  }, [type]);
  //console.log(orders);

  const createQueryParams = useCallback(
    (name: any, value: any) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  let type_status = searchParams.get("type");

  useEffect(() => {
    //console.log(type_status);
    if (type_status) {
      setSelected(type_status);
      setType(type_status);
    } else {
      setSelected("");
      setType(null);
    }
  }, [type_status]);

  const handleQueryStatus = (e: any) => {
    // console.log(e.target.value);
    setType(e.target.value);
    setSelected(e.target.value);

    router.push(
      e.target.value === ""
        ? "/seller/order"
        : pathname + "?" + createQueryParams("type", `${e.target.value}`)
    );
  };
  const items = [
    { key: "1", label: "Action 1" },
    { key: "2", label: "Action 2" },
  ];

  const expandedRowRender = (record: any) => {
    return <ExpandedRowRender record={record} />;
   
  };
  // const getTime = (time: string) => {
  //   var dateObject = new Date(time);

  //   var year = dateObject.getFullYear();
  //   var month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0
  //   var day = dateObject.getDate().toString().padStart(2, '0');
  //   var hours = dateObject.getHours().toString().padStart(2, '0');
  //   var minutes = dateObject.getMinutes().toString().padStart(2, '0');
  //   return `${hours}:${minutes} ${day}/${month}/${year} `;
  // }
  //const [data, setData] = useState(null);
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
  
  const handleDateRangeChange = (dates: any) => {
    setDateRange(dates);
    // Thực hiện các bước lọc hoặc xử lý dữ liệu khác tại đây
  };
  
  console.log(dateRange);
  
  const handleFilterOrder = (e: any) => {
    e.preventDefault();
    const filteredOrders = orders.filter((order: any) => {
      const orderDate = new Date(order.updatedAt);
      return dateRange[0] <= orderDate && orderDate <= dateRange[1];
    });
    console.log(filteredOrders);
    setOrders(filteredOrders);
    
  }
  const disabledDate = (current: any) => {
    // Bạn có thể điều chỉnh logic ở đây theo nhu cầu cụ thể của mình
    return current && current > new Date();
  };
  return (
    <div className="px-10 pt-10 pb-5">
      <div className="flex justify-between items-center mb-5">
        <div className="md:flex space-x-3 md:items-center">
          <label className="font-bold" htmlFor="status">Status</label>
          <select
            value={selected}
            onChange={handleQueryStatus}
            className="w-full px-2 py-1 bg-transparent border-[1px] border-gray-500 rounded-[6px] focus:outline-none focus:bg-white focus:border-blue-400"
            name="status"
            id="status"
          >
            {/* <option defaultValue="all">All</option> */}
            {options.map((s, index) => (
              <option value={s.value} key={index}>
                {s.text}
              </option>
            ))}
          </select>
          {/* <Select
                className="w-28"
                defaultValue="All"
                options={(options.map(c => ({label: c, value: c})))}
            >
            </Select> */}
        </div>
        {/* <div className="ml-2">
          <Input.Search
            placeholder="Search here...."
            onSearch={(value) => {
              setSearchedText(value);
            }}
            onChange={(e) => {
              setSearchedText(e.target.value);
            }}
          />
        </div> */}
        <div className="flex items-center ml-5 space-x-4">
          <p className="font-bold">Order date</p>
          <RangePicker
             
             disabledDate={disabledDate}
             onChange={handleDateRangeChange}
              value={dateRange}
            //format="YYYY-MM-DD HH:mm:ss"
          />
          <button 
              disabled={!dateRange}
              onClick={handleFilterOrder}
              className={`px-3 py-1 rounded ${dateRange ? `bg-blue-400` : `bg-blue-200 cursor-not-allowed`}`}

            >
            Filter</button>
        </div>
        
      </div>
      <div>
      <Table
        bordered
        columns={columns}
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
        dataSource={data}
      ></Table>
      </div>
    </div>
  );
};

export default ListOrder;
