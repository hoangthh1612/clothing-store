"use client";

import { Button, Form, Input, Modal, Typography, Upload, message, DatePicker } from "antd";

import { useRouter } from "next/navigation";
import { ChangeEvent, ReactHTMLElement, useEffect, useState } from "react";
//import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Control, Controller, useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { fileURLToPath } from "url";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import {LoadingOutlined} from "@ant-design/icons";
import LoadingOverlay from "@/app/(seller)/components/loading/LoadingOverlay";
import { RangePickerProps } from "antd/es/date-picker";

// import { useRouter } from "next/router";

type FormValues = {
  code_name: string;
  description: string;
  quantity: number;
  min_spend: number;
  max_usage: number;
  start_time: Date;
  end_time: Date;
  discount: {
    type: string;
    amount: number;
    percent: number;
    max_reduction: number | null;
  };
};

const CreateVoucher = () => {
  const [typeDiscount, setTypeDiscount] = useState("amount");
  const [isDiscountAmount, setIsDiscountAmount] = useState(true);
  const [errTime, setErrTime] = useState<any>(null);
  const [isOpenCancel, setIsOpenCancel] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleSaveProduct = (e: any) => {
    e.preventDefault();
  };

  // const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Created voucher successfully",
    });
  };

  const axiosPrivate = useAxiosPrivate();

  dayjs.extend(utc);

  const timestamp = dayjs();
  const optionValidate = isDiscountAmount
    ? z.object({
        type: z.string(),
        amount: z
          .number()
          .int({ message: "Required" })
          .gte(1000, { message: "Must be greater than equal 1000" }),
      })
    : z.object({
        type: z.string(),
        percent: z
          .number()
          .int({ message: "Required" })
          .gt(0, { message: "Must be greater than equal 1" })
          .lte(100, { message: "<= 100" }),
        max_reduction: z.coerce
          .number()
          .int({ message: "Required" })
          .gte(1000, { message: "Must be greater than equal 1000" }),
      });
  const validateSchema = z.object({
    code_name: z.string().nonempty("Required"),
    description: z.string().nonempty("Required"),
    quantity: z
      .number()
      .int({ message: "Must be integer" })
      .gte(1, { message: "Quantity must be greater than equal 1" }),
    min_spend: z
      .number()
      .int({ message: "Must be integer" })
      .gte(1000, { message: "Must be greater than equal 1000" }),
    max_usage: z
      .number()
      .gte(1, { message: "Must be greater than or equal 1" }),
    start_time: z.coerce.date().refine((data) => data > new Date(), {
      message: "Start date must be in the future",
    }),
    end_time: z.coerce.date(),

    // .refine((data) => data > validateSchema.start_time, {
    //   message: 'End time must be greater than start time',
    // })
    discount: optionValidate,
  });

  // .refine((data) => data.end_time > data.start_time, {
  //   path: ["end_time"],
  //   message: "End date cannot be earlier than start date."

  // })
  const form = useForm<FormValues>({
    defaultValues: {
      discount: { type: "amount" },
    },
    resolver: zodResolver(validateSchema),
    mode: "all",
  });

  const {
    handleSubmit,
    register,
    formState,
    watch,
    setValue,
    setError,
    control,
  } = form;
  const { errors } = formState;

  type RHFDatePickerFieldProps = {
    control: Control<any>;
    name: string;
    placeholder?: string;
  };
  const type = useWatch({ control, name: "discount.type" });
  useEffect(() => {
    if (type) {
      if (type === "amount") {
        setIsDiscountAmount(true);
        return;
      }
      setIsDiscountAmount(false);
    }
  }, [type]);
  console.log(isDiscountAmount);
  console.log(isSubmitted);
  
  const onChangeTypeDiscount = (e: ChangeEvent<HTMLInputElement>) => {
    setTypeDiscount(e.target.value);
    // console.log(e.target.value);
  };
  const onSubmit = async (data: FormValues) => {
    console.log(data);
    //success();
    try {
      setIsLoading(true);
      await new Promise(resolse => setTimeout(resolse, 1500));
      const res = await axiosPrivate.post("/voucher/create", data);
    
      //success();
      setIsSuccess(true);
      setIsSubmitted(false);
      
      
    } catch (error: any) {
      console.log(error);
      setErrTime(error?.response.data.message);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setIsSuccess(false);
        router.push("/seller/marketing/list-voucher");
      },500);
        // setIsSuccess(false);
        // router.push("/seller/marketing/list-voucher");
    }
  };
  const startTime = useWatch({ control, name: "start_time" });
  const endTime = useWatch({ control, name: "end_time" });
  console.log(endTime > startTime);

  // useEffect(() => {
  //   if(startTime && endTime) {
  //     if(endTime > startTime) {
  //       console.log("valid");

  //       setError("end_time", {
  //         type: "time",
  //         message: undefined
  //       })
  //       return;
  //     }
  //     console.log("invalid");
  //     setError("end_time", {
  //       type: "time",
  //       message: "End date cannot be earlier than start date"
  //     })
  //   }

  // }, [startTime, endTime])

  // console.log(watch("start_time"));
  // console.log(watch("end_time"));
  // console.log(watch("discount"));
  console.log(errTime);
  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Can not select days before today and today
    return current && current <= dayjs().endOf('day');
  };
  const RHFDatePickerField = (props: RHFDatePickerFieldProps) => {
    return (
      <Controller
        control={props.control}
        name={props.name}
        render={({ field, fieldState }) => (
          <DatePicker
            className="w-full"
            placeholder={props.placeholder}
            disabledDate={disabledDate}
            status={fieldState.error ? "error" : undefined}
            format="YYYY-MM-DD HH:mm"
            //defaultValue={dayjs()}
            name={field.name}
            onBlur={field.onBlur}
            value={field.value ? dayjs(field.value) : null}
            onChange={(date, dateString) => {
              field.onChange(date ? date.valueOf() : null);
            }}
            // disabledDate={disabledDate}
            // disabledTime={disabledDateTime}
            showTime={{ defaultValue: dayjs("00:00:00", "HH:mm:ss") }}
          />
        )}
      />
    );
  };
  const handleCancel = (e: any) => {
    e.preventDefault();
    setIsOpenCancel(true);
  };

  return (
    <div className="create-voucher pl-6 py-4 mx-32 bg-white">
      {contextHolder}
      <p className="text-2xl text-slate-600 font-bold mb-10">Create voucher</p>
      <div className="ml-10">
        <form className="px-5 py-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="md:flex mb-10">
            <div className="md:w-1/6">
              <label className="font-bold" htmlFor="title">
                {/* <i className="text-red-400">* </i> */}
                Voucher code
              </label>
            </div>
            <div className="md:w-5/12">
              <input
                className="w-full px-2 py-1 bg-transparent appearance-none border-[1px] border-gray-500 rounded-[6px] focus:outline-none focus:bg-white focus:border-blue-400"
                type="text"
                id="title"
                {...register("code_name")}
              />
              {errors.code_name && (
                <p className="text-red-400">{errors.code_name.message}</p>
              )}
            </div>
          </div>
          <div className="md:flex mb-10">
            <div className="md:w-1/6">
              <label className="font-bold" htmlFor="description">
                Description
              </label>
            </div>
            <div className="md:w-5/6">
              <textarea
                className="w-full px-2 pl-1 pb-6  bg-transparent appearance-none border-[1px] border-gray-500 rounded-[6px] focus:outline-none focus:bg-white focus:border-blue-400"
                id="description"
                {...register("description")}
              />
              {errors.description && (
                <p className="text-red-400">{errors.description.message}</p>
              )}
            </div>
          </div>
          <div className="md:flex mb-10">
            <div className="md:w-1/6">
              <p className="font-bold">Type of discounts</p>
            </div>
            <div className="md:w-5/6 flex flex-col">
              <div className="flex md:w-[50%]">
                <div className="w-[40%]">
                  <select
                    {...register("discount.type")}
                    className="w-full px-2 py-1 min-h-[34px] bg-transparent border-[1px] border-gray-500
                    focus:outline-none focus:bg-white focus:border-blue-400 rounded-l-[6px]"
                  >
                    <option value="amount">Amount discount</option>
                    <option value="percentage">Percentage discount</option>
                  </select>
                </div>
                {watch("discount.type") === "amount" && (
                  <div className="block w-[60%]">
                    <input
                      
                      {...register("discount.amount", {
                        setValueAs: (value) => Number(value),
                      })}
                      className={
                        `w-full px-2 py-1 bg-transparent rounded-r-[6px] appearance-none border-[1px] focus:outline-none focus:bg-white focus:border-blue-400` +
                        " border-gray-500"
                      }
                      type="number"
                    />
                    {errors.discount?.amount?.message && (
                      <p className="text-red-400">
                        {errors.discount?.amount?.message}
                      </p>
                    )}
                  </div>
                )}
                {watch("discount.type") === "percentage" && (
                  <>
                    <div className="block w-[60%]">
                      <div className="relative">
                        <input
                          {...register("discount.percent", {
                            setValueAs: (value) => Number(value),
                          })}
                        
                          className={
                            `w-full px-2 py-1 bg-transparent appearance-none border-[1px] rounded-r-[6px] focus:outline-none focus:bg-white focus:border-blue-400` +
                            " border-gray-500"
                          }
                          type="number"
                        />
                        <span className="absolute right-3 top-1 text-blue-300">%</span>
                      </div>
                      
                      {errors.discount?.percent?.message && (
                        <p className="text-red-400">
                          {errors.discount?.percent?.message}
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* <div className="flex mb-3">
                <div className="flex mr-3">
                  <input
                    {...register("discount.type")}
                    type="radio"
                    id="amount"
                    value={"amount"}
                    checked={watch("discount.type") === "amount"}
                    //checked
                    //onChange={onChangeTypeDiscount}
                  />
                  <label htmlFor="amount">Amount discount</label>
                </div>
                <div className="flex">
                  <input
                    {...register("discount.type")}
                    type="radio"
                    value={"percentage"}
                    id="percentage"
                    checked={watch("discount.type") === "percentage"}
                    //onChange={onChangeTypeDiscount}
                  />
                  <label htmlFor="percentage">Percentage discount</label>
                </div>
              </div> */}
            </div>
          </div>
          {
            watch("discount.type") === "percentage"  && (
              <div className="md:flex my-10">
            <div className="md:w-1/6">
              <p className="font-bold">Max reduction</p>
            </div>
            <div className="md:w-5/6">
              <input
                {...register("discount.max_reduction")}
                className={
                  `w-[50%] px-2 py-1 bg-transparent appearance-none border-[1px] rounded-[6px] focus:outline-none focus:bg-white focus:border-blue-400` +
                  " border-gray-500"
                }
                type="number"
              />
              {errors.discount?.max_reduction?.message && (
                <p className="text-red-400">
                  {errors.discount?.max_reduction?.message}
                </p>
              )}
            </div>
          </div>
            )
          }

          <div className="md:flex mb-10">
            <div className="md:w-1/6">
              <p className="font-bold">
                {/* <i className="text-red-400">* </i> */}
                Duration
              </p>
            </div>
            <div className="md:w-5/6 flex">
              <div className="w-1/4">
                <RHFDatePickerField control={control} name="start_time" />
                {errors.start_time && (
                  <p className="text-red-400">{errors.start_time.message}</p>
                )}
              </div>
              <span className="mx-2">-</span>
              <div className="w-1/4">
                <RHFDatePickerField control={control} name="end_time" />
                {errors?.end_time?.message && (
                  <p className="text-red-400">{errors?.end_time.message}</p>
                )}
                {errTime && <p className="text-red-400">{errTime}</p>}
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    components={[
                      "DateTimePicker",
                      "DateTimePicker",
                      "DateTimePicker",
                    ]}
                  >
                    
                    <DateTimePicker
                      ampm={false}
                      timeSteps={{ hours: 1, minutes: 1, seconds: 1 }}
                      views={["year", "day", "hours", "minutes", "seconds"]}
                    />
                
                  </DemoContainer>
                </LocalizationProvider> */}
              </div>
            </div>
          </div>

          <div className="md:flex mb-10">
            <div className="md:w-1/6">
              <label className="font-bold" htmlFor="quantity">
                {/* <i className="text-red-400">* </i> */}
                Quantity
              </label>
            </div>
            <div className="md:w-5/6">
              <input
                //onKeyDown={handleKeyPress}
                //min={1}
                id="quantity"
                className={
                  `w-[50%] px-2 py-1 bg-transparent appearance-none border-[1px] rounded-[6px] focus:outline-none focus:bg-white focus:border-blue-400` +
                  " border-gray-500"
                }
                type="number"
                {...register("quantity", {
                  setValueAs: (value) => Number(value),
                })}
              />
              {errors.quantity && (
                <p className="text-red-400">{errors.quantity.message}</p>
              )}
            </div>
          </div>
          <div className="md:flex mb-10">
            <div className="md:w-1/6">
              <label className="font-bold" htmlFor="min_spend">
                {/* <i className="text-red-400">* </i> */}
                Min spend
              </label>
            </div>
            <div className="md:w-5/6">
              <input
                //onKeyDown={handleKeyPress}
                //min={1}
                id="min_spend"
                className={
                  `w-[50%] px-2 py-1 bg-transparent appearance-none border-[1px] rounded-[6px] focus:outline-none focus:bg-white focus:border-blue-400` +
                  " border-gray-500"
                }
                type="number"
                {...register("min_spend", {
                  setValueAs: (value) => Number(value),
                })}
              />
              {errors.min_spend && (
                <p className="text-red-400">{errors.min_spend.message}</p>
              )}
            </div>
          </div>
          <div className="md:flex mb-10">
            <div className="md:w-1/6">
              <label className="font-bold" htmlFor="max_buyer">
                {/* <i className="text-red-400">* </i> */}
                Max Used
              </label>
            </div>
            <div className="md:w-5/6">
              <input
                //onKeyDown={handleKeyPress}
                //min={1}
                defaultValue={1}
                id="max_buyer"
                className={
                  `w-[50%] px-2 py-1 bg-transparent appearance-none border-[1px] rounded-[6px] focus:outline-none focus:bg-white focus:border-blue-400` +
                  " border-gray-500"
                }
                type="number"
                {...register("max_usage", {
                  setValueAs: (value) => Number(value),
                })}
              />

              {errors.max_usage && (
                <p className="text-red-400">{errors.max_usage.message}</p>
              )}
            </div>
          </div>
          {/* <div className="flex justify-center">
            <button className="px-5 py-1 border-[1px] bg-blue-400 hover:bg-blue-500 rounded-md">
              <span className="font-bold">Create</span>
            </button>
          </div> */}
          <div className="mt-16 ml-[16.67%] flex items-center space-x-16">
            {contextHolder}
            <button
              disabled={isSubmitted === true}
              className={`min-w-[100px] bg-blue-400 border-[1px] hover:bg-blue-500
              px-3 py-1 rounded-[8px] ${isSubmitted && `cursor-not-allowed`}`}
              type="submit"
            >
              {(isLoading || isSuccess) && <LoadingOverlay type={isSuccess ? 'success' : 'loading'} message="Created voucher successfully" />}
              {!isSubmitted ? `Save` : <LoadingOutlined />}
              {/* {isSubmitted && <LoadingOverlay type="loading" />} */}
              {/* {!isSubmitted && <LoadingOverlay type="success" /> } */}
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
              onCancel={() => {
                setIsOpenCancel(false);
              }}
              title={`Confirm`}
              footer={null}
            >
              <p className="text-[17px] font-medium">
                Do you want to cancel this change ?
              </p>
              <div className="flex mt-5">
                <div className="flex-1"></div>
                <div className="flex-1 flex justify-end space-x-2">
                  <button
                    onClick={() => {
                      router.push("/seller/marketing/list-voucher");
                    }}
                    className="min-w-[65px] px-2 py-[2px] border-[1px] bg-blue-400 rounded-[5px]"
                  >
                    OK
                  </button>
                  <button
                    onClick={() => {
                      setIsOpenCancel(false);
                    }}
                    className="min-w-[65px] px-2 py-[2px] border-[1px] bg-red-400 rounded-[5px] text-white"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Modal>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateVoucher;
