'use client'

import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

const attributeSchema = z.object({
  attributeName: z.string().nonempty("Attribute name is required"),
  attributeValues: z
    .array(
      z.object({
        valueName: z.string().nonempty("Value is required"),
      })
    )
    .min(1, "At least one value is required"),
});

type AttributeFormData = z.infer<typeof attributeSchema>;

const AttributeManagement: React.FC = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<AttributeFormData>({
    resolver: zodResolver(attributeSchema),
    defaultValues: {
      attributeName: "",
      attributeValues: [{ valueName: "" }],
    },
    mode: "all"
  });
  const axiosPrivate = useAxiosPrivate();
  const [attributes, setAttributes] = useState();

  const getAll = async () => {
      const res = await axiosPrivate.get("/cms-attribute/getAll");
      setAttributes(res.data);
  }
  useEffect(() => {
    getAll();
  }, [])
  console.log(attributes);
  
  const { fields, append, remove } = useFieldArray({
    name: "attributeValues",
    control,
  });

  const onSubmit: SubmitHandler<AttributeFormData> = async (data) => {
    console.log("Attribute data:", data);
    // Call API to save attribute (e.g., axios.post("/api/attributes", data))
    try {
      const res = await axiosPrivate.post("/cms-attribute/create", data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }   
  };

  return (
    <div className="p-4 border rounded max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Manage Attribute</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block font-bold">Attribute Name:</label>
          <input
            type="text"
            {...register("attributeName")}
            className="w-full border p-2 rounded"
          />
          {errors.attributeName && (
            <p className="text-red-500">{errors.attributeName.message}</p>
          )}
        </div>
        <div className="mb-4">
          <h3 className="font-bold mb-2">Attribute Values</h3>
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                {...register(`attributeValues.${index}.valueName`)}
                className="flex-1 border p-2 rounded"
                placeholder="Enter value"
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="bg-red-500 text-white px-2 rounded"
              >
                Delete
              </button>
              {errors.attributeValues?.[index]?.valueName && (
                <p className="text-red-500">
                  {errors.attributeValues[index]?.valueName?.message}
                </p>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => append({ valueName: "" })}
            className="bg-green-500 text-white px-4 py-1 rounded"
          >
            Add Value
          </button>
        </div>
        <button
          type="submit"

          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save Attribute
        </button>
      </form>
    </div>
  );
};

export default AttributeManagement;