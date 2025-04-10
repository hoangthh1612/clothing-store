import { Button, Col, Popover, Rate, Row, Space, InputNumber, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';


const { Text, Title } = Typography;

export default function FeaturedCard({ containerRef, isShow, setIsShow }) {

  const navigate = useNavigate();
  const handleClickAddToCart = () => {
    console.log('added to cart');
  }

  const handleClickBuyNow = () => {
    console.log('go to checkout page');
    navigate('/checkout');
  }

  const content = (
    <div className="rounded-xl border-2 p-xl">
      <Row gutter={[16, 16]}>
        <Col className="w-[200px]">
          <div>
            <img
              src="https://lzd-img-global.slatic.net/g/p/bc9dc49231c13c51e0ebe413ee3f8fa2.jpg_156x156q80.jpg_.webp"
              alt="product"
              className="rounded-xl w-full"
            />
          </div>
          {/* <p>Although all OLEDs deliver similar fantastic picture</p> */}
        </Col>
        <Col>
          <div>
            <Title level={2}>Đồng hồ Rolex DD</Title>
            <Rate disabled defaultValue={5} />
            <Title level={2}>Color </Title>
            <Space>
              <Button danger>Yellow</Button>
              <Button>Blue</Button>
              <Button>Red</Button>
            </Space>
            <Row gutter={[16, 16]} className="mt-xl">
              <Col>
                <Row>
                  <Text type="danger" className="text-2xl">
                    200.000 VND
                  </Text>
                </Row>
                <Row>
                  <InputNumber
                    min={1}
                    max={99}
                    defaultValue={1}
                    onChange={() => { }}
                    addonBefore="+"
                    addonAfter="-"
                    size="large"
                    className="!w-28"
                  />
                </Row>

              </Col>
              <Col>
                <Text className="text-2xl">Size</Text>
                <Row>
                  <Col span={8}>
                    <Button type="primary" className="w-[50px]">
                      {' '}
                      XS
                    </Button>
                  </Col>
                  <Col span={8}>
                    <Button type="text" className="w-[50px]">
                      {' '}
                      S
                    </Button>
                  </Col>
                  <Col span={8}>
                    <Button type="text" className="w-[50px]">
                      {' '}
                      M
                    </Button>
                  </Col>
                  <Col span={8}>
                    <Button type="text" className="w-[50px]">
                      {' '}
                      L
                    </Button>
                  </Col>
                  <Col span={8}>
                    <Button type="text" className="w-[50px]">
                      {' '}
                      XL
                    </Button>
                  </Col>
                  <Col span={8}>
                    <Button type="text" className="w-[50px]">
                      {' '}
                      XXL
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <Row justify='center'>
        <Space wrap align="center">
          <Button type="primary" size="large" onClick={handleClickAddToCart}>
            Add to cart
          </Button>
          <Button type="primary" danger size="large" onClick={handleClickBuyNow}>
            Buy Now
          </Button>
        </Space>
      </Row>
    </div>
  );

  return (
    <Popover
      content={content}
      trigger="click"
      getPopupContainer={() => containerRef.current}
      open={isShow}
      onOpenChange={setIsShow}>
      {/* <div className="relative p-xl border-2 rounded-lg border-solid hover:border-red-150 border-transparent transition duration-300 ease-in-out"> */}
      <div className="p-[14px]">
        <div className="text-center">
          {isShow !== undefined && console.log('isShow', isShow)}
          {/* <Text type="danger">Featured now</Text> */}
        </div>
        <div className="flex items-center">
          <img
            src="https://lzd-img-global.slatic.net/g/p/bc9dc49231c13c51e0ebe413ee3f8fa2.jpg_156x156q80.jpg_.webp"
            alt="product"
            className="rounded-lg"
          />

          <div className="px-xl text-center flex flex-col justify-center">
            <Title level={3}>Đồng hồ Rolex DD</Title>
            <Rate value={5} disabled />
            <h2 className="mb-0">In Stock 50</h2>
            <Text type="danger" strong className="text-xl">
            100.000 VND
            </Text>
          </div>
        </div>
      </div>
    </Popover>
  );
}
