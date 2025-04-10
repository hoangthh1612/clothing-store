import React, { Fragment, useState, useEffect } from 'react';
import { useQuery } from '../../../Hooks';
import {
  Col,
  Layout,
  Radio,
  Row,
  Space,
  Input,
  Breadcrumb,
  Typography,
  Card,
} from 'antd';
import { Pagination } from 'antd';
import { ProductList, Slider } from 'Components';
import data from 'Components/Buyer/DumpData';
import banner from 'Pages/Buyer/Product/images/banner.PNG';
import { Link, NavLink } from 'react-router-dom';
// import { Panigation, Product } from 'UI/elements';
import axios from '../../../api/axios';
import TopProductCard from '../../../UI/product/TopProductCard';

const { Title, Text } = Typography;
const { Search } = Input;

// function breadcrumbItem(item ) {
function itemRender(route, params, items, paths) {
  // console.log('items', items);
  const last = items.indexOf(route) === items.length - 1;
  return last ? (
    <span>{route.title}</span>
  ) : (
    <Link to={paths.join('/')}>{route.title}</Link>
  );
}
// }

export default function ProductPage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const getCategories = async () => {
    const res = await axios.get('/category');
    setCategories(res.data);
    // console.log(res.data);

  }
  const getProducts = async () => {
    const res = await axios.get('/product');
    setProducts(res.data);
    
  }
  const getProductBestSeller = async () => {
    try {
      const res = await axios.get("/product/getProductBestSeller");
      setTopProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    
    getProductBestSeller();
    getCategories();
    getProducts();
  }, [])

  const startIdx = (currentPage - 1) * pageSize;
  const endIdx = startIdx + pageSize;
  const currentProducts = products.slice(startIdx, endIdx);
  
  const { sort, value } = useQuery();

  const [roomID, setData] = useState("");

  
  const onChange = (page, pageSize) => {
    console.log(page, pageSize);
    setCurrentPage(page);
  }
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
            style={{ height: "100px", backgroundColor: "blue" }}
            alt="carousel"
          />
        ))}
      </Slider>

      <Layout style={{ padding: "24px 50px" }}>
        {!(sort && value) && (
          <div className='bg-white px-5 py-2'>
            <p className='text-xl my-4 uppercase font-bold'>PRODUCT CATEGORIES</p>
            <Slider
              settings={{
                ...settings,
                rows: 1,
                slidesToShow: 1,
                slidesPerRow: 10,
                // responsive: [],
              }}
              textLevel={4}
              //title="PRODUCT CATEGORIES"
            >
              {categories?.map((item, index) => (
                <NavLink
                  to={`/category/${item.id}`}
                  key={index}
                  className="px-5"
                >
                  <Card
                    cover={
                      <img alt="example" src={item.image} loading="lazy" />
                    }
                    bodyStyle={{ display: "none" }}
                  ></Card>
                  <Title level={5} className="text-center">
                    {item.category_name}
                  </Title>
                </NavLink>
              ))}
            </Slider>
          </div>
        )}

        {sort && value && (
          <Fragment>
            <Row align="middle" justify={"space-between"}>
              <Col flex={2}>
                <Breadcrumb
                  separator=">"
                  items={[
                    {
                      title: sort,
                      path: "/",
                    },
                    {
                      title: value,
                      path: `?sort=category&value=${value}`,
                    },
                  ]}
                  itemRender={itemRender}
                />
              </Col>
              <Col>
                <span>Sort by</span>
                <Radio.Group
                  defaultValue="a"
                  buttonStyle="solid"
                  className="mx-md"
                  size="large"
                >
                  <Space>
                    <Radio.Button value="a">Popular</Radio.Button>
                    <Radio.Button value="b">Latest</Radio.Button>
                    <Radio.Button value="c">Top Sales</Radio.Button>
                  </Space>
                </Radio.Group>
              </Col>
              <Col flex={1}>
                <Search
                  placeholder="input search text"
                  allowClear
                  enterButton="Search"
                  size="large"
                  onSearch={() => {}}
                />
              </Col>
            </Row>
            <Title level={4}>DAILY DISCOVER</Title>
            <ProductList products={products} />

            {/* <Pagination className="text-center" /> */}
          </Fragment>
        )}

        {/* <div className="mt-10">
          <Slider
            settings={{
              ...settings,
              rows: 1,
              slidesToShow: 1,
              slidesPerRow: 6,
              responsive: [],
            }}
            textLevel={4}
            title={"TOP PRODUCTS"}
          >
            {topProducts?.map((product, index) => (
              <NavLink
                to={`/product_detail?productId=${product.id}`}
                key={product.id}
              >
                
                <ProductCardNew product={product} />
              </NavLink>
            ))}
          </Slider>
        </div> */}
         <div className="mt-5 bg-white px-5 py-2">
          <p className="text-xl my-4 uppercase font-bold">Top products</p>
          <TopProductCard products={topProducts} />
        </div>
        <div className="mt-5 bg-white px-5 py-2">
        <p className="text-xl my-4 uppercase font-bold">DAILY DISCOVER</p>
          <ProductList products={currentProducts} />

          <Pagination
            className="text-center"
            total={products?.length}
            onChange={onChange}
            current={currentPage}
            pageSize={pageSize}
          />
        </div>
        {/* {!(sort && value) ? (
          <Fragment>
            <Title level={4}>DAILY DISCOVER</Title>
           

            
          </Fragment>
        ) : (
          <Slider
            settings={{
              ...settings,
              rows: 1,
              slidesToShow: 1,
              slidesPerRow: 6,
              responsive: [],
            }}
            textLevel={4}
            title={'DAILY DISCOVER'}>
            {products.map((product, index) => (
              <NavLink to={`/product_detail?id=${product.id}`} key={product.id}>
                <ProductCardNew product={product} />
              </NavLink>
            ))}
          </Slider>
        )} */}
      </Layout>
    </Fragment>
  );
}
