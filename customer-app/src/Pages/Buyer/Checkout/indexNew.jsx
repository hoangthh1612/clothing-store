import React, { useState, useEffect } from "react";
import {
  Layout,
  Row,
  Col,
  Card,
  Form,
  Input,
  Radio,
  Select,
  Button,
  List,
  Image,
  Typography,
  Checkbox,
  Divider,
  InputNumber,
  Alert,
} from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { useSocket } from "../../../context/useSocket";
import { useNavigate } from "react-router-dom";

//////////////////////
import { notification } from "antd";



///////////////////////////////
const { Title, Text } = Typography;

const { Option } = Select;

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

const Checkout = () => {


  const {socket} = useSocket();
  const [userId, setUserId] = useState(2);
  const [values, setValues] = useState();
  const axiosPrivate = useAxiosPrivate();
  const [changePrice, setChangePrice] = useState(0);
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [temporaryPrice, setTemporaryPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  //receiver infomation
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState();
  const [isOrderSuccess, setIsOrderSuccess] = useState(false);
  const [orderStore, setOrderStore] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("cash");

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axiosPrivate.get('/user/verifyUser');
        console.log(res.data);
        setUser(res.data);
      }
      catch(err) {
        console.log(err);
      }
    }
    getUser();
  }, [])

  // const listener = (...args) => {



  // }

  // useEffect(()=>{
  //     socket.connect();
  //     // socket.on('order', listener)
  //     // socket.emit('order', "sao khong vo may ôiiiiiiiiiiiiiiii")
  // }, [])

  useEffect(() => {
    if(user) {
      user.fullname && setName(user.fullname);
      user.address && setAddress(user.address);
      user.phone && setPhone(user.phone);
      user.address && setAddress(user.address);
    }

  }, [user])

  

  const formatCurrency = (amount) => {
    const options = {
      style: "currency",
      currency: "VND",
    };

    return amount.toLocaleString("vi-VN", options).replace("₫", "đ");
  };
  useEffect(() => {
    let value;
    if (typeof localStorage !== "undefined") {
      //cart = JSON.parse(localStorage.getItem("cart") || "");
      value = localStorage.getItem("persist:checkout");
      console.log(JSON.parse(value));
      let jsonInfoCart = JSON.parse(value);
      let infoCart = JSON.parse(jsonInfoCart.checkout);
      setValues(infoCart.data);
      console.log(infoCart);
      setTotalPrice(infoCart.totalPrice);
      setTemporaryPrice(infoCart.totalPrice);
    }
  }, []);
  //console.log(cart.checkout);

  useEffect(() => {
    if(values) {
      let ids = values?.map((item) => item.storeId);
      let uniqueArray = [...new Set(ids)];
      console.log(uniqueArray);
      let result = [];
      for(const id of uniqueArray) {
        let data = values?.filter(item => item.storeId === id);
        let total_price = 0;
        for(const i of data) {
          total_price += i.product_detail.price*i.quantity;
        }
        result.push({order_store: data, storeId: id, total_price});
      }
      setOrderStore(result);
    }
  }, [values])

  

  const handleSubmit = async (formValues) => {
    // Handle logic when the user clicks on the "Checkout" button
    // socket.emit('order', "your order is successfully!")
    // console.log(values);
    let order_detail = orderStore?.map((item) => {
      let order_store = item.order_store?.map((i) => {
        return {
          cartId: i.cartId ? i.cartId : null,
          productDetailId: i.productDetailId,
          quantity: i.quantity,
          price: i.product_detail.price
        }
      })
      return {
        order_store,
        storeId: item.storeId,
        total_price: item.total_price
      }
    })
    console.log(order_detail);
    let data = {
      ...formValues,
      total_price: temporaryPrice,
      order_detail
    }
    // console.log(data);
    try {
      const res = await axiosPrivate.post('/order/create', data);
      console.log(res.data);
      setIsOrderSuccess(true);
      
      setTimeout(() => {
        navigate('/orders');
      }, 1500)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout style={{ padding: "24px 50px" }}>
      {isOrderSuccess && 
        (<Alert 
          type="success"
          message="Checkout successfully"
          showIcon
        />
      )}
      <Row gutter={16}>
        <Col span={8}>
          <div style={{ marginRight: "16px", flex: "3" }}>
            <List
              itemLayout="vertical"
              dataSource={values}
              renderItem={(item) => (
                <List.Item
                  key={item.id}
                  extra={
                    <Image
                      width={150}
                      src={item.product_detail.Product.image}
                      alt={"logo"}
                    />
                  }
                >
                  <List.Item.Meta
                    //title={item.product_detail.Product.product_name + ' - ' + formatCurrency(item.Product_variant.price)}
                    title={
                      item.product_detail.Product.product_name +
                      " - " +
                      item.product_detail.price
                    }
                    description={getVariation(
                      item.product_detail.skus_variation_options
                    )}
                    // description={
                    //   item.Product_variant.Variant_values.map((variant_value) => (
                    //     <>
                    //       <span key={variant_value.id}>
                    //         {'-'} {variant_value.Option_value.value} {' '}
                    //       </span>
                    //     </>
                    //   ))
                    // }
                  />

                  <Divider />
                  <Text>Quantity: {item.quantity}</Text>
                </List.Item>
              )}
            />
          </div>
        </Col>

        <Col span={8}>
          <Card title="Delivery Information"></Card>
          <Form
            onFinish={handleSubmit}
            layout="vertical"
            style={{ marginTop: "24px" }}
          >
            <Form.Item
              defaultValue={name !== "" && name}
              label="Fullname"
              name="fullname"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Shipping Address"
              name="shipping_address"
              defaultValue={address}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Phone Number"
              name="phone"
              defaultValue={phone}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              defaultValue={email}
              rules={[{ required: true, type: "email" }]}
            >
              <Input />
            </Form.Item>
            
            <button
              className="border-[1px] px-4 py-1 border-collapse rounded-md bg-blue-300"
            >Order</button>
            {/* <Button
              type="primary"
              style={{ background: "#1890ff", marginTop: "24px" }}
            >
              Order
            </Button> */}
          </Form>
        </Col>

        <Col span={8}>
          <Card title="Payment Information">
            <Radio.Group defaultValue={1}>
              <Radio value={1}>Pay on delivery</Radio>
              <Radio value={2}>Pay with PayPal</Radio>
            </Radio.Group>

            <Form style={{ marginTop: "24px" }}>
              <h2 style={{ marginBottom: "24px" }}>
                Temporary price: {formatCurrency(temporaryPrice)}
              </h2>
              <Form.Item label="Voucher">
                <Select placeholder="Select a voucher" disabled={true}>
                  <Option value="voucher1">Voucher 1</Option>
                  <Option value="voucher2">Voucher 2</Option>
                </Select>
              </Form.Item>
            </Form>
            <h2 style={{ marginTop: "24px" }}>
              Change: {formatCurrency(changePrice)}
            </h2>
            <h2 style={{ marginTop: "24px" }}>
              Delivery cost: {formatCurrency(deliveryCost)}
            </h2>
            <h2 style={{ marginTop: "24px" }}>
              Total Price:{" "}
              {formatCurrency(temporaryPrice - changePrice + deliveryCost)}
            </h2>

            {/* <Button
              type="primary"
              style={{ background: "#1890ff", marginTop: "24px" }}
            >
              Order
            </Button> */}
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default Checkout;
