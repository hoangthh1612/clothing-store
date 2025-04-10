import React, { Fragment, useEffect, useState } from 'react';
import { Col, Layout, Radio, Row, Space, Input, Breadcrumb, Typography, Pagination } from 'antd';
import { ProductList, Slider } from '../../../Components';
import data from '../../../Components/Buyer/DumpData';
import banner from '../../../Resources/assets/img/banner.PNG';
import { NavLink, useParams } from 'react-router-dom';
import { Panigation, Product } from 'UI/elements';
import axios from '../../../api/axios';
import ProductCardNew from '../../../UI/elements/ProductCard';
const { Search } = Input;
const { Title, Text } = Typography;
export default function Category() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  let {id} = useParams();
  const getProducts = async () => {
    const res = await axios.get(`/product/getProductByCategoryId/${id}`);
    setProducts(res.data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const onChange = (page, pageSize) => {
    console.log(page, pageSize);
    setCurrentPage(page);
  }
  
  const startIdx = (currentPage - 1) * pageSize;
  const endIdx = startIdx + pageSize;
  const currentProducts = products.slice(startIdx, endIdx);
  
 
  
 

  const settings = {
    // className: 'center',
    centerMode: true,
    centerPadding: '0px',
    slidesToShow: 1,
    speed: 500,
    rows: 2,
    slidesPerRow: 6,
    infinite: true,
    draggable: false,
    // adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesPerRow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesPerRow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesPerRow: 2,
        },
      },
    ],
  };
  return (
    <Fragment>
      <Slider
        settings={{
          ...settings,
          rows: 1,
          slidesToShow: 1,
          slidesPerRow: 1,
          responsive: [],
        }}
      >
        {[banner, banner, banner].map((item, index) => (
          <img
            src={item}
            key={index}
            style={{ height: '100px', backgroundColor: 'blue' }}
            alt="carousel"
          />
        ))}
      </Slider>

      <Layout className="px-xl py-xxl">
        <Row align="middle" justify={'space-between'}>
          {/* <Col span={24}>
            <Breadcrumb
              separator=">"
              items={[
                {
                  title: 'Category',
                  href: '/product',
                },
                {
                  title: 'Catergogry 1',
                  href: '',
                },
              ]}
            />
          </Col> */}
          {/* <Col>
            {window.screen.width > 430 ? <span>Sort by</span> : ''}

            <Radio.Group
              defaultValue="a"
              buttonStyle="solid"
              className="mx-md"
              size={window.screen.width > 430 ? 'large' : 'small'}
            >
              <Space>
                <Radio.Button value="a">Popular</Radio.Button>
                <Radio.Button value="b">Latest</Radio.Button>
                <Radio.Button value="c">Top Sales</Radio.Button>
              </Space>
            </Radio.Group>
          </Col>
          <Col>
            <Search
              placeholder="input search text"
              allowClear
              enterButton="Search"
              size={window.screen.width > 430 ? 'large' : 'small'}
              onSearch={() => {}}
              style={{ width: window.screen.width > 430 ? '100%' : '150px' }}
            />
          </Col> */}
        </Row>

        {/* <ProductList products={products} /> */}
          
        {/* <Panigation className="text-center" /> */}
        {/* <Slider
          settings={{
            ...settings,
            rows: 1,
            slidesToShow: 1,
            slidesPerRow: 6,
            responsive: [
              {
                breakpoint: 768,
                settings: {
                  slidesPerRow: 3,
                },
              },
              {
                breakpoint: 576,
                settings: {
                  slidesPerRow: 2,
                },
              },
            ],
          }}
          textLevel={2}
          title={'TOP PRODUCTS'}
        >
          {products.map((product, index) => (
            <NavLink to={`/product_detail?id=${product.id}`} key={product.id}>
             
              <ProductCardNew product={product} />
            </NavLink>
          ))}
        </Slider> */}
        <Title level={4}>DAILY DISCOVER</Title>
            <ProductList products={products} />
            <Pagination className='text-center' total={products?.length} onChange={onChange} current={currentPage} pageSize={pageSize} />
        
      </Layout>
    </Fragment>
  );
}
