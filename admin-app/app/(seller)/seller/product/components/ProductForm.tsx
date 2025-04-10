"use client";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { Add, DeleteOutline, LocalDiningOutlined } from "@mui/icons-material";
import getAllCategory from "@/api/category/get-all";
import axios from "@/api/axios";
import PreviewImage from "./previewImage";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useRouter } from "next/navigation";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Fields from "../all/components/fieldArray";
import CombineVariation from "../all/components/combineVariation";
import { Modal, message } from "antd";
import { CircularProgress } from "@mui/material";
import { LoadingOutlined } from "@ant-design/icons"
import LoadingOverlay from "@/app/(seller)/components/loading/LoadingOverlay";
import AttributeForm from "./attribute";
import ProductVariant from "./Variant";
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

type BasicInfo = {
  imageUrl: string;
  productName: string;
  categoryName: string;
  description: string;
  brand?: string;
};
type Variant = {
    imageUrl: string;
    price: number;
    stock: number;
    variantAttributes: AttributeValue[];
}
type VariantAttribute = {
  attribute: Attribute;
  attributeValue: AttributeValue;
}
type Attribute = {
  id: number;
  attributeName: string;
};
type AttributeValue = {
  id: number;
  valueName: string;
};


type AttributeType = {
  id: number
  attributeName: string;
  attributeValues: AttributeValue[];
}
type MyFormValues = {
  basicInfo: BasicInfo;
  saleInfo: {
    price: number | undefined;
    stock: number | undefined;
    attributes: AttributeType[];
    variants: Variant[];
  };
};

type CategoryType = {
  id: number,
  categoryName: string
}

