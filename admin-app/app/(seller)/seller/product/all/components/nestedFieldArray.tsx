import React from "react";
import { useFieldArray } from "react-hook-form";

type PropsType = {
  nestIndex: any;
  control: any;
  register: any;
  errors: any;
};
import { Add, DeleteOutline } from "@mui/icons-material";

const NestedArray = ({ nestIndex, control, register, errors }: PropsType) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `sales_info.variations.${nestIndex}.option_list`,
  });

  const handleAddOption = (e: any) => {
    e.preventDefault();
    
    append({ option_value: "" });
  }
  return (
    <>
      {fields?.map((field: any, idxOption: number) => (
        <React.Fragment key={field.id}>
          <div className="w-[48%] mr-[3px] flex flex-col items-start align-baseline">
            <div className="flex w-full m-0 p-0 box-border">
              <input
                className="w-[90%] px-2 py-1 bg-transparent appearance-none border-[1px] border-gray-500 rounded-[6px] focus:outline-none focus:bg-white focus:border-blue-400"
                type="text"
                {...register(
                  `sales_info.variations.${nestIndex}.option_list.${idxOption}.option_value`
                )}
              />
              <button
                disabled={fields?.length === 1}
                onClick={(e) => {
                  e.preventDefault();

                  remove(idxOption);
                }}
              >
                <DeleteOutline
                  fontSize="medium"
                  color={fields?.length === 1 ? "disabled" : "inherit"}
                />
              </button>
            </div>
            <div className="min-h-[10px]">
              {errors?.sales_info?.variations?.[nestIndex]?.option_list?.[
                idxOption
              ]?.option_value && (
                <p className="text-red-400">
                  {
                    errors?.sales_info?.variations?.[nestIndex]?.option_list?.[
                      idxOption
                    ]?.option_value.message
                  }
                </p>
              )}
            </div>
          </div>
        </React.Fragment>
      ))}
      <button
        className="px-2 py-1 border-[1px] min-w-[80px] h-[35px] border-collapse bg-blue-400 rounded-md"
        onClick={handleAddOption}
      >
        <span>Add</span>
      </button>
    </>
  );
};
export default NestedArray;
