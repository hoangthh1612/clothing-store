import { useEffect, useState } from "react";
import axios from "../../../../api/axios";
import useAxiosPrivate from "../../../../Hooks/useAxiosPrivate";
import { useDispatch } from "react-redux";
import { click } from "../../../../redux/features/isAddToCartSlice";
import { Checkbox, Popover, Radio, Card, Select } from "antd";

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

const ProductsOrdered = ({ productStore, setOrderStore, address, setDeliveryCost }) => {
  const [store, setStore] = useState();
  const [numsSubItem, setNumsSubItem] = useState(0);
  const [vouchers, setVouchers] = useState();
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [selectedVoucherId, setSelectedVoucherId] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const [orderTotal, setOrderTotal] = useState(null);
  const [amountDiscount, setAmountDiscount] = useState();

  /////////////////////////////
  const [addressStore, setAddressStore] = useState("{}");
  const [inputAddress, setInputAddress] = useState("");

  const [provinceIdStore, setProvinceIdStore] = useState();
  const [districtIdStore, setDistrictIdStore] = useState();
  const [wardCodeStore, setWardCodeStore] = useState();

  const [provinceIdBuyer, setProvinceIdBuyer] = useState();
  const [districtIdBuyer, setDistrictIdBuyer] = useState();
  const [wardCodeBuyer, setWardCodeBuyer] = useState();
  const [fee, setFee] = useState({total:0});
  const [timeString, setTimeString] = useState("");
  const [timeDelivery, setTimeDelivery] = useState({
    leadtime: 1495159447834,
    order_date: ""
  });
  // const [typeService, setTypeService] = useState(53319);

  const axiosConfig3 = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        'token': '078e6330-a53c-11ee-b1d4-92b443b7a897',
    },
    params: {
      service_type_id: 2,
      // service_id: typeService,
      // service_id: 53319,
      insurance_value :500000,
      coupon: null,
      from_district_id :districtIdStore,
      to_district_id :districtIdBuyer,
      to_ward_code :wardCodeBuyer,
      height :15,
      length :15,
      weight :1000,
      width: 15
    }
  };

  const axiosConfig5 = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        'token': '078e6330-a53c-11ee-b1d4-92b443b7a897',
        'ShopID': 190690
    },
    params: {
      from_district_id: districtIdStore,
      from_ward_code: wardCodeStore,
      to_district_id :districtIdBuyer,
      to_ward_code : wardCodeBuyer,
      service_id: 53320,
      // service_id: typeService,
    }
  };

  function convertEpochToSpecificTimezone(timeEpoch){
    // Get individual date components
       var date = new Date(timeEpoch*1000);
       var year = date.getFullYear();
       var month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are zero-based
       var day = ("0" + date.getDate()).slice(-2);
       var hours = ("0" + date.getHours()).slice(-2);
       var minutes = ("0" + date.getMinutes()).slice(-2);
       var seconds = ("0" + date.getSeconds()).slice(-2);
       // Create a human-readable date string
       var humanReadableDate = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
       const rs = humanReadableDate.toString();
       setTimeString(rs);
 }

 const getTimeDelivery = () => {
  axios.get('https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/leadtime', axiosConfig5,
  )
  .then((res) => {
    const list11111 = res.data.data;
    // setListXa(list1111);    
    setTimeDelivery(res.data.data)
  }).then(()=>{
    // convertEpochToSpecificTimezone(timeDelivery.leadtime)
  })
  .catch((err) => {
    console.log("AXIOS ERROR: ", err);
  })
}

