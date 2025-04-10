import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { z } from "zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import UploadImage from "./upload-image";
import axios from "@/api/axios";
import { message } from "antd";
type PropsType = {
  productVariants: any;
  isEditTableVariation: any;
  setIsEditTableVariation: any;
  setProductVariants: any;
};

type SalesInfoType = {
    productDetailId: number;
    image: string;
    quantity: number;
    price: number;
}

type FormValues = {
    sales_info: SalesInfoType[]
}

const EditSaleInfo = ({
  productVariants,
  isEditTableVariation,
  setIsEditTableVariation,
  setProductVariants
}: PropsType) => {
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Edit sales product successfully',
    });
  };
  const validateSalesInfo = z.object({
    sales_info: z.array(
      z.object({
        productDetailId: z.coerce.number(),
        image: z.coerce.string(),
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

  const form = useForm<FormValues>({
    resolver: zodResolver(validateSalesInfo),
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

  const { fields, append, remove, prepend, update } = useFieldArray({
    control,
    name: "sales_info",
  });

  useEffect(() => {
    if(productVariants) {
      //setValue("sales_info.models", []);
      productVariants.forEach((item: any, index: number ) => {
        update(index, { productDetailId: item.id, image: item.image, quantity: item.quantity, price: item.price})
    });
    }
    
  }, [productVariants])
  
  const onSubmit = async (values: FormValues) => {
    console.log(values);
    const data = values.sales_info;
    
    try {
        for(const item of data) {
            const res = await axios.put('/product/updateProductDetail', item, {
                headers: {'Content-Type': "application/json"},
                withCredentials: true
            });
            setProductVariants((pre: any) => {
                return pre?.map((i: any) => {
                    if(i.id === item.productDetailId) {
                        return {...i, quantity: item.quantity, price: item.price, image: item.image ? item.image : null}
                    }
                    return i;
                })
            })
        }
        success();
        setTimeout(() => {
            setIsEditTableVariation(false);
        }, 1000)
    } catch (error) {
        console.log(error);
        
    }
    
  }

  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              {productVariants &&
                productVariants[0]?.variation_options?.map(
                  (variation: any, index: number) => {
                    return (
                      <TableCell key={index}>
                        {variation.variation_name}
                      </TableCell>
                    );
                  }
                )}
            </TableRow>
          </TableHead>
          <TableBody>
            {productVariants &&
              fields?.map((row: any, index: number) => (
                <TableRow
                  key={row.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell align="center">
                    {!isEditTableVariation ? (
                      <div className="w-[60px] h-[60px] border-[1px] border-dashed border-gray-300 flex flex-col items-center justify-center relative">
                        <img src={row.image} alt="" />
                      </div>
                    ) : (
                      <Controller
                        control={control}
                        name={`sales_info.${index}.image`}
                        render={({ field: { onChange } }) => (
                          <UploadImage
                            index={index}
                            setValue={setValue}
                            imgPreview={row.image}
                            inputName={`sales_info.${index}.image`}
                          />
                        )}
                      />
                    )}
                    {/* {errors.sales_info?.models?.[index]?.image?.message && (
                        <p className="text-red-400">
                          {errors.sales_info?.models?.[index]?.image?.message}
                        </p>
                      )} */}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {!isEditTableVariation ? (
                      row.price
                    ) : (
                      <>
                        <input
                          className="w-[70%] px-3 py-1 border-[1px] border-gray-200"
                          {...register(`sales_info.${index}.price`)}
                        />
                        {errors?.sales_info?.[index]?.price && (
                          <p className="text-red-400">
                            {errors?.sales_info?.[index]?.price?.message}
                          </p>
                        )}
                      </>
                    )}
                  </TableCell>
                  <TableCell>
                    {!isEditTableVariation ? (
                      row.quantity
                    ) : (
                      <>
                        <input
                          className="w-[70%] px-3 py-1 border-[1px] border-gray-200"
                          {...register(`sales_info.${index}.quantity`)}
                        />
                        {errors?.sales_info?.[index]?.quantity && (
                          <p className="text-red-400">
                            {errors?.sales_info?.[index]?.quantity?.message}
                          </p>
                        )}
                      </>
                    )}
                  </TableCell>
                  {productVariants[index].variation_options?.map(
                    (variation: any, index: number) => (
                      <TableCell key={index}>{variation.option}</TableCell>
                    )
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {contextHolder}
      {isEditTableVariation && (
        <div className="flex space-x-5 mt-5">
          <button className="px-3 py-1 min-w-[80px] bg-blue-400 hover:bg-blue-500 rounded-md">
            Save
          </button>
          <button
            className="px-3 py-1 min-w-[80px] border-[1px] bg-red-400 rounded-md"
            onClick={(e) => {
              e.preventDefault();
              productVariants.forEach((item: any, index: number) => {
                update(index, {
                  productDetailId: item.id,
                  image: item.image,
                  quantity: item.quantity,
                  price: item.price,
                });
              });
              setIsEditTableVariation(false);
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </form>
  );
};

export default EditSaleInfo;
