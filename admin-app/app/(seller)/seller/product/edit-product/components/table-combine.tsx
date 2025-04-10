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
import UploadImage from "./upload-image";
//import UploadImage from "./uploadImage";
type PropsType = {
  control: any;
  register: any;
  setValue: any;
  errors: any;
  combinations: any;
  variations: any;
};
type VariationType = {
  name: string;
  option_list: {
    option_value: string;
  };
};
const NewCombineVariation = ({
  control,
  register,
  setValue,
  errors,
  combinations,
  variations,
}: PropsType) => {
  const { fields, append, remove, prepend, update } = useFieldArray({
    control,
    name: "models",
  });
  useEffect(() => {
    if (combinations) {
      setValue("models", []);
      combinations.forEach((item: any, index: number) => {
        update(index, { tier_name: item, image: "", quantity: 0, price: 0 });
      });
    }
  }, [combinations]);

  return (
    <div className="md:flex md:flex-col mb-5">
      <div className="md:w-1/5 mb-2">
        <p>Variation list</p>
      </div>
      <div className="md:w-full">
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell key="image" align="center">
                  Image
                </TableCell>
                <TableCell key="price" align="center">
                  Price
                </TableCell>
                <TableCell key="quantity" align="center">
                  Quantiy
                </TableCell>
                {variations?.map((variation: any, index: number) => {
                  return (
                    <TableCell align="center" key={index}>
                      {variation.name}
                    </TableCell>
                  );
                })}
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
                    <TableCell align="center">
                      <Controller
                        control={control}
                        name={`models.${index}.image`}
                        render={({ field: { onChange } }) => (
                          <UploadImage
                            index={index}
                            setValue={setValue}
                            imgPreview={null}
                            inputName={`models.${index}.image`}
                          />
                          // <div className="w-[60px] h-[60px] border-[1px] border-dashed border-gray-300 flex flex-col items-center justify-center relative">
                          //   <input
                          //     type="file"
                          //     hidden
                          //     accept="image/png, image/jpeg"
                          //     id={`sales_info.models.${index}.image`}
                          //     //onChange={onChange}
                          //     //id={`image`}

                          //   />
                          //   <label
                          //      htmlFor={`sales_info.models.${index}.image`}
                          //     className="cursor-pointer absolute image-upload-label"
                          //   >
                          //     <i className="add-picture-icon">+</i>
                          //   </label>
                          // </div>
                        )}
                      />
                      {errors?.models?.[index]?.image?.message && (
                        <p className="text-red-400">
                          {errors?.models?.[index]?.image?.message}
                        </p>
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <input
                        className="px-3 py-1 border-[1px] border-gray-200"
                        {...register(`models.${index}.price`)}
                      />

                      {errors?.models?.[index]?.price?.message && (
                        <p className="text-red-400">
                          {errors?.models?.[index]?.price?.message}
                        </p>
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <input
                        className="px-3 py-1 border-[1px] border-gray-200"
                        {...register(`models.${index}.quantity`)}
                      />
                      {errors?.models?.[index]?.quantity
                        ?.message && (
                        <p className="text-red-400">
                          {
                            errors?.models?.[index]?.quantity
                              ?.message
                          }
                        </p>
                      )}
                    </TableCell>
                    {field.tier_name?.map((item: any, index: number) => {
                      return (
                        <TableCell key={index} align="center">
                          {item}
                        </TableCell>
                      );
                    })}
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

export default NewCombineVariation;
