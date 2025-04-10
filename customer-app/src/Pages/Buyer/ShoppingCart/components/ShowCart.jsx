import { useEffect, useState } from "react";
import axios from "../../../../api/axios";
import useAxiosPrivate from "../../../../Hooks/useAxiosPrivate";
import { useDispatch } from "react-redux";
import { click } from "../../../../redux/features/isAddToCartSlice";
import { Checkbox } from "antd";

const getVariation = (skus) => {
  let result = "";
  if (skus.length === 0) {
    return null;
  }
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

const ShowCart = ({ productStore, setOrderStore, setCarts, carts }) => {
  const [store, setStore] = useState();
  const [inputQuantity, setInputQuantity] = useState(1);
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const getInfoStore = async (storeId) => {
    const res = await axios.get(`/store/getStoreById/${storeId}`);
    setStore(res.data);
  };
  //console.log(carts);
  useEffect(() => {
    let storeId = productStore.storeId;
    getInfoStore(storeId);
  }, []);

  const updateQuantity = async (quantity, productDetailId) => {
    try {
        const res = await axiosPrivate.put(`/cart/updateProductFromCart/${productDetailId}`, {quantity})
        // console.log(res.data);
    }   
    catch(err) {
        console.log(err);
    } 
  }

  const increment = async (e, id) => {
    e.preventDefault();
    for(const item of carts) {
        if(item.id === id) {
            try {
                const res = await updateQuantity(item.quantity + 1, item.productDetailId);
            }   
            catch(err) {
                console.log(err);
            } 
        }
    }
    setCarts((pre) => {
        return pre.map((item) => {
            if(item.id === id) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item;
        })
    })
  };

  const decrement = async (e, id) => {
    e.preventDefault();
    for(const item of carts) {
        if(item.id === id) {
            try {
                const res = await updateQuantity(item.quantity - 1, item.productDetailId);
            }   
            catch(err) {
                console.log(err);
            }  
        }
    }
    setCarts((pre) => {
        return pre.map((item) => {
            if(item.id === id) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item;
        })
    })
  };
  const handleQuantityChange = async (e, id) => {
    //console.log(id);
    const inputValue = e.target.value;
    const numericValue = parseInt(inputValue, 10);
    if (!isNaN(numericValue) && numericValue !== 0) {
        for(const item of carts) {
            if(item.id === id) {
                try {
                    let quantity = numericValue > item.product_detail.quantity ?
                    item.product_detail.quantity : numericValue
                    
                    const res = await updateQuantity(quantity, item.productDetailId);
                }   
                catch(err) {
                    console.log(err);
                } 
            }
        }
        setCarts((pre) => {
            return pre.map((item) => {
                if(item.id === id) {
                    let quantity = numericValue > item.product_detail.quantity ?
                    item.product_detail.quantity : numericValue
                    return {
                        ...item,
                        quantity
                    }
                }
                return item;
            })
        })
    }
  };
  const handleCheckboxChange = (e, id) => {
    // console.log(id);
    // console.log(e.target.checked);
    const updatedCard = carts.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          checked: !item.checked,
        };
      }
      return item;
    });
    setCarts(updatedCard);
    // if (carts != null) {
    //   handleTotalPrice();
    // }
  };

  const handleRemoveProductFromCart = async (e, id) => {
    e.preventDefault();
    try {
      const res = await axiosPrivate.delete(
        `/cart/removeProductFromCart/${id}`
      );
      setCarts((pre) => {
        return pre?.filter((item) => item.productDetailId !== id);
      });
      dispatch(click());
    } catch (error) {
      console.log(error);
    }
  };
  const formatCurrency = (amount) => {
    const options = {
      style: "currency",
      currency: "VND",
    };

    return amount.toLocaleString("vi-VN", options).replace("₫", "đ");
};
  return (
    <section className="border-[1px] space-y-3 mb-5 flex flex-col">
      <div>
        <div className="min-w-[60px]">{/* <CheckBox /> */}</div>
        <div className="w-full py-2 bg-blue-300">
          <p className="pl-2 text-[18px] font-bold text-[#FFFAF0]">{store && store.shop_name}</p>
        </div>
      </div>
      {productStore.order_store?.map((item, index) => (
        <section
          className="flex items-center py-4 px-5 border-b-[1px] border-[1px]"
          key={index}
        >
          <div className="min-w-[60px]">
             <Checkbox 
                onChange={(e) => handleCheckboxChange(e, item.id)} 
                checked={item.checked}
                color="primary"
                

            />
        </div>
          <div className="w-[48%]">
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <div className="border-[1px] w-[100px] h-[80px]">
                  <img
                    src={item.product_detail.image || item.product_detail.Product.image}
                    className="px-2 py-1 w-full h-full"
                    alt=""
                  />
                </div>
                <p className="ml-3 max-w-[140px] font-bold text-[16px]">
                  {item.product_detail.Product.product_name}
                </p>
              </div>
              <div className="">
                <p className="text-gray-500 text-[15px]">
                  Variation:
                  
                </p>
                <span>
                {getVariation(item.product_detail.skus_variation_options)
                    ? getVariation(item.product_detail.skus_variation_options)
                    : " No"}
                </span>
              </div>
            </div>
          </div>
          <div className="w-[14%]">
            <p className="text-center">{formatCurrency(item.product_detail.price)}</p>
          </div>
          <div className="w-[14%]">
            <div className="flex justify-center">
              <button
                disabled={item.quantity === 1}
                onClick={(e) => {
                  decrement(e, item.id);
                }}
                className="border-[1px] px-3 py-2 font-medium"
              >
                -
              </button>
              <input
                //onKeyDown={handleKeyPress}
                type="text"
                className="w-[70px] px-4 py-2 border-[1px] text-center"
                onChange={(e) => handleQuantityChange(e, item.id)}
                value={item.quantity}
                //onKeyPress={handleKeyPress}
              />
              <button
                onClick={(e) => {
                  increment(e, item.id);
                }}
                className="border-[1px] px-3 py-2"
              >
                +
              </button>
            </div>
          </div>
          <div className="w-[14%]">
            <p className="text-center text-red-150">
              {formatCurrency(item.product_detail.price * item.quantity)}
            </p>
          </div>
          <div className="">
            <button
              onClick={(e) =>
                handleRemoveProductFromCart(e, item.productDetailId)
              }
            >
              <span className="text-center hover:text-red-150">delete</span>
            </button>
          </div>
        </section>
      ))}
    </section>
  );
};

export default ShowCart;