const ProductForm = () => {
  const router = useRouter();
  const axiosPrivate = useAxiosPrivate();
  const [isVariation, setIsVariation] = useState(false);
  const [isShowTable, setIsShowTable] = useState(false);
  const [image, setImage] = useState<any>(null);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [urlImage, setUrlImage] = useState<any>();
  const [err, setErr] = useState<any>(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [isOpenCancel, setIsOpenCancel] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  console.log(isLoadingImage);

  function checkDuplicate(arr: any) {
    // empty object
    let map = {} as any;
    let result = false;
    for (let i = 0; i < arr.length; i++) {
      // check if object contains entry with this element as key
      if (map[arr[i]?.name]) {
        result = true;
        // terminate the loop
        break;
      }
      // add entry in object with the element as key
      map[arr[i]?.name] = true;
    }
    return result ? true : false;
  }

  useEffect(() => {
    urlImage && setValue("basicInfo.imageUrl", urlImage);
  }, [urlImage]);
  console.log(urlImage);

  let zodValidateOption = !isVariation
    ? z.object({
      price: z.coerce
        .number()
        .int({ message: "Price is required" })
        //.positive()
        .gte(1000, { message: "Price must be more than 1000 VND" })
        .lte(100000000, {
          message: "Price must be less than 100.000.000 VND",
        }),
      stock: z.coerce
        .number()
        .int({ message: "stock is required" })
        .gte(0, { message: "Product stock must be >= 0" }),
    })
    : z.object({
      attributes: z
        .array(
          z.object({
            id: z.number(),
            attributeName: z.string(),
            attributeValues: z.array(
              z.object({
                id: z.number(),
                valueName: z.string()
              })
            ),
          })
        ),
      variants: z.array(
        z.object({
          variantAttributes: z.array(
            z.object({
              id: z.number(),
              valueName: z.string()
            })
          ),
          imageUrl: z.string(),
          price: z.coerce
            .number()
            .int({ message: "Price is required" })
            .gte(1000, { message: "Price must be more than 1000 VND" })
            .lte(100000000, {
              message: "Price must be less than 100.000.000 VND",
            }),
          stock: z.coerce
            .number()
            .int({ message: "stock is required" })
            .gte(0, { message: "Product stock must be >= 0" }),
        })
      ),
    });

  const validate = z.object({
    basicInfo: z.object({
      imageUrl: z.coerce.string().nonempty({ message: "Image is required" }),
      productName: z
        .string()
        .nonempty({ message: "Product name is required" })
        .min(5, { message: "Product name must be at least 5 characters" }),

      categoryName: z.string().nonempty("Category is required"),
      description: z
        .string()
        .nonempty({ message: "Description is required" })
        .min(50, { message: "Description must be at least 50 characters" }),
      brand: z.string(),
    }),
    saleInfo: zodValidateOption,
  });

  const onVariation = (e: any) => {
    e.preventDefault();
    setIsVariation(true);
    // const {saleInfo} = values;
    // let {attributes} = saleInfo;
    setValue("saleInfo.attributes", [
      {
        id: 0,
        attributeName: "",
        attributeValues: [],
      }
    ]);
  };

  const form = useForm<MyFormValues>({
    resolver: zodResolver(validate),
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
  const { errors } = formState;

  const [combinations, setCombinations] = useState<any>();

  function generateVariants(arr: any) {
    if(arr.length === 0) return [];
    return arr.reduce((acc: any, curr: any) => {
      const res = [];
      for(const a of acc) {
        for(const b of curr) {
          res.push([...a, b]);
        }
      }
      return res;
      //return acc.flatMap(a => curr.map(b => [...a, b]));
    }, [[]])
  }
  console.log(isLoading);

  const attributes = useWatch({ control, name: "saleInfo.attributes" });

  console.log(attributes);
  

  useEffect(() => {
    if (attributes) {
      let options = attributes?.map((attr: AttributeType) =>
        attr.attributeValues?.map((val: AttributeValue) => ({id: val.id, valueName: val.valueName}))
      );
      console.log(options);
      
      const combinations = generateVariants(options);
      console.log(combinations);
      setCombinations(combinations);
    }
  }, [attributes]);
  console.log(isSubmitted);

  const onSubmit = async (values: any) => {
    const { basicInfo, saleInfo } = values;
    const outputValues = {
      basicInfo: { ...basicInfo },
      saleInfo: saleInfo,
    };
    console.log(outputValues);
    setIsSubmitted(true);
    setIsLoading(true);
       try {
        await new Promise(resolse => setTimeout(resolse, 1500));
        await axiosPrivate.post("/cms-product/create-product", outputValues);
        //success();
        setIsSuccess(true);
        setIsSubmitted(false);
        
      } catch (err: any) {
        console.log(err);

        setErr(err.response.data.message);
      }
      finally {
        setIsLoading(false);
        setTimeout(() => {
          setIsSuccess(false);
          router.push("/seller/product/all");
        }, 500);
      }


    // if (!isVariation) {
    //   try {
    //     await new Promise((resolse) => setTimeout(resolse, 1500));
    //     const res = await axiosPrivate.post("/product/add_item", outputValues);
    //     //success();
    //     setIsSuccess(true);
    //     setIsSubmitted(false);

    //   } catch (err: any) {
    //     console.log(err);

    //     setErr(err.response.data.message);
    //   } finally {
    //     setIsLoading(false);
    //     setTimeout(() => {
    //       setIsSuccess(false);
    //       router.push("/seller/product/all");
    //     }, 500);
    //   }
    // } else {
    //   try {
    //     await new Promise(resolse => setTimeout(resolse, 1500));
    //     await axiosPrivate.post("/product/add_product_variation", outputValues);
    //     //success();
    //     setIsSuccess(true);
    //     setIsSubmitted(false);
    //     // setTimeout(() => {
    //     //   router.push("/seller/product/all");
    //     // }, 100);
    //   } catch (err: any) {
    //     console.log(err);

    //     setErr(err.response.data.message);
    //   }
    //   finally {
    //     setIsLoading(false);
    //     setTimeout(() => {
    //       setIsSuccess(false);
    //       router.push("/seller/product/all");
    //     }, 500);
    //   }
    // }
  };

  const handleCancel = (e: any) => {
    e.preventDefault();
    setIsOpenCancel(true);

  }

  const [categories, setCategories] = useState<CategoryType[] | null>([]);


  const getAll = async () => {
    const res = await axiosPrivate.get('/cms-category/getAll');
    //const res = await getAllCategory();
    setCategories(res.data);
  };
  useEffect(() => {
    getAll();
  }, []);
  const [attributeInfo, setAttributeInfo] = useState<AttributeType[] | []>([]);
  const getAttributes = async () => {
    //const res = await axios.get('/attribute');
    const res = await axiosPrivate.get("/cms-attribute/getAll");
    setAttributeInfo(res.data);
  };
  useEffect(() => {
    getAttributes();
  }, []);
  console.log(attributeInfo);



  const fileRef = useRef<HTMLInputElement>(null);
  return (
    <div className="bg-white mx-36 px-7 py-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-10">
          <p className="text-slate-600 font-bold text-2xl">Basic infomation</p>
        </div>
        <div className="ml-10">
          <div className="md:flex mb-5">
            <div className="md:w-1/5">
              <p className="font-bold">Image</p>
            </div>
            <div className="md:w-3/5">
              <Controller
                control={control}
                name={`basicInfo.imageUrl`}
                render={({ field: { onBlur, value } }) => (
                  <div className="w-[100px] h-[80px] border-[1px] border-dashed border-gray-300 flex flex-col items-center justify-center relative">
                    {isLoadingImage && (
                      <div>
                        <CircularProgress size={25} />
                      </div>
                    )}
                    {!isLoadingImage && (
                      <>
                        {imagePreview && <img src={imagePreview} className="w-full h-full object-cover" />}
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
                  </div>
                )}
              />

              {errors.basicInfo?.imageUrl?.message && (
                <p className="text-red-400">
                  {errors.basicInfo?.imageUrl?.message}
                </p>
              )}
            </div>
          </div>

          <div className="md:flex mb-5">
            <div className="md:w-1/5">
              <label className="font-bold" htmlFor={`basicInfo.productName`}>Product name</label>
            </div>
            <div className="md:w-4/5">
              <input
                // name={`basicInfo.productName`}
                className="w-full px-2 py-1 bg-transparent appearance-none border-[1px] border-gray-500 rounded-[6px] focus:outline-none focus:bg-white focus:border-blue-400"
                type="text"
                id={`basicInfo.productName`}
                {...register("basicInfo.productName")}
              />
              {errors.basicInfo?.productName && (
                <p className="text-red-400">
                  {errors.basicInfo?.productName.message}
                </p>
              )}
            </div>
          </div>
          <div className="md:flex mb-5">
            <div className="md:w-1/5">
              <label className="font-bold" htmlFor={`basicInfo.categoryName`}>Category</label>
            </div>
            <div className="md:w-4/5">
              <select
                className="w-full px-2 py-1 bg-transparent border-[1px] border-gray-500 rounded-[6px] focus:outline-none focus:bg-white focus:border-blue-400"
                id={`basicInfo.categoryName`}
                {...register("basicInfo.categoryName")}
              >
                <option key="" value="">
                  --Choose a category--
                </option>
                {categories?.map((category: any, index: number) => (
                  <option key={category.id} value={category.categoryName}>
                    {category.categoryName}
                  </option>
                ))}
              </select>

              {errors.basicInfo?.categoryName && (
                <p className="text-red-400">
                  {errors.basicInfo?.categoryName.message}
                </p>
              )}
            </div>
          </div>
          <div className="md:flex mb-5">
            <div className="md:w-1/5">
              <label className="font-bold" htmlFor={`basicInfo.description`}>Description</label>
            </div>
            <div className="md:w-4/5">
              <textarea
                className="w-full min-h-[120px] px-2 pl-1 pb-6  bg-transparent appearance-none border-[1px] border-gray-500 rounded-[6px] focus:outline-none focus:bg-white focus:border-blue-400"
                id={`basicInfo.description`}
                {...register("basicInfo.description")}
              />

              {errors.basicInfo?.description && (
                <p className="text-red-400">
                  {errors.basicInfo?.description.message}
                </p>
              )}
            </div>
          </div>

          <div className="md:flex md:items-center mb-10">
            <div className="md:w-1/5">
              <label className="font-bold" htmlFor={`basicInfo.brand`}>Brand</label>
            </div>
            <div className="md:w-4/5">
              <input
                //name={`basicInfo.brand`}
                className="w-1/2 px-2 py-1 bg-transparent appearance-none border-[1px] border-gray-500 rounded-[6px] focus:outline-none focus:bg-white focus:border-blue-400"
                type="text"
                id={`basicInfo.brand`}
                {...register("basicInfo.brand")}
              />
            </div>
          </div>
        </div>

        <div className="mb-10">
          <p className="text-slate-600 font-bold text-2xl">Sales information</p>
        </div>
        <div className="ml-10">
          {!isVariation ? (
            <>
              <div className="md:flex md:items-center mb-5">
                <div className="md:w-1/5">
                  <p className="font-bold">Product Variation</p>
                </div>
                <div className="md:w-1/4">
                  <button
                    onClick={onVariation}
                    className="border-[2px] px-4 py-1 border-separate border-dashed flex items-center space-x-3 hover:bg-red-100"
                  >
                    <Add />
                    <span>Add variation</span>
                  </button>
                </div>
              </div>
              <div className="md:flex mb-5">
                <div className="md:w-1/5">
                  <label className="font-bold" htmlFor={`saleInfo.price`}>Price</label>
                </div>
                <div className="md:w-4/5">
                  <input
                    className={`w-1/2 px-2 py-1 bg-transparent appearance-none border-[1px] rounded-[6px] focus:outline-none focus:bg-white focus:border-blue-400 border-gray-500`}
                    type="number"
                    id={`saleInfo.price`}
                    {...register("saleInfo.price")}
                  />

                  {errors.saleInfo?.price && (
                    <p className="text-red-400">
                      {errors.saleInfo?.price.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="md:flex mb-5">
                <div className="md:w-1/5">
                  <label className="font-bold" htmlFor={`saleInfo.stock`}>stock</label>
                </div>
                <div className="md:w-4/5">
                  <input
                    // name={`saleInfo.stock`}
                    className={
                      `w-1/2 px-2 py-1 bg-transparent appearance-none border-[1px] rounded-[6px] focus:outline-none focus:bg-white focus:border-blue-400` +
                      " border-gray-500"
                    }
                    type="number"
                    id={`saleInfo.stock`}
                    {...register("saleInfo.stock")}
                  />
                  {errors.saleInfo?.stock?.message && (
                    <p className="text-red-400">
                      {errors.saleInfo?.stock.message}
                    </p>
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="md:flex mb-5">
                <div className="md:w-1/5">
                  <p className="font-bold">Product Variation</p>
                </div>
                {/* <Fields
                  {...{
                    control,
                    register,
                    getValues,
                    setValue,
                    errors,
                    watch,
                    setIsVariation,
                  }}
                /> */}
                <AttributeForm {...{control,
                    register,
                    getValues,
                    setValue,
                    errors,
                    watch,
                    setIsVariation, 
                    attributeInfo
                    }} />
              </div>

              <ProductVariant
                attributes={attributes}
                combinations={combinations}
                {...{
                  control,
                  register,
                  getValues,
                  setValue,
                  errors,
                  watch,
                  setIsVariation,
                }}
              />
            </>
          )}
        </div>
        {/* {err && <p className="text-red-400">{err}</p>} */}
        <div className="mt-16 ml-[23%] flex items-center space-x-16">
          {contextHolder}
          <button
            disabled={isSubmitted === true}
            className={`min-w-[100px] bg-blue-400 border-[1px] hover:bg-blue-500 
             px-3 py-1 rounded-[8px] ${isSubmitted && `cursor-not-allowed`}`}
            type="submit"
          >
            {!isSubmitted ? `Save` : <LoadingOutlined />}
            {(isLoading || isSuccess) && <LoadingOverlay type={isSuccess ? 'success' : 'loading'} message="Created product successfully" />}
          </button>
          <button
            onClick={handleCancel}
            className="min-w-[100px] border-[1px] bg-red-400 hover:border-red-500 px-2 py-1 rounded-[8px] text-white"
            type="submit"
          >
            Cancel
          </button>
          <Modal
            open={isOpenCancel}
            onCancel={() => { setIsOpenCancel(false) }}
            title={`Confirm`}
            footer={null}
          >
            <p className="text-[17px] font-medium">
              Do you want to cancel this change ?
            </p>
            <div className="flex mt-5">
              <div className="flex-1">

              </div>
              <div className="flex-1 flex justify-end space-x-2">
                <button
                  onClick={() => {
                    router.push('/seller/product/all');
                  }}
                  className="min-w-[65px] px-2 py-[2px] border-[1px] bg-blue-400 rounded-[5px]">OK</button>
                <button
                  onClick={() => { setIsOpenCancel(false) }}
                  className="min-w-[65px] px-2 py-[2px] border-[1px] bg-red-400 rounded-[5px] text-white">Cancel</button>
              </div>

            </div>

          </Modal>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
