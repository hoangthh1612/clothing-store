
import React from "react";
import { useFieldArray } from "react-hook-form";
import NestedArray from "./nestedFieldArray";
import { Add, DeleteOutline } from "@mui/icons-material";


type PropsType = {
  control: any;
  register: any;
  setValue: any;
  getValues: any;
  errors: any;
  watch: any;
  setIsVariation: any;
};

export default function Fields({
  control,
  register,
  setValue,
  getValues,
  errors,
  watch,
  setIsVariation
}: PropsType) {
  const { fields, append, remove, prepend } = useFieldArray({
    control,
    name: "sales_info.variations",
  });

  const addVariation = (e: any) => {
    e.preventDefault();
    append({
      name: "",
      option_list: [{ option_value: "" }],
    });
  }

  return (
    <div className="flex flex-col md:w-4/5">
      {fields?.map((field: any, index: number) => (
        <React.Fragment key={field.id}>
          <div className="bg-gray-100 mb-2 px-3 py-3 border-[1px] rounded-sm">
            <div className="flex">
              <div className="md:flex md:flex-1 mb-5 items-start">
                <div className="w-[100px] mr-[16px]">
                  <label htmlFor={`sales_info.variations.${index}.name`}>
                    {`Variation ${index + 1}`}
                  </label>
                </div>
                <div className="md:w-4/5">
                  <input
                    //name={`sales_info.variations.${index}.name`}
                    
                    id={`sales_info.variations.${index}.name`}
                    className="w-[43.2%] px-2 py-1 bg-transparent appearance-none border-[1px] border-gray-500 rounded-[6px] focus:outline-none focus:bg-white focus:border-blue-400"
                    type="text"
                    placeholder="Color, Size,..."
                    {...register(`sales_info.variations.${index}.name`)}
                  />
                  {errors?.sales_info?.variations?.[index]?.name?.message && (
                    <p className="text-red-400">
                        {errors?.sales_info?.variations?.[index]?.name.message}
                    </p>
                    )}
                  
                </div>
              </div>
              <div className="flex flex-none items-start">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    // setIsShowTable(false);
                    // const { sales_info } = values;
                    // sales_info.models = [];
                    const variations = watch("sales_info.variations");

                    remove(index);
                    variations?.length === 1 && setIsVariation(false);
                  }}
                >
                  <span>X</span>
                </button>
              </div>
            </div>
            <div className="flex items-start align-baseline">
              <div className="w-[100px] mr-[16px]">
                <p>Variation option</p>
              </div>
              <div className="w-4/5 p-0 m-0 flex flex-wrap align-baseline">
                  <NestedArray nestIndex={index} {...{ control, register, errors }} />
              </div>
            </div>
          </div>
        </React.Fragment>
      ))}
      {errors?.sales_info?.variations?.root?.message && (
              <p className="text-red-400">
                {errors?.sales_info?.variations?.root?.message}
              </p>
            )}
      <div className="md:w-1/4 mt-2">
        
        <button
         
          onClick={addVariation}
          className={`${fields?.length >= 3 && `hidden`} border-[1px] px-4 py-1 border-separate border-dashed flex items-center space-x-3 hover:bg-red-100`}
        >
          <Add />
          <span>Add variation</span>
        </button>
        
      </div>
    </div>
  );
}
