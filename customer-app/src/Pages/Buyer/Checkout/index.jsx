import React, { useState, useEffect, Fragment } from "react";
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
import cartAPI from "api/cart";
import orderAPI from "api/order";
import notificationAPI from "api/notification";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import ProductsOrdered from "./components/ProductsOrdered";
import { socket } from "../../../Hooks/socket/useSocket";

// import ChooseAddressModal from "../Account/component/chooseAddress";
import ChooseAddressModal from "./components/ChooseAddress";
// import axios from "../../../api/axios";
import axios from "axios";

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
  const [values, setValues] = useState();
  const axiosPrivate = useAxiosPrivate();
  const [changePrice, setChangePrice] = useState(0);
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [temporaryPrice, setTemporaryPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  const [name, setName] = useState();
  const [user, setUser] = useState();
  const [isOrderSuccess, setIsOrderSuccess] = useState(false);
  const [orderStore, setOrderStore] = useState([]);


  /////////////////////////////

  const [isDetail, setIsDetail] = useState(false);
  const [infoProduct, setInfoProduct] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [keyDetail, setKeyDetail] = useState(0);
  const [phone, setPhone] = useState("");
  // const [name, setName] = useState();
  const [address, setAddress] = useState("{}");
  const [inputAddress, setInputAddress] = useState("");
  const [address2, setAddress2] = useState("{}");
  const [inputAddress2, setInputAddress2] = useState(" ");

  const [loading, setLoading] = useState(true);
  const [check, setCheck] = useState(false);

  useEffect(()=>{
    const rs = JSON.parse(address)
    setInputAddress(rs.detailAddress + ', ' + rs.wardName + ', ' + rs.districtName + ', ' + rs.provinceName);
    // setAddress2(rs.name + ', '+ rs.phone + ', ' +  rs.detailAddress + ', ' + rs.wardName + ', ' + rs.districtName + ', ' + rs.provinceName);

  }, [address])


  useEffect(()=>{
    const rs = JSON.parse(address2)
    setInputAddress2(rs.name + ', '+ rs.phone + ', ' +  rs.detailAddress + ', ' + rs.wardName + ', ' + rs.districtName + ', ' + rs.provinceName);
  }, [address2])


useEffect(()=>{
  if(user){
    setAddress(user.address)
  }
}, [user])

  //////////////////////////

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axiosPrivate.get('/user/verifyUser');
        setUser(res.data);
      }
      catch(err) {
        console.log(err);
      }
    }
    getUser();
  }, [])
  console.log(name);
  useEffect(() => {
    if(user) {
      user.fullname && setName(user.fullname);
      user.address && setAddress(user.address);
      user.phone_number && setPhone(user.phone_number);
      // user.address && setAddress(user.address);
    }

  }, [user])

