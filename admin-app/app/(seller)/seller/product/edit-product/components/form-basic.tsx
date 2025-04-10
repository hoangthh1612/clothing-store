import axios from "@/api/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircularProgress } from "@mui/material";
import { message } from "antd";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

type PropsType = {
  isEditBasicInfoProduct: any;
  setIsEditBasicInfoProduct: any;
  product: any;
  setProduct: any;
};
type MyFormValues = {
  image: string;
  product_name: string;
  description: string;
};

const FormBasic = ({
  isEditBasicInfoProduct,
  setIsEditBasicInfoProduct,
  product,
  setProduct,
}: PropsType) => {
  const [image, setImage] = useState<any>(null);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [urlImage, setUrlImage] = useState<any>();
  const [isLoadingImage, setIsLoadingImage] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Edit basic product successfully',
    });
  };
  const validateBasicInfo = z.object({
    image: z.string(),
    product_name: z.string().nonempty({ message: "Product is required" }),
    description: z.string().nonempty({ message: "Description is required" }),
  });
  const form = useForm<MyFormValues>({
    resolver: zodResolver(validateBasicInfo),
    mode: "all",
  });
  const {
    handleSubmit,
    register,
    formState,
    getValues,
    watch,
    setValue,
    setError,
    control,
  } = form;
  const { errors, isLoading, isSubmitted } = formState;
  
  useEffect(() => {
    product && setValue("image", product.image);
    product && setImagePreview(product.image);
    product && setValue("product_name", product.product_name);
    product && setValue("description", product.description);
  }, [product]);

  const handleCancelBasicInfo = (e: any) => {
    e.preventDefault();
    setIsEditBasicInfoProduct(false);
    setValue("image", product.image);
    setValue("product_name", product.product_name);
    setValue("description", product.description);
  };

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
  const handleSubmitBasicInfo = async (values: MyFormValues) => {
    console.log(values);

    try {
      
      const res = await axios.put(
        `/product/updateProductByProductId/${product.id}`,
        values,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setProduct((pre: any) => ({
        ...pre,
        image: values.image,
        product_name: values.product_name,
        description: values.description,
      }));
      success();
      setTimeout(() => {
        setIsEditBasicInfoProduct(false);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitBasicInfo)}>
      <div className="md:flex mb-5">
        <div className="md:w-1/5">
          <p className="font-bold">Image</p>
        </div>
        <div className="md:w-4/5">
          <Controller
            control={control}
            name={`image`}
            render={({ field: { onBlur, value } }) => (
              <div className="w-[100px] h-[80px] border-[1px] border-dashed border-gray-300 flex flex-col items-center justify-center relative">
                {!isEditBasicInfoProduct ? (
                  <>
                    {
                      product && <img src={product.image} alt="Image Product" className="w-full h-full object-cover" />
                    }
                  </>
                ) : (
                  <>
                    {isLoadingImage && (
                      <div>
                        <CircularProgress size={25} />
                      </div>
                    )}
                    {!isLoadingImage && (
                      <>
                        {imagePreview && <img src={imagePreview} />}
                        <input
                          type="file"
                          hidden
                          accept="image/png, image/jpeg"
                          id="image-upload"
                          onChange={validateImg}
                          onBlur={onBlur}
                        />
                        <label
                          htmlFor="image-upload"
                          className="cursor-pointer absolute image-upload-label"
                        >
                          <i className="add-picture-icon">+</i>
                        </label>
                      </>
                    )}
                  </>
                )}
              </div>
            )}
          />

          {errors?.image?.message && (
            <p className="text-red-400">{errors?.image?.message}</p>
          )}
        </div>
      </div>
      <div className="md:flex mb-5">
        <div className="md:w-1/5">
          <label className="font-bold" htmlFor={`basic_info.product_name`}>
            Product name
          </label>
        </div>
        <div className="md:w-2/5">
          <input
            // name={`basic_info.product_name`}
            disabled={!isEditBasicInfoProduct}
            className="w-full px-2 py-1 bg-transparent appearance-none border-[1px] border-gray-500 rounded-[6px] focus:outline-none focus:bg-white focus:border-blue-400"
            type="text"
            id={`basic_info.product_name`}
            {...register("product_name")}
            //   {...register("basic_info.product_name")}
          />
          {errors?.product_name?.message && (
            <p className="text-red-400">{errors.product_name.message}</p>
          )}
        </div>
      </div>
      <div className="md:flex mb-5">
        <div className="md:w-1/5">
          <label className="font-bold" htmlFor={`description`}>
            Description
          </label>
        </div>
        <div className="md:w-4/5 flex items-center space-x-1">
          <textarea
            disabled={!isEditBasicInfoProduct}
            className="w-full min-h-[120px] px-2 pl-1 pb-6  bg-transparent appearance-none border-[1px] border-gray-500 rounded-[6px] focus:outline-none focus:bg-white focus:border-blue-400"
            id={`description`}
            {...register("description")}
          />
        </div>
      </div>
      {contextHolder}
      {isEditBasicInfoProduct && (
        <div className="flex space-x-5 ml-[20%]">
          
          <button
            //onClick={handleSubmitBasicInfo}
            className="px-3 py-1 min-w-[80px] bg-blue-400 hover:bg-blue-500 rounded-md"
          >
            Save
          </button>
          <button
            onClick={handleCancelBasicInfo}
            className="px-3 py-1 min-w-[80px] border-[1px] bg-red-400 rounded-md"
          >
            Cancel
          </button>
        </div>
      )}
    </form>
  );
};

export default FormBasic;
