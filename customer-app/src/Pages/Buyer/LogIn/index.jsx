import React from 'react';
import Container from 'Components/Common/Container';
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
} from 'antd';
import logo from 'Resources/assets/img/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../../api/axios';
import useAuth from '../../../Hooks/useAuth';
const { Title, Text } = Typography;

export default function SignIn() {
  const {auth, setAuth} = useAuth();
  const navigate = useNavigate();
  const handleLogin = async ( values) => {
    //e.preventDefault();
    try {
        const res = await axios.post('/auth/login', values,
          {
            withCredentials: true,
          }
        )
        const authRes = res.data;
            const accessToken = authRes.accessToken;
            const refreshToken = authRes.refreshToken;
            
            localStorage.setItem('accessToken', JSON.stringify(accessToken));
            
            localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
            
            const { username } = values;
            
            setAuth({username, accessToken});

            const user = await axios.get(`/user/getUserByUsername/${username}`);
            
            localStorage.setItem('user', JSON.stringify(username));

            user && localStorage.setItem('info_user', JSON.stringify(user.data));
        navigate('/');

    }
    catch(err) {
        console.log(err);
        
    }
    
}
  return (
    // <Container>
    <div className="h-screen overflow-hidden">
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
            //name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={handleLogin}
            // onFinishFailed={onFinishFailed}
            //autoComplete="off"
            // labelAlign="left"
            className="m-auto">
            <Title level={3} className="text-center">
              Login
            </Title>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: 'Please input your phone number!' },
              ]}>
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}>
              <Input.Password />
            </Form.Item>
            {/* <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{ offset: 8, span: 16 }}>
              <Checkbox>Remember me</Checkbox>
            </Form.Item> */}
            <div className="flex justify-center">
              <button className="px-3 py-1 border-[2px] border-blue-400 bg-blue-400 rounded-xl">Login</button>
              
            </div>
            
          </Form>
          <div className='ml-5'>
          <Link to="/signin">No account ? Create one</Link>
        
          </div>
          </Col>
      </Row>
    </div>
    // </Container>
  );
}
