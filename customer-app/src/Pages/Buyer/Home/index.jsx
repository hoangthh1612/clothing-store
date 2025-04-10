import { Card, Layout, Typography } from 'antd';
import React, { Fragment, useState, useEffect } from 'react';
import { LivestreamCard } from 'UI/elements';
import { Slider, ProductList } from 'Components';
import { NavLink, useNavigate } from 'react-router-dom';
import data from 'Components/Buyer/DumpData';
import banner from 'Pages/Buyer/Product/images/banner.PNG';
import { Product, Panigation } from 'UI/elements';
import { Title } from 'UI/typo';
import axios from '../../../api/axios';
import ProductCardNew from '../../../UI/elements/ProductCard';
import TopProductCard from '../../../UI/product/TopProductCard';

const { Text } = Typography;

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [showSeeMore, setShowSeeMore] = useState(false);
  const [showProducts, setShowProducts] = useState([]);

  const navigate = useNavigate();
  const getCategories = async () => {
    // const res = await fetch('http://localhost:8080/api/category', {
    //   method: 'GET',
    // });
    // const data = await res.json();
    try {
      const res = await axios.get('/category/getAll');
      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };
 
  const getProducts = async () => {
    try {
      const res = await axios.get('/product/getAll');
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getProductBestSeller = async () => {
    try {
      const res = await axios.get("/product/getProductBestSeller");
      setTopProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCategories();
    getProducts();
    getProductBestSeller();
  }, []);
  
  useEffect(() => {
    let pageSize = 12;
    if(products) {
      if(products.length > pageSize) {
        setShowSeeMore(true);
        setShowProducts(products.slice(0, pageSize));
      }
      else {
        setShowSeeMore(false);
        setShowProducts(products);
      }
    }
  }, [products])
  const { livestreams } = data;
  const settings = {
    // className: 'center',
    centerMode: true,
    centerPadding: '0px',
    slidesToShow: 1,
    speed: 500,
    rows: window.screen.width > 768 ? 2 : 1,
    slidesPerRow: 6,
    infinite: true,
    draggable: false,
    // adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesPerRow: 4,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesPerRow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesPerRow: 3,
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
            // style={{
            //   height: '100px',
            //   backgroundColor: 'blue',
            //   padding: '16px',
            // }}
            alt="carousel"
            // className="mx-lg"
          />
        ))}
      </Slider>
      <Layout style={{ padding: '24px 50px'}}>
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
            
          >
            {categories?.map((item, index) => (
              <NavLink
                //to={`/category?sort=category&value=${item.category_name}`}
                to={`/category/${item.id}`}
                key={index}
                className="px-5"
              >
                <Card
                  // style={{ width: 300 }}
                  // key={index}
                  cover={
                    <img
                      alt="example"
                      src={item.image}
                      loading="lazy"
                      //className="!rounded-lg w-[60%] h-[80%]"
                    />
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

        {window.screen.width > 576 ? (
          <Slider
            settings={{ ...settings, slidesPerRow: 5 }}
            textLevel={window.screen.width > 576 ? 4 : 5}
            title="LIVESTREAMS"
          >
            {livestreams?.map((item, index) => (
              <NavLink to={`/live`} key={index} className="px-3 py-2">
                <LivestreamCard {...item} />
              </NavLink>
            ))}
          </Slider>
        ) : (
          ""
        )}
        <div className="mt-5 bg-white px-5 py-2">
          <p className="text-xl my-4 uppercase font-bold">Top products</p>
          <TopProductCard products={topProducts} />
        </div>
        <div className="mt-5 bg-white px-5 py-2">
          <p className="text-xl my-4 uppercase font-bold">DAILY DISCOVER</p>
          <ProductList products={showProducts} />
          <div className="flex items-center justify-center">
            <button
              className="px-20 py-1 border-[1px] border-slate-400 rounded bg-slate-100"
              onClick={() => {
                navigate("/product");
              }}
            >
              See more
            </button>
          </div>
        </div>

        {/* <Panigation className="text-center" /> */}
      </Layout>
    </Fragment>
  );
}
