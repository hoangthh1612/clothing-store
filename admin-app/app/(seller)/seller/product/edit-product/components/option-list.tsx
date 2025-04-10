type PropsType = {
  idx: any;
  control: any;
  register: any;
  errors: any;
  optionList: any;
  isEditVariation: any;
  numsOption: number
};
import { Add, DeleteOutline } from "@mui/icons-material";
import React, { useEffect } from "react";
import { useFieldArray } from "react-hook-form";


const OptionList = ({
  idx,
  control,
  register,
  errors,
  optionList,
  isEditVariation,
  numsOption
}: PropsType) => {
  const { fields, remove, append, update } = useFieldArray({
    control,
    name: `variations.${idx}.option_list`,
  });
  //   useEffect(() => {
  //    optionList?.forEach((item: any, index: number) => {
  //         update(index, {option_value: item.type_value});
  //     })
  //   }, [optionList])
  
  return (
    <>
      {fields?.map((field: any, idxOption: number) => (
        <React.Fragment key={field.id}>
          <div className="flex flex-col">
            <div className="flex">
              <input
                disabled={!isEditVariation}
                className="w-[90%] px-2 py-1 bg-transparent appearance-none border-[1px] border-gray-500 rounded-[6px] focus:outline-none focus:bg-white focus:border-blue-400"
                type="text"
                {...register(
                  `variations.${idx}.option_list.${idxOption}.option_value`
                )}
              />
              {
                (idxOption + 1) > numsOption && (
                  <button
                    disabled={fields?.length === 1}
                    onClick={(e) => {
                      e.preventDefault();
                      remove(idxOption);
                    }}
                  >
                    <DeleteOutline />
                  </button>
                )
              }
            </div>
            {errors?.variations?.[idx]?.option_list?.[
              idxOption
            ]?.option_value && (
              <p className="text-red-400">
                {
                  errors?.variations?.[idx]?.option_list?.[
                    idxOption
                  ]?.option_value.message
                }
              </p>
            )}
          </div>
        </React.Fragment>
      ))}
      {
        isEditVariation && (
          <button
            className="h-[34px] w-[60px] flex items-center px-3 py-1 border-[1px] border-collapse rounded-[2px]"
            onClick={(e) => {
              e.preventDefault();
              append({ option_value: "", optionId: null });
            }}
          >
            <span>Add</span>
          </button>
        )
      }
    </>
  );
};
export default OptionList;
