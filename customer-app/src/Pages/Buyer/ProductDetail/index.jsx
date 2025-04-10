import {
  Button,
  Col,
  Divider,
  InputNumber,
  Layout,
  Radio,
  Rate,
  Row,
  Space,
  Typography,
  Avatar,
  Modal,
  Input
} from 'antd';
import { Comment } from '@ant-design/compatible';
import React, { useEffect, useState } from 'react';
import { Slider } from '../../../Components';
import TextArea from 'antd/es/input/TextArea';
import { Product as ProductCard } from 'UI/elements';
import { Title, Text } from 'UI/typo';
import data from '../../../Components/Buyer/DumpData';
import { NavLink, useLocation } from 'react-router-dom';
import './index.css';
import productAPI from 'api/product';
import cartAPI from 'api/cart';
import { useSearchParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { Paragraph } = Typography;
// const colors = ['RED', 'BLUE', 'GREEN'];
export default function ProductDetail() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImg, setCurrentImg] = useState();

  const [product, setProduct] = useState(null);

  const [optionNameList, setOptionNameList] = useState();

  const [selectedOptions, setSelectedOptions] = useState({});

  const [price, setPrice] = useState(0);

  const [quantity, setQuantity] = useState(0);

  const [reviews, setReviews] = useState();

  const [statistics, setStatistics] = useState(null);

  const [reviewTitle, setReviewTitle] = useState("");

  const [comment, setComment] = useState("");

  const [rating, setRating] = useState(0);

  const [isSubmitReview, setIsSubmitReview] = useState(false);

  const [quantityToBuy, setQuantityToBuy] = useState(1);

  const [variantToBuy, setVariantToBuy] = useState();

  const handleChangeQuantityToBuy = (value) => {
    setQuantityToBuy(value);
    console.log("quantity to buy: ", quantityToBuy);
  };

  const getProductById = async (id) => {
    const product = await productAPI.getProductById(id);
    setProduct(product);
  }

  const getReviewsOfProduct = async (productId) => {
    const reviews = await productAPI.getReviewsOfProduct(productId);
    setReviews(reviews);
    getReviewStatistics(reviews);
  }

  const getReviewStatistics = (reviews) => {
    const ratings = reviews.map(review => review.rating);
    const ratingCounts = {};

    for (let rating of ratings) {
      if (ratingCounts[rating]) {
        ratingCounts[rating]++;
      } else {
        ratingCounts[rating] = 1;
      }
    }

    const totalCount = ratings.length;
    const ratingPercentages = {};

    for (let rating in ratingCounts) {
      const percentage = (ratingCounts[rating] / totalCount) * 100;
      ratingPercentages[rating] = percentage.toFixed(2);
    }

    setStatistics(ratingPercentages);
  }

  const handleSubmit = () => {
    setIsModalOpen(false);
    createProductReview(reviewTitle, comment, rating, product.id, 2);
    setReviewTitle('');
    setComment('');
    setRating(null);
    toast('Created review successfully', {
      position: 'top-right',
    });
    setIsSubmitReview(!isSubmitReview);
  };

  const createProductReview = async (review_title, review_content, rating, productId, userId) => {
    await productAPI.createProductReview(review_title, review_content, rating, productId, userId);
  }

  const checkVariantExistsInCart = async (cartId, variantId) => {
    let res = await cartAPI.checkVariantExistsInCart(cartId, variantId);
    return res.exists;
  }

  const createCartProduct = async (cartId, variantId, quantity) => {
    await cartAPI.createCartProduct(cartId, variantId, quantity);
  }

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const getVariantOptions = (variants) => {
    const optionsMap = {};

    variants.forEach(variant => {
      variant.Variant_values.forEach(value => {
        const optionName = value.Option.name;
        const optionValue = value.Option_value.value_name;

        if (!optionsMap[optionName]) {
          optionsMap[optionName] = [];
        }

        if (!optionsMap[optionName].includes(optionValue)) {
          optionsMap[optionName].push(optionValue);
        }
      });
    });

    return optionsMap;
  }


  const getPriceAndQuantity = (selectedOptions, Product_variants) => {
    console.log("option", selectedOptions, Product_variants);
    const selectedVariant = Product_variants.find(variant => {
      return variant.Variant_values.every(variantValue => {
        const { Option, Option_value } = variantValue;
        return selectedOptions[Option.name] === Option_value.value_name;
      });
    });

    if (selectedVariant) {
      setVariantToBuy(selectedVariant.id);
      console.log('variant to buy: ', variantToBuy);
      const { price, quantity, image } = selectedVariant;
      console.log("variant", selectedVariant);
      return { price, quantity, image };
    }

    // Return default values or handle the case when the selected variant is not found
    return { price: 0, quantity: 0, image: '' };
  }

  const handleAddToCart = async () => {
    let exists = await checkVariantExistsInCart(1, variantToBuy);
    console.log("exists: ", exists);
    if(!exists){
      console.log("chua co: ");
      createCartProduct(1, variantToBuy, quantityToBuy);
      toast('The product has been added to cart', {
        position: 'top-right',
      });
    }else{
      toast('Products already in the cart', {
        position: 'top-right',
      });
      console.log("co roi: ");
    }
  }

  const handleOptionChange = (optionName, optionValue) => {
    setSelectedOptions(prevOptions => ({
      ...prevOptions,
      [optionName]: optionValue
    }));
  };


  const formatCurrency = (amount) => {
    const options = {
      style: "currency",
      currency: "VND"
    };

    return amount.toLocaleString("vi-VN", options).replace("₫", "đ");
  }


  const productImgListSettings = {
    // className: '-mx-4',
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    draggable: false,
  };
  const relatedProductListSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    draggable: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const id = searchParams.get('id');

    getProductById(id);

    getReviewsOfProduct(id);

  }, [isSubmitReview]);

  useEffect(() => {

    if (product) {
      const test2 = getVariantOptions(product.Product_variants);
      setOptionNameList(test2);
      getPriceAndQuantity(selectedOptions, product.Product_variants);
    }

  }, [product]);

  useEffect(() => {
    if (product) {
      const { price, quantity, image } = getPriceAndQuantity(selectedOptions, product.Product_variants);
      setPrice(price);
      setQuantity(quantity);
      setCurrentImg(image);
    }

  }, [selectedOptions, product]);


  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Layout className="px-xl py-xxl">
      <Row gutter={[16, 16]}>
        <Col span={24} md={10}>
          <div className="pb-4">
            <img src={currentImg ? currentImg : product.Product_images[0].image} alt="product" width={'100%'} />
          </div>

          <Slider settings={productImgListSettings}>
            {product.Product_images.map((item, index) => (
              <img
                key={index}
                src={item.image}
                alt="product"
                className="px-4"
                onClick={(e) => {
                  if (e.target.src) setCurrentImg(e.target.src);
                }}
              />
            ))}
          </Slider>
        </Col>
        <Col span={24} md={14}>
          <Title level={2}>{product.product_name}</Title>
          {/* <Rate disabled defaultValue={4.5} allowHalf /> */}

          <div>

            {optionNameList &&
              Object.entries(optionNameList).map(([optionName, optionValues]) => (
                <React.Fragment key={optionName}>
                  <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", marginBottom: "10px" }}>
                    <h2 style={{ marginRight: '50px' }}>{optionName.toUpperCase()}</h2>
                    <Space style={{ marginLeft: 10 }}>
                      <Radio.Group
                        value={selectedOptions[optionName] || optionValues[0]}
                        onChange={e => handleOptionChange(optionName, e.target.value)}
                      >
                        {optionValues.map(optionValue => (
                          <Radio.Button
                            key={optionValue}
                            value={optionValue}
                            style={{ marginRight: '10px', borderRadius: 0 }}
                          >
                            {optionValue.toUpperCase()}
                          </Radio.Button>
                        ))}
                      </Radio.Group>
                    </Space>
                  </div>
                </React.Fragment>
              ))}

          </div>

          <div>
            {/* <Text delete className="text-3xl font-thin text-slate-500">
              $600
            </Text>{' '} */}
            <Text type="danger" strong className="text-3xl">
              {price !== 0 ? formatCurrency(price) : 'please chose other options'}
            </Text>
          </div>
          <Divider />
          <Space direction="vertical">
            <Space wrap>
              <Title className="m-0 me-6">Quantity</Title>
              <InputNumber
                min={1}
                max={99}
                defaultValue={1}
                onChange={(value) => {
                  if (value) {
                    setQuantityToBuy(value)
                    console.log("to buy", quantityToBuy);
                    // handleChangeQuantityToBuy(event.target.value)
                  }
                }}
                disabled={quantity === 0}
                size="large"
                className="!w-28"
              />

              <Title className="m-0 me-6">{quantity !== 0 ? quantity + ' products available' : 'out of stock'}</Title>
            </Space>

            <Space wrap>
              <Button type="primary" size="large" disabled={quantity === 0} onClick={handleAddToCart}>
                Add to cart
              </Button>
              <Button type="primary" danger size="large" disabled={quantity === 0}>
                Buy Now
              </Button>
            </Space>
          </Space>
        </Col>
      </Row>
      <Divider />
      <Title>Description</Title>
      <Paragraph>
        {product.description}
      </Paragraph>
      <Divider />
      <Row gutter={16} className="h-20px">
        <Col span={24} xl={12} className="pb-10">
          <Title className="mt-0">Customer Reviews</Title>
          <div className="m-1">
            <Space direction="vertical">

              {
                statistics &&
                <div>
                  {Object.entries(statistics).map(([rating, percentage]) => (
                    <div key={rating}>
                      <Rate disabled defaultValue={parseFloat(rating)} allowHalf className="pr-5" />
                      <Text type="danger" strong>
                        {percentage}%
                    </Text>
                    </div>
                  ))}
                </div>

              }

            </Space>
          </div>
          <div className="m-6">
            <Button
              type="primary"
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              {' '}
              Add your review
            </Button>
          </div>
        </Col>
        <Col span={24} xl={12} className="pb-10">
          <div className="h-72 overflow-y-scroll">
            {reviews && reviews.map((review) => (
              <Comment
                key={review.id}
                className="bg-transparent"
                author={<p>{review.User.fullname}</p>}
                avatar={
                  <Avatar src={review.User.avatar} alt="Han Solo" />
                }
                datetime={new Date(review.review_date).toLocaleString()}
                content={
                  <>
                    <Title level={5}>{review.review_title}</Title>
                    <p>{review.review_content}</p>
                    <Rate
                      disabled
                      defaultValue={review.rating}
                      // allowHalf
                      className="pr-5 size"
                    />
                  </>
                }
              />
            ))}
          </div>
        </Col>
      </Row>
      <Divider />
      {/* <div className="relatedProduct">
        <Title>RELATED PRODUCT</Title>
        <Slider settings={relatedProductListSettings}>
          {data.products.map((product) => (
            <NavLink to={`/product_detail?id=${product.id}`} key={product.id}>
              <ProductCard {...product} />
            </NavLink>
          ))}
        </Slider>
      </div> */}
      {isModalOpen ? (

        <Modal
          title="Add your review"
          visible={isModalOpen}
          // onOk={handleSubmit}
          onCancel={handleCancel}
          bodyStyle={{ textAlign: "center" }}
          cancelButtonProps={{ type: "default" }}
          footer={[
            <Button key="back" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={handleSubmit}
              disabled={reviewTitle === '' || comment === '' || rating === null}
            >
              Save
            </Button>
          ]}
        >
          <Rate
            style={{ fontSize: "2rem" }}
            value={rating}
            onChange={handleRatingChange}
          />
          <Input
            placeholder="Review title"
            value={reviewTitle}
            onChange={(e) => setReviewTitle(e.target.value)}
          />
          <TextArea
            showCount
            maxLength={100}
            style={{ height: 120, resize: "none" }}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Leave your comment"
          />
          {/* <Button type="primary" onClick={handleSubmit}>Save</Button>
          <ToastContainer /> */}
        </Modal>


      ) : (
          ''
        )}
    </Layout>
  );
}
