import { Card, Rate } from 'antd';
import { Typography } from 'antd';
import { useEffect, useState } from 'react';
const { Title, Text } = Typography;
const { Meta } = Card;

const formatCurrency = (amount) => {
  const options = {
    style: "currency",
    currency: "VND"
  };

  return amount.toLocaleString("vi-VN", options).replace("₫", "đ");
}

const formatNumber = (amount) => {
  const options = {
    style: "currency",
    currency: "VND"
  };

  return amount.toLocaleString("vi-VN", options).replace("₫", "");
}

// const getPriceRange = (product_details) => {
//   let listPrices = product_details?.map((item) => item.price);
//   let max = Math.max(...listPrices);
//   let min = Math.min(...listPrices);
//   if (max === min) return `${formatCurrency(min)}`;
//   return `${formatNumber(min)}- ${formatCurrency(max)}`;
// };
function areObjectsEqual(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1?.length !== keys2?.length) {
    return false;
  }

  for (let key of keys1) {
    if (!keys2?.includes(key) || obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
}




// function ProductCardNew({ ProductCardNew_images, star, product_name, inStock, Product_variants, currency }) {
  function ProductCard({product}) {
    const [numOfReview, setNumOfReview] = useState();
    const [rangePrice, setRangePrice] = useState();
    const [productDetails, setProductDetails] = useState([]);
    const [productName, setProductName] = useState('');
    console.log(product);
    
    useEffect(() => {
      let product_details = product?.product_details?.map((item) => {
          const variation_options = item.skus_variation_options?.map((i) => {
            return {
              variation_name: i.variation_options.variation_name,
              option: i.variation_options.type_value
            }
            
          })
          return {
            id: item.id,
            quantity: item.quantity,
            price: item.price,
            variation_options 
          }
        })
      setProductDetails(product_details);
      //product && setRangePrice(getPriceRange(product.product_details));
      if(product) {
        let name = product.product_name;
        
        if(name?.length > 30) {
          let product_name = name.slice(0, 30) + '...';
          setProductName(product_name);
        }
        else {
          setProductName(name);
        }
      }
    }, [product])

    // useEffect(() => {
    //   const getNumOfReview = async () => {
    //     try {
    //       const res = await axios.get(`/product-review/numOfReview/${product.id}`);
    //       setNumOfReview(res.data);
    //     } catch (error) {
    //       console.log(error);  
    //     }
    //   }
    //   getNumOfReview();
    // }, [])
  return (
    // <div>
    //   Product Card
    // </div>
    <Card
      hoverable
      style={{ width: "90%", height: "96%" }}
      
      cover={
        <img alt="example" 
        src={product.image} 
        className='h-[200px] object-cover border-[1px] border-collapse'
        loading="lazy" />}
        
    >
      <div align="center">
        <div className='max-h-[50px] h-[50px]'>
          <Title level={window.screen.width > 576 ? 5 : 5}>{productName}</Title>
        </div>
        <div>
          {
            numOfReview && (
              <Rate
                disabled
                defaultValue={parseFloat(numOfReview.rating)}
                allowHalf
                style={{ fontSize: window.screen.width > 576 ? 14 : 10 }}
              />
            )
          }
        </div>
        <div>
          <Text type="danger" strong>{rangePrice}</Text>
          
        </div>
      </div>
    </Card>
  );
}

export default ProductCard;
