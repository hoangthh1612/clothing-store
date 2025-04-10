'use client'

import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Radio,
  Row,
  Space,
  Typography,
} from "antd";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios, { axiosPrivate } from "@/api/axios";
//import { useAuthContext } from "@/Context/AuthProvider";
import useAuth from "@/hooks/useAuth";

//import logo from 'Resources/assets/img/logo.svg';
const { Title, Text } = Typography;
//const {auth, setAuth} = useContext(AuthContext);

type AuthResponse = {
  username: string,
  accessToken: string,
  refreshToken: string
};

type LoginRequest = {
  username: string,
  password: string
}

const SignIn = () => {
    
    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    })
    const {auth, setAuth} = useAuth();
    useEffect(() => {
      const getCookie = async () => {
        try {
          const res = await axios.get('/auth/getCookies', {
            withCredentials: true
          });
          console.log(res.data);
          
        } catch (error) {
          console.log(error);
            console.log(error);
            
        }
      }
      getCookie();
    }, [])

    const handleLogin = async ( values: LoginRequest) => {
        //e.preventDefault();
        console.log(values);
        try {
            const res = await axios.post('/auth/login', values,
              {
                  //headers: {"Content-Type": "application/json"},
                withCredentials: true,
              }
            )
            console.log(res.data);
            const authRes : AuthResponse = res.data;
            const accessToken = authRes.accessToken;
            const refreshToken = authRes.refreshToken;
            
            localStorage.setItem('accessToken', JSON.stringify(accessToken));
            localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
            

            const { username } = values;
            
            setAuth({username, accessToken});
            
            const user = await axios.get(`/user/getUserByUsername/${username}`);
            
            localStorage.setItem('user', JSON.stringify(username));
            //localStorage.setItem('userInfo', JSON.stringify(res.data.user_info));
            user && localStorage.setItem('info_user', JSON.stringify(user.data));
            
            

            router.push('/');
 
        }
        catch(err) {
            console.log(err);
            
        }
        
    }
    console.log(auth);
    
    const router = useRouter();
    const logo =
    "https://png.pngtree.com/png-clipart/20190611/original/pngtree-wolf-logo-png-image_2306634.jpg";

  return (
    // <Container>

    <main className="h-screen overflow-hidden">
      <Row className="-mx-[8px] h-screen" align="middle">
        <Col span={12} className="h-screen relative">
          {/* <div> */}
          <img
            src={logo}
            alt=""
            className="absolute max-w-[500px] top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            width="100%"
          />
          {/* </div> */}
          <img
            src="https://picsum.photos/800/1500"
            alt="signin"
            width="100%"
            height="100%"
            className="object-cover"
          />
        </Col>
        <Col span={12}>
          <Form
            onFinish={handleLogin}
            //name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            //autoComplete="off"
            // labelAlign="left"
            className="m-auto"
          >
            <Title level={3} className="text-center">
              Login
            </Title>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name='password'
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            {/* <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{ offset: 8, span: 16 }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item> */}
            <div className="flex justify-center">
            <button className="px-3 py-1 border-[2px] border-blue-400 bg-blue-400 rounded-xl">Login</button>
            </div>
            {/* <Form.Item
              wrapperCol={{ offset: 0, span: 24 }}
              className="text-center"
            >
              <Space direction="vertical">
                <Button className="px-xl">
                  Log in
                </Button>
                <Link href="/signin">No account ? Create one</Link>
              </Space>
            </Form.Item> */}
          </Form>
        </Col>
      </Row>
    </main>

    // </Container>
  );
};

export default SignIn;
