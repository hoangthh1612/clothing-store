"use client";

import React, { useEffect, useState } from "react";
import { Controller, useFieldArray } from "react-hook-form";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,

} from "@mui/material";
import UploadImage from "./uploadImage";
type PropsType = {
  control: any;
  register: any;
  setValue: any;
  getValues: any;
  errors: any;
  watch: any;
  setIsVariation: any;
  combinations: any;
  attributes: any;
};
type VariationType = {
  name: string;
  option_list: {
    option_value: string;
  };
};
const CombineVariation = ({
  control,
  register,
  setValue,
  getValues,
  errors,
  watch,
  setIsVariation,
  combinations,
  attributes
}: PropsType) => {
  
  const { fields, append, remove, prepend, update } = useFieldArray({
    control,
    name: "sales_info.variants",
  });
  useEffect(() => {
    
    if(combinations) {
      setValue("sales_info.variants", []);
      combinations.forEach((item: any, index: number ) => {
        update(index, { tier_name: item, image: '', quantity: 0, price: 0})
    });
    }
    
    
  }, [combinations])
 


  

  return (
    <div className="md:flex mb-5">
      <div className="md:w-1/5">
        <p className="font-bold">Variant list</p>
      </div>
      <div className="md:w-4/5">
       
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow >
                {attributes?.map((attr: any, index: number) => {
                  return (
                    <TableCell align="center" key={index}>
                      {attr.attributeName}
                    </TableCell>
                  );
                })}
                <TableCell key="price" align="center">
                  Price
                </TableCell>
                <TableCell key="quantity" align="center">
                  Quantiy
                </TableCell>
                <TableCell key="image" align="center">
                  Image
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fields?.map((field: any, index: number) => {
                return (
                  <TableRow
                    key={field.id}
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: 0,
                      },
                    }}
                  >
                    {field.tier_name?.map((item: any, index: number) => {
                      return (
                        <TableCell key={index} align="center">
                          {item}
                        </TableCell>
                      );
                    })}
                    <TableCell align="center">
                      <div className="block h-[40px]">
                        <input
                          className="h-[30px] px-2 py-1 bg-transparent appearance-none border-[1px] border-gray-500 rounded-[6px] focus:outline-none focus:bg-white focus:border-blue-400"
                          {...register(`sales_info.variants.${index}.price`)}
                        />

                        <div className="h-[10px]">
                          {errors.sales_info?.variants?.[index]?.price
                            ?.message && (
                            <p className="text-red-400">
                              {
                                errors.sales_info?.variants?.[index]?.price
                                  ?.message
                              }
                            </p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      <div className="block h-[40px]">
                        <input
                          className="h-[30px] px-2 py-1 bg-transparent appearance-none border-[1px] border-gray-500 rounded-[6px] focus:outline-none focus:bg-white focus:border-blue-400"
                          {...register(`sales_info.variants.${index}.quantity`)}
                        />
                        <div className="h-[10px]">
                          {errors.sales_info?.variants?.[index]?.quantity
                            ?.message && (
                            <p className="text-red-400">
                              {
                                errors.sales_info?.variants?.[index]?.quantity
                                  ?.message
                              }
                            </p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      <div className="flex justify-center">
                        <Controller
                          control={control}
                          name={`sales_info.variants.${index}.image`}
                          render={({ field: { onChange } }) => (
                            <UploadImage
                              field={field}
                              index={index}
                              setValue={setValue}
                            />
                          )}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default CombineVariation;
