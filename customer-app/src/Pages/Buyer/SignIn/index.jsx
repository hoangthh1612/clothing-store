import React from 'react';
import Container from 'Components/Common/Container';
import { Button, Col, Form, Input, Radio, Row, Space, Typography } from 'antd';
import logo from 'Resources/assets/img/logo.svg';
import { Link } from 'react-router-dom';
const { Title, Text } = Typography;

//export default function SignIn() {
const SignIn = () => {
  return (
    // <Container>
    <div className="h-screen overflow-hidden">
      <Row className="-mx-[8px] h-screen" align="middle">
        <Col span={12}>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
            // labelAlign="left"
            className="m-auto">
            <Title level={3} className="text-center">
              Register
            </Title>
            {/* <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
              ]}>
              <Input />
            </Form.Item> */}

            <Form.Item
              label="Phone number"
              name="phone_number"
              rules={[
                { required: true, message: 'Please input your phone number!' },
              ]}>
              <Input />
            </Form.Item>

            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: 'Please input your username!' },
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

            <Form.Item
              label="Re-enter Password"
              name="re_enter_password"
              rules={[
                { required: true, message: 'Please re-enter your password!' },
              ]}>
              <Input.Password />
            </Form.Item>
            {/* <Form.Item
              label="Gender"
              //   name="repeat"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}>
              <Radio.Group name="gender" defaultValue={1}>
                <Radio value={1}>Male</Radio>
                <Radio value={2}>Female</Radio>
              </Radio.Group>
            </Form.Item> */}


            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Space direction="vertical">
                <Space>
                  <Button type="primary" danger className="px-xxl">
                    Reset
                  </Button>
                  <Button type="primary" className="px-xl">
                    Create Account
                  </Button>
                </Space>

                <Link to="/login">Already has an account ?</Link>
              </Space>
            </Form.Item>
          </Form>
        </Col>
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
      </Row>
    </div>
    // </Container>
  );
}

export default SignIn;