useEffect(()=>{
    convertEpochToSpecificTimezone(timeDelivery.leadtime);
}, [timeDelivery])

  useEffect(()=>{
    const rs = JSON.parse(addressStore)
    // setInputAddress(rs.detailAddress + ', ' + rs.wardName + ', ' + rs.districtName + ', ' + rs.provinceName);
    // setAddress2(rs.name + ', '+ rs.phone + ', ' +  rs.detailAddress + ', ' + rs.wardName + ', ' + rs.districtName + ', ' + rs.provinceName);
    setProvinceIdStore(rs.provinceId);
    setDistrictIdStore(rs.districtId);
    setWardCodeStore(rs.wardCode);
  }, [addressStore])

  useEffect(()=>{
    const rs = JSON.parse(address);
    setProvinceIdBuyer(rs.provinceId);
    setDistrictIdBuyer(rs.districtId);
    setWardCodeBuyer(rs.wardCode);

    // getFee();

  }, [address])


  const getFee = () => {
    axios.get('https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee', axiosConfig3,
 
    )
    .then((res) => {
      const list1111 = res.data.data;
      // setListXa(list1111);    
      setFee(res.data.data)
    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    })
  }
  /////////////////////////////

  const [open, setOpen] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const getInfoStore = async (storeId) => {
    const res = await axios.get(`/store/getStoreById/${storeId}`);
    setStore(res.data);
  };
  const getVouchersOfStore = async (storeId) => {
    try {
      const res = await axiosPrivate.get(
        `/voucher/getVoucherByStoreId/${storeId}`
      );
      setVouchers(res.data?.map((item) => ({ ...item, checked: false })));
    } catch (error) {
      console.log(error);
    }
  };

 
  useEffect(() => {
    let storeId = productStore.storeId;
    const doit = async () =>{
      await getInfoStore(productStore.storeId);
      await getFee();
    }

    doit();
    // getInfoStore(storeId);
    getVouchersOfStore(storeId);
  }, []);

  useEffect(() => {
    setNumsSubItem(productStore.order_store.length);
    setTotalPrice(productStore.total_price);
    setOrderTotal(productStore.total_price);
  }, []);

  useEffect(() => {
    if (selectedVoucher && orderTotal) {
      if (selectedVoucher.Amount_discount) {
        setAmountDiscount(selectedVoucher.Amount_discount.amount);
        setOrderTotal(totalPrice - selectedVoucher.Amount_discount.amount);
        return;
      }
      let amount_discount =
        totalPrice * (selectedVoucher.Percentage_discount.percent / 100);
      // console.log(amount_discount);
      let max_price = selectedVoucher.Percentage_discount.max_price;
      if (amount_discount > max_price) amount_discount = max_price;
      setAmountDiscount(amount_discount);
      setOrderTotal(totalPrice - amount_discount);
      return;
    }
    setOrderTotal(productStore.total_price);
  }, [selectedVoucher]);

  const formatCurrency = (amount) => {
    const options = {
      style: "currency",
      currency: "VND",
    };

    return amount.toLocaleString("vi-VN", options).replace("₫", "đ");
  };
  const handleCheckBox = (e, id) => {
    setVouchers((pre) => {
      return pre.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            checked: !item.checked,
          };
        }
        return {
          ...item,
          checked: false,
        };
      });
    });
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const handleOk = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  useEffect(() => {
    if (vouchers) {
      let result = null;
      for (const item of vouchers) {
        if (item.checked) {
          result = item;
          break;
        }
      }
      result ? setSelectedVoucher(result) : setSelectedVoucher(null);
    }
  }, [vouchers]);
  const content = (
    <div className="w-[400px] h-[500px]">
      <div className="block overflow-y-scroll space-y-5 pb-5 h-[70%]">
        {vouchers?.length === 0 && (
          <p className="text-center font-medium text-gray-400 text-[18px]">
            No shop vouchers yet
          </p>
        )}
        {vouchers &&
          vouchers?.map((item) => (
            <div key={item.id} className="flex flex-col">
              <div
                
                className={`flex border-[1px] h-[100px] ${orderTotal && orderTotal < item.minSpend ? 'bg-transparent' : "border-gray-300"}`}
              >
                <div className="h-full w-[25%] flex items-center border-r-[1px]">
                  <img
                    src={
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGsGVCEbcqOoBWx-0UqUqXYSXogRNqEuQh9w&usqp=CAU"
                    }
                    alt=""
                    className="w-full h-full"
                  />
                </div>
                <div className="flex flex-col border-r-[1px] h-full w-[65%] pl-2 space-y-3">
                  {item.Amount_discount ? (
                    <>
                      <p>
                        Amount: {formatCurrency(item.Amount_discount.amount)}
                      </p>
                    </>
                  ) : (
                    <div className="flex space-x-2">
                      <p>Percent: {item?.Percentage_discount?.percent}%</p>
                      <p>
                        Max price:{" "}
                        {formatCurrency(item?.Percentage_discount?.max_price)}
                      </p>
                    </div>
                  )}
                  <p>Min Spend: {formatCurrency(item.minSpend)}</p>
                  <p>
                    Expire time:{" "}
                    <span className="text-blue-400">
                      {new Date(item.end_time).toLocaleString()}
                    </span>
                  </p>
                </div>
                <div className="flex items-center justify-center w-[10%]">
                  {/* <Radio /> */}
                  <Checkbox
                    disabled={orderTotal && orderTotal < item.minSpend}
                    onChange={(e) => handleCheckBox(e, item.id)}
                    checked={item.checked}
                  />
                </div>
              </div>
              {orderTotal && orderTotal < item.minSpend && (
                <div className="h-[30px] bg-blue-100">
                  <p className="text-red-150 ml-3">Add {formatCurrency(item.minSpend - orderTotal)} more to use this voucher</p>
                </div>
              )}
            </div>
          ))}
      </div>
      <div className="border-t-[1px]">
        {amountDiscount && (
          <p>{`1 Voucher Selected: ${formatCurrency(amountDiscount)}`} </p>
        )}
      </div>
      <div className="flex justify-end space-x-2 py-2">
        <button
          className="border-[1px] px-3 py-1 border-red-150 rounded-md"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className="border-[1px] px-4 py-1 bg-blue-500 text-white rounded-md"
          onClick={handleOk}
        >
          OK
        </button>
      </div>
    </div>
  );
  useEffect(() => {
    orderTotal &&
      setOrderStore((pre) => {
        return pre?.map((item) => {
          if (item.storeId === productStore.storeId) {
            return {
              ...item,
              voucher_info: {
                orderTotal,
                voucherId: selectedVoucher ? selectedVoucher.id : null,
              },
            };
          }
          return item;
        });
      });
  }, [orderTotal]);


  useEffect(()=>{
    if(store){
      setAddressStore(store.address);
    }
}, [store])

