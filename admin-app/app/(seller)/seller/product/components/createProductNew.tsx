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
import {LoadingOutlined} from "@ant-design/icons"
import LoadingOverlay from "@/app/(seller)/components/loading/LoadingOverlay";
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

type BasicInfo = {
  image: string;
  product_name: string;
  category: string;
  description: string;
  brand?: string;
};
type SaleInfo = {
  variants: Variant[];
}
type Variant = {
  price: number | undefined;
  quantity: number | undefined;
  image: String;
  variantAttributes: VariantAttribute[];
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

type ProductForm = {
  basicInfo: BasicInfo;
  saleInfo: SaleInfo;
}


type MyFormValues = {
  basic_info: BasicInfo;
  sales_info: {
    price: number | undefined;
    quantity: number | undefined;
    variations: {
      name: string;
      option_list: {
        option_value: string;
      }[];
    }[];
    models: {
      tier_name: string[];
      image: string;
      price: number;
      quantity: number;
    }[];
  };
};

const CreateProductNew = () => {
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

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Created product successfully',
    });
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
  const handleMessage = async () => {
    return "Hahahah";
  };
  const validateImg = async (e: any) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
    let message = await handleMessage();
    console.log(message);

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
    urlImage && setValue("basic_info.image", urlImage);
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
        quantity: z.coerce
          .number()
          .int({ message: "Quantity is required" })
          .gte(0, { message: "Product Quantity must be >= 0" }),
      })
    : z.object({
        variations: z
          .array(
            z.object({
              name: z.string().nonempty({ message: "Required" }),
              option_list: z.array(
                z.object({
                  option_value: z.string().nonempty({ message: "Required" }),
                })
              ),
            })
          )
          .refine((value) => checkDuplicate(value) === false, {
            message: "Variation name not duplicate",
            //path: []
          }),
        models: z.array(
          z.object({
            tier_name: z.array(z.string()),
            image: z.string(),
            price: z.coerce
              .number()
              .int({ message: "Price is required" })
              .gte(1000, { message: "Price must be more than 1000 VND" })
              .lte(100000000, {
                message: "Price must be less than 100.000.000 VND",
              }),
            quantity: z.coerce
              .number()
              .int({ message: "Quantity is required" })
              .gte(0, { message: "Product Quantity must be >= 0" }),
          })
        ),
      });

  const validate = z.object({
    basic_info: z.object({
      image: z.coerce.string().nonempty({ message: "Image is required" }),
      product_name: z
        .string()
        .nonempty({ message: "Product name is required" })
        .min(5, { message: "Product name must be at least 5 characters" }),

      category: z.string().nonempty("Category is required"),
      description: z
        .string()
        .nonempty({ message: "Description is required" })
        .min(50, { message: "Description must be at least 50 characters" }),
      brand: z.string(),
    }),
    sales_info: zodValidateOption,
  });

  const onVariation = (e: any) => {
    e.preventDefault();
    setIsVariation(true);
    // const {sales_info} = values;
    // let {variations} = sales_info;
    setValue("sales_info.variations", [
      {
        name: "",
        option_list: [
          {
            option_value: "",
          },
        ],
      },
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

  function cartesianProduct(arrays: any) {
    return arrays.reduce(
      (acc: any, curr: any) => {
        return acc.flatMap((item: any) => {
          return curr.map((value: any) => {
            return Array.isArray(item) ? [...item, value] : [item, value];
          });
        });
      },
      [[]]
    );
  }
  console.log(isLoading);
  
  const variations = useWatch({ control, name: "sales_info.variations" });

  useEffect(() => {
    if (variations) {
      let options = variations?.map((variation: any) =>
        variation.option_list.map((option: any) => option.option_value)
      );
      const combinations = cartesianProduct(options);
      setCombinations(combinations);
    }
  }, [variations]);
console.log(isSubmitted);

  const onSubmit = async (values: any) => {
    const { basic_info, sales_info } = values;
    const outputValues = {
      basic_info: { ...basic_info },
      sales_info: sales_info,
    };
    console.log(outputValues);
    // messageApi.open({
    //   key,
    //   type: 'loading',
    //   content: 'Loading...',
    // });
    setIsSubmitted(true);
    setIsLoading(true);
    if (!isVariation) {
      try {
        await new Promise((resolse) => setTimeout(resolse, 1500));
        const res = await axiosPrivate.post("/product/add_item", outputValues);
        //success();
        setIsSuccess(true);
        setIsSubmitted(false);
       
      } catch (err: any) {
        console.log(err);

        setErr(err.response.data.message);
      } finally {
        setIsLoading(false);
        setTimeout(() => {
          setIsSuccess(false);
          router.push("/seller/product/all");
        }, 500);
      }
    } else {
      try {
        await new Promise(resolse => setTimeout(resolse, 1500));
        await axiosPrivate.post("/product/add_product_variation", outputValues);
        //success();
        setIsSuccess(true);
        setIsSubmitted(false);
        // setTimeout(() => {
        //   router.push("/seller/product/all");
        // }, 100);
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
    }
  };

  const handleCancel = (e: any) => {
    e.preventDefault();
    setIsOpenCancel(true);

  }

  const [categories, setCategories] = useState<[] | null>(null);
  const getAll = async () => {
    //const res = await axios.get('/category');
    const res = await getAllCategory();
    setCategories(res.data);
  };
  useEffect(() => {
    getAll();
  }, []);


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
                name={`basic_info.image`}
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
              
              {errors.basic_info?.image?.message && (
                <p className="text-red-400">
                  {errors.basic_info?.image?.message}
                </p>
              )}
            </div>
          </div>

          <div className="md:flex mb-5">
            <div className="md:w-1/5">
              <label className="font-bold" htmlFor={`basic_info.product_name`}>Product name</label>
            </div>
            <div className="md:w-4/5">
              <input
                // name={`basic_info.product_name`}
                className="w-full px-2 py-1 bg-transparent appearance-none border-[1px] border-gray-500 rounded-[6px] focus:outline-none focus:bg-white focus:border-blue-400"
                type="text"
                id={`basic_info.product_name`}
                {...register("basic_info.product_name")}
              />
              {errors.basic_info?.product_name && (
                <p className="text-red-400">
                  {errors.basic_info?.product_name.message}
                </p>
              )}
            </div>
          </div>
          <div className="md:flex mb-5">
            <div className="md:w-1/5">
              <label className="font-bold" htmlFor={`basic_info.category`}>Category</label>
            </div>
            <div className="md:w-4/5">
              <select
                className="w-full px-2 py-1 bg-transparent border-[1px] border-gray-500 rounded-[6px] focus:outline-none focus:bg-white focus:border-blue-400"
                id={`basic_info.category`}
                {...register("basic_info.category")}
              >
                <option key="" value="">
                  --Choose a category--
                </option>
                {categories?.map((category: any, index: number) => (
                  <option key={category.id} value={category.category_name}>
                    {category.category_name}
                  </option>
                ))}
              </select>

              {errors.basic_info?.category && (
                <p className="text-red-400">
                  {errors.basic_info?.category.message}
                </p>
              )}
            </div>
          </div>
          <div className="md:flex mb-5">
            <div className="md:w-1/5">
              <label className="font-bold" htmlFor={`basic_info.description`}>Description</label>
            </div>
            <div className="md:w-4/5">
              <textarea
                className="w-full min-h-[120px] px-2 pl-1 pb-6  bg-transparent appearance-none border-[1px] border-gray-500 rounded-[6px] focus:outline-none focus:bg-white focus:border-blue-400"
                id={`basic_info.description`}
                {...register("basic_info.description")}
              />

              {errors.basic_info?.description && (
                <p className="text-red-400">
                  {errors.basic_info?.description.message}
                </p>
              )}
            </div>
          </div>

          <div className="md:flex md:items-center mb-10">
            <div className="md:w-1/5">
              <label className="font-bold" htmlFor={`basic_info.brand`}>Brand</label>
            </div>
            <div className="md:w-4/5">
              <input
                //name={`basic_info.brand`}
                className="w-1/2 px-2 py-1 bg-transparent appearance-none border-[1px] border-gray-500 rounded-[6px] focus:outline-none focus:bg-white focus:border-blue-400"
                type="text"
                id={`basic_info.brand`}
                {...register("basic_info.brand")}
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
                  <label className="font-bold" htmlFor={`sales_info.price`}>Price</label>
                </div>
                <div className="md:w-4/5">
                  <input
                    className={`w-1/2 px-2 py-1 bg-transparent appearance-none border-[1px] rounded-[6px] focus:outline-none focus:bg-white focus:border-blue-400 border-gray-500`}
                    type="number"
                    id={`sales_info.price`}
                    {...register("sales_info.price")}
                  />

                  {errors.sales_info?.price && (
                    <p className="text-red-400">
                      {errors.sales_info?.price.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="md:flex mb-5">
                <div className="md:w-1/5">
                  <label className="font-bold" htmlFor={`sales_info.quantity`}>Quantity</label>
                </div>
                <div className="md:w-4/5">
                  <input
                    // name={`sales_info.quantity`}
                    className={
                      `w-1/2 px-2 py-1 bg-transparent appearance-none border-[1px] rounded-[6px] focus:outline-none focus:bg-white focus:border-blue-400` +
                      " border-gray-500"
                    }
                    type="number"
                    id={`sales_info.quantity`}
                    {...register("sales_info.quantity")}
                  />
                  {errors.sales_info?.quantity?.message && (
                    <p className="text-red-400">
                      {errors.sales_info?.quantity.message}
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
              <Fields
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
              </div>

              <CombineVariation
                variations={variations}
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
            onCancel={() => {setIsOpenCancel(false)}}
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
                  onClick={() => {setIsOpenCancel(false)}}
                  className="min-w-[65px] px-2 py-[2px] border-[1px] bg-red-400 rounded-[5px] text-white">Cancel</button>
                </div>
                
            </div>

          </Modal>
        </div>
      </form>
    </div>
  );
};

export default CreateProductNew;
