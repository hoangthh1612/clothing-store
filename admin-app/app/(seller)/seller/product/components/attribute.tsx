'use client'
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import AttributeValue from "./AttributeValue";

// Dữ liệu attributes giả lập từ server


type PropsType = {
  control: any;
  register: any;
  setValue: any;
  getValues: any;
  errors: any;
  watch: any;
  setIsVariation: any;
  attributeInfo: any;
};

export default function AttributeForm(
  {
    control,
    register,
    setValue,
    getValues,
    errors,
    watch,
    setIsVariation,
    attributeInfo
  }: PropsType
) {

  const {
    fields: attributeFields,
    append: appendAttribute,
    remove: removeAttribute,
  } = useFieldArray({
    control,
    name: "saleInfo.attributes",
  });
  

  const [selectedAttributes, setSelectedAttributes] = useState<any>();
  console.log(attributeFields);
  const realtimeAttributes = watch("saleInfo.attributes");
  console.log(realtimeAttributes);

  return (

    <div>
      {attributeFields?.map((field, index) => {

        const selectedAttributeId = watch(`saleInfo.attributes.${index}.id`);
        const selectedAttr = attributeInfo.find((attr: any) => attr.id === selectedAttributeId);
        const availableValues = selectedAttr?.attributeValues || [];
        console.log(availableValues);

        
        return (
          <div key={field.id} style={{ border: "1px solid gray", marginBottom: 12, padding: 8 }}>
            {/* Attribute select */}
            <Controller
              control={control}
              name={`saleInfo.attributes.${index}.id`}
              render={({ field }) => (
                <select
                  //value={selectedAttributes?.attributeName} 
                  onChange={(e) => {
                    const attrId = Number(e.target.value);
                    const attr = attributeInfo.find((a: any) => a.id === attrId);
                    setSelectedAttributes(attr);
                    console.log(attr);

                    if (!attr) return;
                    setValue(`saleInfo.attributes.${index}.id`, attr.id);
                    setValue(`saleInfo.attributes.${index}.attributeName`, attr.attributeName);
                    setValue(`saleInfo.attributes.${index}.attributeValues`, [{ id: 0, valueName: "" }]);
                  }}
                >
                  <option value="">Chọn thuộc tính</option>
                  {attributeInfo.map((attr: any) => (
                    <option key={attr.id} value={attr.id}>{attr.attributeName}</option>
                  ))}
                </select>
              )}
            >

            </Controller>  
            <AttributeValue
              control={control}
              index={index}
              watch={watch}
              availableValues={availableValues}
              setValue={setValue}

            />
          </div>
        )
      })}
      <button
        type="button"
        className="bg-blue-500 text-white p-2 rounded"
        onClick={() =>
          appendAttribute({
            id: "",
            attributeName: "",
            attributeValues: [],
          })
        }
      >
        + Thêm thuộc tính
      </button>

    </div>



    //   <br /><br />
    //   <button type="submit">Gửi</button>
  );
}