// useEffect(()=>{

//   if(address){
//     getFee();
//   }
// }, [address])


useEffect(()=>{
  if(wardCodeBuyer){
    getFee();
    getTimeDelivery();
  }

}, [wardCodeBuyer, districtIdBuyer, provinceIdBuyer])

// useEffect(()=>{
//   getFee();
// }, [addressStore])


// useEffect(()=>{
//   getFee();
// }, [addressStore, address])

// useEffect(()=>{
//   if(addressStore){
//     getFee();
//   }
  
// }, [addressStore, address])


useEffect(()=>{
  if(addressStore){
    getFee();
    getTimeDelivery();
  }
  
}, [addressStore])


useEffect(()=>{
  if(fee){
    setDeliveryCost(fee);
  }
}, [fee])


// useEffect(()=>{
//   if(typeService){
//     getFee();
//     getTimeDelivery();
//   }
// }, [typeService])


// useEffect(()=>{
//   getFee();
// }, [])

// useEffect(()=>{
//   if(districtIdStore){
//     getFee();
//   }
  
// }, [districtIdStore, wardCodeStore])

//Khai báo biến để lưu trữ ID của timeout
// let timeoutId;

  return (
    <section className="border-[1px] mb-5 flex flex-col">
      <div>
        <div className="min-w-[60px] ">{/* <CheckBox /> */}</div>
        <div className="w-[full py-2 bg-blue-300">
          <p className="pl-2 text-[18px] font-bold text-[#FFFAF0]">
            {store && store.shop_name}
          </p>
        </div>
      </div>
      {productStore.order_store?.map((item, index) => (
        <section
          className="flex items-center py-4 px-5 border-b-[1px] border-[1px] mb-5"
          key={index}
        >
          {/* <div className="min-w-[60px]">
             <Checkbox 
                onChange={(e) => handleCheckboxChange(e, item.id)} 
                checked={item.checked}
                color="primary"
            />
        </div> */}
          <div className="w-[40%]">
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <div className="border-[1px] w-[100px] h-[80px]">
                  <img
                    src={item.product_detail.image || item.product_detail.Product.image}
                    className="px-2 py-1 w-full h-full"
                    alt=""
                  />
                </div>
                <p className="ml-3 max-w-[140px] font-bold text-[15px]">
                  {item.product_detail.Product.product_name}
                </p>
              </div>
              <div className="">
                <p className="text-gray-500 text-[15px]">Variation:</p>
                <span>
                  {getVariation(item.product_detail.skus_variation_options)
                    ? getVariation(item.product_detail.skus_variation_options)
                    : " No"}
                </span>
              </div>
            </div>
          </div>
          <div className="w-[20%]">
            <p className="text-center">
              {formatCurrency(item.product_detail.price)}
            </p>
          </div>
          <div className="w-[20%]">
            <div className="flex justify-center">{item.quantity}</div>
          </div>
          <div className="w-[20%]">
            <p className="text-right">
              {formatCurrency(item.product_detail.price * item.quantity)}
            </p>
          </div>
        </section>
      ))}
      <Card title="Đơn vị vận chuyển">
            <div className="font-sans text-lg">Loại vận chuyển:&nbsp; Tiêu chuẩn </div>
            <div className="font-sans text-lg">Phí vận chuyển:  &nbsp; {fee.total} đ</div>
            <div className="font-sans text-lg">Thời gian giao hàng ước tính: &nbsp;{timeString}</div>
        </Card> 
      {/* <div className="flex items-center justify-between h-[50px] border-[1px] px-5"> */}
      <div className="flex justify-between items-center h-[50px] border-[1px] px-5">
      
        <div className="font-semibold text-base flex-none w-120">Shop Voucher</div>
        {/* <div className="width-[80%]"></div> */}
        <div className="flex-initial w-40" >
          {amountDiscount && selectedVoucher && (
            <div className="mr-3">
              <p>{`-${formatCurrency(amountDiscount)}`}</p>
            </div>
          )}
          <Popover
            placement="bottom"
            content={content}
            open={open}
            title={`${store && store.shop_name} vouchers`}
            trigger="click"
            onOpenChange={handleOpenChange}
          >
            <button
              onClick={() => {
                setOpen(true);
              }}
              className="text-blue-400"
            >
              Select voucher
            </button>
          </Popover>
        </div>

        {/* <Card title="Delivery Information">
                  <div>Nguyễn Sinh Nhựt, 0337519077, thôn Huy Hoàng, xã Iarsuom, huyện KrongPa, tỉnh Gia Lai</div>
        </Card> */}
      </div>

      
      <div className="flex flex-col border-[1px] px-5 py-4">
        <div className="flex justify-end items-center">
          <p>{`Order Total (${
            numsSubItem === 1 ? `${numsSubItem} Item` : `${numsSubItem} Items`
          }):`}</p>
          {orderTotal && (
            <span className="text-red-150 ml-8">
              {formatCurrency(orderTotal)}
            </span>
          )}
        </div>
       
      </div>
    </section>
  );
};

export default ProductsOrdered;
