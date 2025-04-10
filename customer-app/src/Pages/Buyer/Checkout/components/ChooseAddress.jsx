'use client'

import { Button, Modal, Space } from "antd";
import { Input } from 'antd';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const ChooseAddressModal = ({
  isDetail,
  setIsDetail,
  setKeyDetail,
  keyDetail,
  infoProduct,
  address, 
  setAddress,
  address2,
  setAddress2,
  setName,
  setPhone
}) => {
 
  const [listProvince, setListProvince] = useState([]);
  const [provinceNow, setProvinceNow] = useState({ProvinceName: "Choose Province",
  ProvinceID: 202});
  const [listHuyen, setListHuyen] = useState([]);
  const [huyenNow, setHuyenNow] = useState({
    DistrictName:"Choose District",
    DistrictID:  3695,
    ProvinceID:  202
  });
  const [fee, setFee] = useState({
    total: 0
  });
  
  const [timeDelivery, setTimeDelivery] = useState({
    leadtime: 1495159447834,
    order_date: ""
  });
  
  const [timeString, setTimeString] = useState("");
  const [listXa, setListXa] = useState([{}]);
  const [xaNow, setXaNow]  = useState({
    WardCode: "1B1517",
    DistrictID: 1542,
    WardName: "Choose Ward"
  })

  const [detailAddress, setDetailAddress] = useState("");
  const [check, setCheck] = useState(false);
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [name1, setName1] = useState("");
  const [phone1, setPhone1] = useState("");

  const axiosConfig1 = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
          'token': '078e6330-a53c-11ee-b1d4-92b443b7a897',
      },
      params: {
        province_id: provinceNow.ProvinceID,
      }
    };
  
    axios.get('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province', axiosConfig1)
    .then((res) => {
      const list1 = res.data.data;
      setListProvince(list1);
    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    })
   
    const handleChoose = (province) => {
        setProvinceNow(province);
        setCheck(pre => !pre);
        setHuyenNow({
          DistrictName:"Choose District",
          // DistrictID:  3695,
          // ProvinceID:  202
        })

        setListHuyen([{}]);
  
        setXaNow({
          WardName:"Choose Ward",
          // ProvinceID:  202
          WardCode: "",
          // DistrictID: 33
        })
    }
  
    const handleChoose1 = (district) => {
      setHuyenNow(district);
      setCheck1(pre => !pre);
      setXaNow({
        WardName:"Choose Ward",
        // ProvinceID:  202
        WardCode: "",
        DistrictID: 33
      })
    }
  
    const handleChoose2 = (ward) => {
      setXaNow(ward);
      setCheck2(pre => !pre);
    }
  
    useEffect(()=>{
      getHuyen();
    }, [provinceNow])
  
    useEffect(()=>{
      getXa();
    }, [huyenNow])
  
    
  
    const getHuyen = () =>{
      axios.get('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district', axiosConfig1,
      )
      .then((res) => {
        const list11 = res.data.data;
        setListHuyen(list11);
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
    } 
  
    const axiosConfig2 = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
          'token': '078e6330-a53c-11ee-b1d4-92b443b7a897',
      },
      params: {
        district_id: huyenNow.DistrictID,
      }
    };
  
    const getXa = () => {
      axios.get('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward', axiosConfig2,
   
      )
      .then((res) => {
        const list111 = res.data.data;
        setListXa(list111);    
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
    }
  
  const handleInput = (e) =>{
        e.preventDefault();
        setDetailAddress(e.target.value);  
  }

  const handleInput2 = (e) =>{
    e.preventDefault();
    setName1(e.target.value);  
}

const handleInput3 = (e) =>{
    e.preventDefault();
    setPhone1( e.target.value);  
}
  
  const getAddressObject = () =>{
    const addr = {
      provinceName: provinceNow.ProvinceName,
      districtName: huyenNow.DistrictName,
      wardName: xaNow.WardName,
      detailAddress: detailAddress,
      provinceId: provinceNow.ProvinceID,
      districtId: huyenNow.DistrictID,
      wardCode: xaNow.WardCode,
    //   name: name,
    //   phone: phone
    }
    const addr1 = {
        provinceName: provinceNow.ProvinceName,
        districtName: huyenNow.DistrictName,
        wardName: xaNow.WardName,
        detailAddress: detailAddress,
        provinceId: provinceNow.ProvinceID,
        districtId: huyenNow.DistrictID,
        wardCode: xaNow.WardCode,
        name: name1,
        phone: phone1
      }
    const re = JSON.stringify(addr);
    const re1 = JSON.stringify(addr1);

    if(provinceNow.ProvinceName !== "Choose Province" && huyenNow.DistrictName !=="Choose District" && xaNow.WardName !== "Choose Ward" && name1 !=="" && phone1 !==""){
      setAddress(re);
      setAddress2(re1);
      // setName(name);
      setName(name1);
      setPhone(phone1)
    }
   
  }

  return (
<Modal
      open={isDetail}
      title="Choose Address"
      width="45%"
    //   footer={null}
      onCancel={() => {
        setKeyDetail(0);
        setIsDetail(false);
      }}
      onOk={()=>{
        getAddressObject();
        setIsDetail(false);
      }}
    >
      <>
            <div>
            <label id="listbox-label" className="block text-sm font-medium leading-6 text-gray-900"></label>
            <div className="relative mt-2">
                <button className="font-bold">Province:</button>
                <button onClick={()=>{
                setCheck(pre => !pre)
                }} type="button" className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-950 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">
                <span className="flex items-center">
                    <span className="ml-3 block truncate">{provinceNow.ProvinceName}</span>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                    <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clipRule="evenodd" />
                    </svg>
                </span>
                </button>
                {check? 
                <>
                <ul className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3">
                {listProvince.map((item, index)=>{
                return (
                        <>  
                            <li onClick={()=>{
                                handleChoose(item)
                                }} key={index} className="text-gray-950 relative cursor-default select-none py-2 pl-3 pr-9" id="listbox-option-0" role="option">
                                    <span className="font-normal ml-3 block truncate">{item.ProvinceName}</span>             
                                    {/* {item === provinceNow? 
                                        <>
                                            <span className="text-indigo-600 font-bold absolute inset-y-0 right-0 flex items-center pr-4">
                                                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                                                </svg>
                                            </span>
                                        </>   
                                    : 
                                        <>
                                            <span className="text-white invisible font-bold absolute inset-y-0 right-0 flex items-center pr-4">
                                                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                                                </svg>
                                            </span>
                                        </>
                                    } */}
                                    
                                </li>
                    
                        </>)
                })}
            
                </ul>   
                </> 
                :   
                <></>}
                    
                </div>
            </div>


            <div>
            <label id="listbox-label" className="block text-sm font-medium leading-6 text-gray-900"></label>
            <div className="relative mt-2">
                <button className="font-bold">District:</button>
                <button onClick={()=>{
                setCheck1(pre => !pre)
                }} type="button" className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-950 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">
                <span className="flex items-center">
                    <span className="ml-3 block truncate">{huyenNow.DistrictName}</span>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                    <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clipRule="evenodd" />
                    </svg>
                </span>
                </button>
                {check1 && provinceNow.ProvinceName !== "Choose Province"? 
                <>
                <ul className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3">
                {listHuyen.map((item, index)=>{
                return (
                        <>  
                            <li onClick={()=>{
                                handleChoose1(item)
                                }} key={index} className="text-gray-950 relative cursor-default select-none py-2 pl-3 pr-9" id="listbox-option-0" role="option">
                                    <span className="font-normal ml-3 block truncate">{item.DistrictName}</span>             
                                    {/* {item === huyenNow? 
                                        <>
                                            <span className="text-indigo-600 font-semibold absolute inset-y-0 right-0 flex items-center pr-4">
                                                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                                                </svg>
                                            </span>
                                        </>   
                                    : 
                                        <>
                                            <span className="text-white invisible font-normal absolute inset-y-0 right-0 flex items-center pr-4">
                                                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                                                </svg>
                                            </span>
                                        </>
                                    } */}
                                    
                                </li>
                        </>)
                })}
            
                </ul>
                
                </> 
                : 
                
                <></>}
                    
                </div>
            </div>

            <div>
            <label id="listbox-label" className="block text-sm font-medium leading-6 text-gray-900"></label>
            <div className="relative mt-2">
                <button className="font-bold">Ward:</button>
                <button onClick={()=>{
                setCheck2(pre => !pre)
                }} type="button" className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-950 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">
                <span className="flex items-center">
                    <span className="ml-3 block truncate">{xaNow.WardName}</span>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                    <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clipRule="evenodd" />
                    </svg>
                </span>
                </button>
                {check2 && provinceNow.ProvinceName !== "Choose Province" && huyenNow.DistrictName !== "Choose District"? 
                <>
                <ul className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3">
                {listXa.map((item, index)=>{
                return (
                        <>  
                            <li onClick={()=>{
                                handleChoose2(item)
                                }} key={index} className="text-gray-950 relative cursor-default select-none py-2 pl-3 pr-9" id="listbox-option-0" role="option">
                                    <span className="font-normal ml-3 block truncate">{item.WardName}</span>             
                                    {/* {item === xaNow? 
                                        <>
                                            <span className="text-indigo-600 font-semibold absolute inset-y-0 right-0 flex items-center pr-4">
                                                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                                                </svg>
                                            </span>
                                        </>   
                                    : 
                                        <>
                                            <span className="text-white invisible font-normal absolute inset-y-0 right-0 flex items-center pr-4">
                                                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                                                </svg>
                                            </span>
                                        </>
                                    } */}
                                    
                                </li>
                    
                        </>)
                })}
            
                </ul>
                
                </> 
                : 
                
                <></>}
                    

                </div>

              
            </div>

            <div>
            <label id="listbox-label" className="block text-sm font-medium leading-6 text-gray-900"></label>
            <div className="relative mt-2">    
                    <button className="font-bold">Address detail:</button>  
                <Input onChange={(e)=>{
                  handleInput(e)
                }} type="text" className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-950 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label" />
                            
                </div>    
            </div>

            <div>
            <label id="listbox-label" className="block text-sm font-medium leading-6 text-gray-900"></label>
            <div className="relative mt-2">    
                    <button className="font-bold">Fullname:</button>  
                <Input onChange={(e)=>{
                  handleInput2(e)
                }} type="text" className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-950 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label" />
                            
                </div>    
            </div>

            <div>
            <label id="listbox-label" className="block text-sm font-medium leading-6 text-gray-900"></label>
            <div className="relative mt-2">    
                    <button className="font-bold">Phone number:</button>  
                <Input onChange={(e)=>{
                  handleInput3(e)
                }} type="text" className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-950 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label" />
                            
                </div>    
            </div>



  
</>
</Modal>
  );
};


export default ChooseAddressModal;