//   useEffect(()=>{
//     setValue("address", inputAddress)
// }, [inputAddress])



  

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
      // console.log(JSON.parse(value));
      let jsonInfoCart = JSON.parse(value);
      let infoCart = JSON.parse(jsonInfoCart.checkout);
      setValues(infoCart.data);
      // console.log(infoCart);
      setTotalPrice(infoCart.totalPrice);
      setTemporaryPrice(infoCart.totalPrice);
    }
  }, []);
  //console.log(cart.checkout);

  useEffect(() => {
    if(values) {
      let ids = values?.map((item) => item.storeId);
      let uniqueArray = [...new Set(ids)];
      // console.log(uniqueArray);
      let result = [];
      for(const id of uniqueArray) {
        let data = values?.filter(item => item.storeId === id);
        let total_price = 0;
        for(const i of data) {
          total_price += i.product_detail.price*i.quantity;
        }
        result.push({order_store: data, storeId: id, total_price, voucher_info: {orderTotal: total_price, voucherId: null}});
      }
      // console.log(result);
      setOrderStore(result);
    }
  }, [values])
  
  useEffect(() => {
    
    if(orderStore) {
      let result = 0;
      let total = 0;
      for(const item of orderStore) {
        result += item.voucher_info.orderTotal;
        total += item.total_price;
      }
      
      setTemporaryPrice(total);
      setTotalPrice(result);
      setChangePrice(total - result);
    }
  }, [orderStore])  

  const handleSubmit = async (formValues) => {
    // Handle logic when the user clicks on the "Checkout" button
    // console.log(values);
    // socket.emit('order', "Your order successfully!!!")
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
        total_price: temporaryPrice - changePrice + deliveryCost.total,
        voucher_info: item.voucher_info,
        discount: changePrice,
        shipping_fee: deliveryCost.total,
        fullname: name,
        phone: phone,
        shipping_address: address,
        payment_method: value

        // ...formValues
      }
    })
    
    try {
      for(const item of order_detail) {
        const res = await axiosPrivate.post('/order/create', item);
        console.log(res.data);
      }
      setIsOrderSuccess(true);
      setTimeout(() => {
        navigate('/orders');
      }, 1500)
    } catch (error) {
      console.log(error);
    }
    // try {setPhone
    //   const res = await axiosPrivate.post('/order/create', data);
    //   // console.log(res.data);
    //   setIsOrderSuccess(true);
    //   setTimeout(() => {
    //     navigate('/orders');
    //   }, 2000)
    // } catch (error) {
    //   console.log(error);
    // }
  };


  const handleSubmit2 = async (formValues) => {
    // Handle logic when the user clicks on the "Checkout" button
    // console.log(values);
    // socket.emit('order', "Your order successfully!!!")
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
        total_price: temporaryPrice - changePrice + deliveryCost.total,
        voucher_info: item.voucher_info,
        discount: changePrice,
        shipping_fee: deliveryCost.total,
        fullname: name,
        phone: phone,
        shipping_address: address,
        payment_method: value

        // ...formValues
      }
    })
    
    try {
      for(const item of order_detail) {
        const res = await axiosPrivate.post('/order/create', item);
        // console.log(res.data);
      }

      
      const a = await axiosPrivate.post('/payment/create_payment_url',{totalPrice: temporaryPrice - changePrice + deliveryCost.total});
      window.open(a.data)
      // console.log(a.data);
    
      // setIsOrderSuccess(true);
      // setTimeout(() => {
      //   navigate('/orders');
      // }, 1500)
    } catch (error) {
      console.log(error);
    }finally {
      setLoading(false);
    }
    // try {setPhone
    //   const res = await axiosPrivate.post('/order/create', data);
    //   // console.log(res.data);
    //   setIsOrderSuccess(true);
    //   setTimeout(() => {
    //     navigate('/orders');
    //   }, 2000)
    // } catch (error) {
    //   console.log(error);
    // }
  };













  const [value, setValue] = useState(1);

  const onChange = (e) => {
    // console.log('radio checked', e.target.value);
    e.preventDefault();
    setValue(e.target.value);
  };

  const payment = async () =>{
    const a = await await axiosPrivate.post('/payment/create_payment_url');
    window.open(a.data)
  }
  
  return (
    <>
    <Layout 
    // style={{ padding: "24px 50px" }}
    style={{
      padding: "24px 50px",
      margin: "10px 100px",
      backgroundColor: "white",
    }

  }>
      {isOrderSuccess && 
        (<Alert 
          type="success"
          message="Checkout successfully"
          showIcon
        />
      )}
      <Row gutter={[48, 8]}>

        <Col span={24}>
                <div style={{ marginRight: "16px", flex: "3", 
                
                  // width: "100%"
              }}>
                {/* <Card title="Address Delivery"> */}
                <div className="h-[70px] items-center border-[1px] mb-5 px-5">
                  <div className="font-bold text-lg">Address:&nbsp;&nbsp;</div>
                <div className="flex justify-between items-center">
                  {address2 !=="{}"? 
                  <>
                       <div className="flex-none font-sans text-lg w-120">{inputAddress2}</div>
                  </>:
                  
                  <>
                      <div className="flex-none font-sans text-lg w-120"> {name}, {phone}, {inputAddress}</div>
                  </>
                  }
                    
                    <div className="flex flex-initial w-40"><button className="text-blue-400" onClick={()=>{
                      setIsDetail(pre => !pre);
                      
                    }}>Change Address</button></div>
                
                </div>

                {/* </Card> */}
                </div>
                </div>
        </Col>
        <Col span={24}>
          <div style={{ marginRight: "16px", flex: "3", 
          
            // width: "100%"
        }}>
          
          <div className="flex h-[50px] items-center border-[1px] mb-5 px-5">
                {/* <div className="min-w-[60px]">
                    <Checkbox />
                </div> */}
                <div className="w-[40%]">
                    <p className="font-bold text-[16px]">Products Ordered</p>
                </div>
                <div className="w-[20%]">
                    <p className="text-center font-bold text-[16px]">Price</p>
                </div>
                <div className="w-[20%]">
                    <p className="text-center font-bold text-[16px]">Quantity</p>
                </div>
                <div className="w-[20%]">
                    <p className="text-right font-bold text-[16px]">Item subtotal</p>
                </div>
            
            </div>
            {orderStore?.map((item, index) => (
            <Fragment key={index}>
                <ProductsOrdered productStore={item} setOrderStore={setOrderStore} address ={address} setDeliveryCost ={setDeliveryCost}/>
            </Fragment>
           ))}
          </div>
            
        </Col>

        <Col span={24}>
        <div style={{ marginRight: "16px", flex: "3", 
          
          // width: "100%"
      }}>
          {/* <Card title="Delivery Information"></Card> */}
          {/* <Form
            onFinish={handleSubmit}
            layout="vertical"
            style={{ marginTop: "24px" }}
          >
            <Form.Item
              
              label="Fullname"
              name="fullname"
              rules={[{ required: true }]}
            >
             <Input defaultValue={name} />
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
            </Form.Item> */}
{/*             
            <button
              className="border-[1px] px-4 py-1 border-collapse rounded-md bg-blue-300"
            >Order</button> */}
            {/* <Button
              type="primary"
              style={{ background: "#1890ff", marginTop: "24px" }}
            >
              Order
            </Button> */}
          {/* </Form> */}
          </div>
        </Col>

        <Col span={24}>
        <div style={{ marginRight: "16px", flex: "3", 
          
          // width: "100%"
      }}>
          <Card className="font-sans text-lg" title="Payment Information">
            <Radio.Group onChange={onChange} value={value} defaultValue={1}>
              <Radio className="font-sans text-lg" value={1}>Pay in Cash</Radio>
              <Radio className="font-sans text-lg" value={2}>Pay with VNPAY</Radio>
            </Radio.Group>

            {/* <Form style={{ marginTop: "24px" }}>
              <h2 className="font-sans text-lg" style={{ marginBottom: "24px" }}>
                Temporary price: {formatCurrency(temporaryPrice)}
              </h2>
              <Form.Item style={{width: "50%"}} label="Voucher">
                <Select size={"middle"}placeholder="Select a voucher" disabled={true}>
                  <Option value="voucher1">Voucher 1</Option>
                  <Option value="voucher2">Voucher 2</Option>
                </Select>
              </Form.Item>
            </Form> */}
             <h2 style={{ marginTop: "24px" }}>
              Total product price: {formatCurrency(temporaryPrice)}
            </h2>
            <h2 style={{ marginTop: "24px" }}>
              Discount: -{formatCurrency(changePrice)}
            </h2>
            <h2 style={{ marginTop: "24px" }}>
              {/* Delivery cost: {formatCurrency(deliveryCost)} */}
              Delivery cost: {deliveryCost.total} đ
            </h2>
            <div className="">
            <h2 className="" style={{ marginTop: "24px" }}>
              Total Price:{" "}
              {formatCurrency(temporaryPrice - changePrice + deliveryCost.total)}
            </h2>
            {loading&&value===2&&check?  <>
            <div role="status">
                <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span class="sr-only">Loading...</span>
            </div>
            
            </>:
            <></>}
           
            <Button onClick={(e)=>{
              if(value === 1){
                  handleSubmit(e);
              }
              else if(value ===2){
                setCheck(pre=>!pre);
                 handleSubmit2(e);
              }
            }} style={{ marginTop: "24px" }} className="">
              Order</Button>
            </div>
          </Card>
          </div>
        </Col>
      </Row>
    </Layout>
    <ChooseAddressModal isDetail={isDetail}
        address = {address}
        setAddress = {setAddress}
        infoProduct={infoProduct}
        setIsDetail={setIsDetail}
        keyDetail={keyDetail}
        setKeyDetail={setKeyDetail}
        address2 = {address2}
        setAddress2 = {setAddress2}    
        setName = {setName}
        setPhone = {setPhone}   
        />
        
    
    </>
  );
};

export default Checkout;
