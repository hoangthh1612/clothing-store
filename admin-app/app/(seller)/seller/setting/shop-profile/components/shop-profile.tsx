"use client";

import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { CircularProgress } from "@mui/material";
import { Button, Form, Input, Typography, Upload, message } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";


const ShopProfile = () => {
  const { Text, Title } = Typography;
  const [isEditing, setIsEditing] = useState(false);
  const [store, setStore] = useState<any>();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [image, setImage] = useState<any>(null);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const axiosPrivate = useAxiosPrivate();
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [urlImage, setUrlImage] = useState<any>();
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Update shop profile successfully',
    });
  };
  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleCancel = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    const getStore = async () => {
      const res = await axiosPrivate.get("/store/getStoreByUsername");
      setStore(res.data);
      setName(res.data.shop_name);
      setDescription(res.data.description);
      setImagePreview(res.data.avatar);
    };
    getStore();
  }, [isSubmitSuccess]);

  const uploadImage = async (image: any) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "qgxrg9uu");
    try {
      setUploadingImg(true);
      let res = await fetch(
        "http://api.cloudinary.com/v1_1/hoangthh1612/image/upload",
        {
          method: "post",
          body: data,
        }
      );
      const urlData = await res.json();
      setUploadingImg(false);
      return urlData.url;
    } catch (err) {
      setUploadingImg(false);
      console.log(err);
    }
  };
  const validateImg = async (e: any) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
   

    try {
      setIsLoadingImage(true);
      const url = await uploadImage(e.target.files[0]);

      url && setUrlImage(url);
      url && setIsLoadingImage(false);
    } catch (error) {
      console.log(error);
    }
  };
 
  
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    const values = {shop_name: name, description, avatar: urlImage}
    console.log(values);
    try {
      const res = await axiosPrivate.put('/store/updateStore', values);
      success();
      setTimeout(() => {
        setIsEditing(false);
        setIsSubmitSuccess(true);
      }, 1000);
    
    } catch (error) {
      console.log(error);
      
    }
  }

  const EditButtonUI = (
    <div className="flex flex-none">
      {/* <div className="mr-3">
        <button
          type="button"
          className="bg-transparent outline outline-2 outline-gray-300  py-0.5 px-4 rounded"
        >
          My shop
        </button>
      </div> */}
      <div className="mr-2">
        <button
          onClick={handleEdit}
          type="button"
          className="bg-transparent outline outline-2 outline-gray-300 py-0.5 px-4 rounded"
        >
          Edit
        </button>
      </div>
    </div>
  );
  console.log(isEditing);
  return (
    <>
      <div className="bg-white shop-profile">
        {/* <div className="px-5 pt-5">
          <p className="text-2xl font-bold text-blue-400">Shop profile</p>
        </div> */}
        <div>
          <div className="flex px-5 pt-5 mb-6">
            <p className="flex-1 text-2xl text-slate-600 font-bold">
              Shop infomation
            </p>
            {!isEditing ? EditButtonUI : <></>}
          </div>

          {!isEditing ? (
            <div className="px-16 py-5">
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/5">
                  <p className="block font-bold md:text-left mb-1 md:mb-0 pr-4">
                    Shop name
                  </p>
                </div>
                <div className="md:w-4/6">
                  <p className="">{store && store.shop_name}</p>
                </div>
              </div>
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/5">
                  <p className="block font-bold md:text-left mb-1 md:mb-0 pr-4">
                    Shop logo
                  </p>
                </div>
                <div className="md:w-4/6">
                  {store && (
                    <img
                      className="border-[1px] w-[100px] h-[100px] border-gray-600 rounded-[50%] object-cover"
                      src={`${store.avatar}`}
                      // width="80"
                      // height="80"
                      alt="Shop-logo"
                    />
                    // <></>
                  )}
                </div>
              </div>
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/5">
                  <p className="block font-bold md:text-left mb-1 md:mb-0 pr-4">
                    Shop Description
                  </p>
                </div>
                <div className="md:w-4/6">
                  <p>{store && store.description}</p>
                </div>
              </div>
            </div>
          ) : (
            <form className="px-16 py-5">
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/5">
                  <label
                    className="block font-bold md:text-left mb-1 md:mb-0 pr-4"
                    htmlFor="inline-full-name"
                  >
                    Shop name
                  </label>
                </div>
                <div className="md:w-4/6">
                  <input
                    value={name}
                    name="shop_name"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    className="w-full px-2 py-1 bg-transparent appearance-none border-[1px] border-gray-500 rounded-[6px] focus:outline-none focus:bg-white focus:border-blue-400"
                    id="inline-full-name"
                    type="text"
                  />
                </div>
              </div>
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/5">
                  <label
                    className="block font-bold md:text-left mb-1 md:mb-0 pr-4"
                    htmlFor="shop-logo"
                  >
                    Shop Logo
                  </label>
                </div>
                <div className="md:w-4/6">
                  <div className="w-[100px] h-[100px] border-[1px] border-dashed rounded-[50%] border-gray-300 flex flex-col items-center justify-center relative">
                    {isLoadingImage && (
                      <div>
                        <CircularProgress size={25} />
                      </div>
                    )}
                    {
                      !isLoadingImage && (
                        <>
                          {imagePreview && (
                          <img
                            className="w-[100px] h-[100px] rounded-[50%] object-cover"
                            src={imagePreview}
                            />
                          )}
                          <input
                            type="file"
                            hidden
                            accept="image/png, image/jpeg"
                            id="image-upload"
                            onChange={validateImg}
                          />
                          <label
                            htmlFor="image-upload"
                            className="cursor-pointer absolute image-upload-label"
                          >
                            <i className="add-picture-icon">+</i>
                          </label>
                        </>
                      )
                    }
                  </div>
                </div>
              </div>
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/5">
                  <label
                    className="block font-bold md:text-left mb-1 md:mb-0 pr-4"
                    htmlFor="shop-description"
                  >
                    Shop Description
                  </label>
                </div>
                <div className="md:w-4/6">
                  <textarea
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    name="description"
                    className="w-full px-2 py-1 bg-transparent appearance-none border-[1px] border-gray-500 rounded-[6px] focus:outline-none focus:bg-white focus:border-blue-400"
                    id="shop-description"
                  />
                </div>
              </div>
              {contextHolder}
              <div className="ml-[20%] flex space-x-5">
                <button
                  onClick={handleSubmit}
                  className="min-w-[100px] bg-blue-400 border-[1px] hover:bg-blue-500  px-3 py-1 rounded-[8px]"
                  type="button"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="min-w-[100px] border-[1px] bg-red-400 hover:border-red-500 px-2 py-1 rounded-[8px] text-white"
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};
//   return (
//     <>
//       <div className="bg-white shop-profile">
//         <div className="px-5 pt-5">
//           <Title level={3}>Shop profile</Title>
//         </div>
//         <div>
//           <div className="flex px-5 pt-5 mb-6">
//             <Title className="flex-1" level={4}>
//               Shop infomation
//             </Title>
//             {!isEditing ? EditButtonUI : <></>}
//           </div>

//           <form className="px-16 py-5">
//             <div className="md:flex md:items-center mb-6">
//               <div className="md:w-1/5">
//                 <label
//                   className="block font-bold md:text-left mb-1 md:mb-0 pr-4"
//                   htmlFor="inline-full-name"
//                 >
//                   Shop name
//                 </label>
//               </div>
//               <div className="md:w-4/6">
//                 {!isEditing ? (
//                   <Text>{store && store.shop_name}</Text>
//                 ) : (
//                   <input
//                     defaultValue={store && store.shop_name}
//                     className="bg-transparent appearance-none border-[1px] border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
//                     id="inline-full-name"
//                     type="text"
//                   />
//                 )}
//               </div>
//             </div>
//             <div className="md:flex md:items-center mb-6">
//               <div className="md:w-1/5">
//                 <label
//                   className="block font-bold md:text-left mb-1 md:mb-0 pr-4"
//                   htmlFor="shop-logo"
//                 >
//                   Shop Logo
//               </label>
//               </div>
//               <div className="md:w-4/6">
//                 {!isEditing ? (
//                   store && <Image className="border-[1px] border-gray-600 rounded-full me-xl object-cover" src={`${store.avatar}`} width="80" height="80" alt="Shop-logo" />
//                 ) : (
//                   <input
//                     className="bg-transparent appearance-none border-[1px] border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
//                     id="shop-logo"
//                     type="text"
//                   />
//                 )}
//               </div>
//             </div>
//             <div className="md:flex md:items-center mb-6">
//               <div className="md:w-1/5">
//                 <label
//                   className="block font-bold md:text-left mb-1 md:mb-0 pr-4"
//                   htmlFor="shop-description"
//                 >
//                   Shop Description
//                 </label>
//               </div>
//               <div className="md:w-4/6">
//                 {!isEditing ? (
//                   <Text>{store && store.description}</Text>
//                 ) : (
//                   <textarea
//                     defaultValue={store && store.description}
//                     className="bg-transparent appearance-none border-[1px] border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
//                     id="shop-description"
//                   />
//                 )}
//               </div>
//             </div>

//             {!isEditing ? (
//               <></>
//             ) : (
//               <div className="md:flex md:items-center md:justify-evenly">
//                 <button
//                   className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-1 px-4 rounded"
//                   type="button"
//                 >
//                   Save
//                 </button>
//                 <button
//                   onClick={handleCancel}
//                   className="outline outline-2 outline-red-500 text-red-500 py-1 px-4 rounded"
//                   type="button"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             )}
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

export default ShopProfile;
