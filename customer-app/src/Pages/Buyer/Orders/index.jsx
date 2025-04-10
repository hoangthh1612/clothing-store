import Container from 'Components/Common/Container';
import {
  Form,
  Typography,
  Input,
  Tag,
  Table,
  Select,
  Button,
  Space,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import orderAPI from 'api/order';
import { useEffect } from 'react';
import { useState } from 'react';
import useAxiosPrivate from '../../../Hooks/useAxiosPrivate';

const { Title } = Typography;
const { Search } = Input;

const columns = [
  {
    title: 'Order ID',
    dataIndex: 'order_sn',
    key: 'id',
    defaultSortOrder: 'ascend',
    sorter: (a, b) => a.order_sn.localeCompare(b.order_code),
    render: (text) => <p className="font-bold">{text}</p>,
  },
  {
    // title: 'Products',
    // dataIndex: 'products',
    // key: 'products',
    // render: (product) => (
    //   <ul>
    //     {product.map((item) => (
    //       <li>{item}</li>
    //     ))}
    //   </ul>
    // ),
  },
  {
    title: 'Total price',
    dataIndex: 'total_price',
    key: 'total',
    defaultSortOrder: 'ascend',
    sorter: (a, b) => a.total_price - b.total_price,
    render: (text) => {
      const newText = text.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
      return newText;
    }
  },
  {
    title: 'Shipping address',
    dataIndex: 'shipping_address',
    key: 'address',
    render: (address) =>{
      const rs = JSON.parse(address);
      return rs.detailAddress + ', ' + rs.wardName + ', ' + rs.districtName + ', ' + rs.provinceName ;
    }
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'order_status',
    render: (status, { id }, index) => {
      let color = null;
      switch (status) {
        case 'COMPLETED':
          color = 'green';
          break;
        case 'PENDING':
          color = 'geekblue';
          break;
        default:
          //Canceled
          color = 'red';
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
    title: 'Created date',
    key: 'order_date',
    dataIndex: 'createdAt',
    sorter: (a, b) => {
      const dateA = Date.parse(a.createdAt);
      const dateB = Date.parse(b.createdAt);
      return dateA - dateB;
    },
    render: (text) => {
      const date = new Date(text).toLocaleString()

      return date;
    },
  },
  {
    title: 'Updated date',
    key: 'update_date',
    dataIndex: 'updatedAt',
    sorter: (a, b) => {
      const dateA = Date.parse(a.updatedAt);
      const dateB = Date.parse(b.updatedAt);
      return dateA - dateB;
    },
    render: (text) => {
      const date = new Date(text).toLocaleString()

      return date;
    },
  },
  {
    title: '',
    render: (row) => {
      return (
        <a href={`/order_detail?id=${row.order_sn}`}>View detail</a>
      );
    },
  },
];

export default function Orders() {
  const [orders, setOrders] = useState();
  const [userId, setUserId] = useState(2);
  const [status, setStatus] = useState('all');
  const [total, setTotal] = useState();
  const [showOrders, setShowOrders] = useState();
  
  const [noOfRecords, setNoOfRecords] = useState(4);
  const [searchText, setSearchText] = useState();
  const axiosPrivate = useAxiosPrivate();
  
  const [inputAddress, setInputAddress] = useState("");




  useEffect(() => {
    const getOrders = async() => {
      const res = await axiosPrivate.get("/order/getOrderByUserId");
      // console.log(res.data);
      setOrders(res.data?.map(item => ({...item, key: item.id})));
    }
    getOrders();
  }, [])
  const handleChangeStatus = (value) => {
    // console.log(value);
    setStatus(value);
  }
  // console.log(orders);
  useEffect(() => {

    
    if(orders) {
      // console.log(status);
      if(status === "completed") {
        setShowOrders(
          orders.filter((item) => item.order_status === "COMPLETED")
        );
      }
      else if(status === 'pending') {
        setShowOrders(
          orders.filter((item) => item.order_status === "PENDING")
        );
      }
      else if(status === 'cancelled') {
        setShowOrders(
          orders.filter((item) => item.order_status === "CANCELLED")
        );
      }
      else if(status === 'waiting_delivery') {
        setShowOrders(
          orders.filter((item) => item.order_status === "WAITING_DELIVERY")
        );
      }
      else if(status === 'delivering') {
        setShowOrders(
          orders.filter((item) => item.order_status === "DELIVERING")
        );
      }
      else {
        setShowOrders(orders);
      }
     
    }
  }, [orders, status])
  // console.log(showOrders);
  return (
    <Container>
      <Title level={2} className="text-center">
        Order Management
      </Title>
      <div>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          // disabled={componentDisabled}
          style={{ maxWidth: 600 }}
        >
          <Form.Item label="Status">
            <Space>
              <Select
                defaultValue={status}
                style={{ width: "140px" }}
                onChange={handleChangeStatus}
                options={[
                  { value: 'all', label: 'All' },
                  { value: 'completed', label: 'Completed' },
                  { value: 'pending', label: 'Pending' },
                  { value: 'cancelled', label: 'Cancelled' },
                  {value: 'waiting_delivery', label: "Waiting delivery"},
                  {value: 'delivering', label: "Delivering"},
                  

                ]}
              />
              {/* <Search
                placeholder="Find Orders by order ID"
                style={{ minWidth: '300px' }}
                onChange={(e) => setSearchText(e.target.value)}
              /> */}
            </Space>
          </Form.Item>
        </Form>
        
          <Table
            columns={columns}
            dataSource={showOrders}
            // pagination={{
            //   position: ['bottomRight'],
            //   pageSize: noOfRecords,
            //   total: 200000,
            //   current: currentPageAll,
            //   onChange: (currentPageAll) => {
            //     getOrdersOfUser(currentPageAll);
            //     setCurrentPageAll(currentPageAll);
            //   }
            // }}
          />
        
        
      </div>
    </Container>
  );
}
