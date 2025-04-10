import { EditOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Add, DeleteOutline } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import OptionList from "./option-list";
import NewCombineVariation from "./table-combine";
import axios from "@/api/axios";
import { message } from "antd";

type PropsType = {
  product: any;
  isEditVariation: any;
  setIsEditVariation: any;
  productVariants: any;
  setProduct: any;
};

type FormValues = {
  variations: {
    variationId: number;
    name: string;
    option_list: {
      tier_name: string[],
      optionId?: number | null;
      option_value: string;
    }[];
  }[];
  models?: {
    price: number;
    quantity: number;
    image: string | null;
  } 
};
const ProductVariation = ({
  product,
  isEditVariation,
  setIsEditVariation,
  productVariants,
  setProduct
}: PropsType) => {
  const [tierListOption, setTierListOption] = useState<any>();

  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Edit basic product successfully',
    });
  };
  const validateVariation = z.object({
    variations: z.array(
      z.object({
        variationId: z.number(),
        name: z.string().nonempty({message: "Required"}),
        option_list: z.array(
          z.object({
            
            optionId: z.coerce.number(),
            option_value: z.string().nonempty({message: "Required"})
          })
        ),
      })
    ),
    models: z.array(
      z.object({
        tier_name: z.array(z.string()),
        image: z.string(),
        price: z.coerce.number()
      .int({message: "Price is required"})
      .gte(1000, {message: "Price must be more than 1000 VND"})
      .lte(100000000, {message: "Price must be less than 100.000.000 VND"}),
      quantity: z.coerce.number()
      .int({message: "Quantity is required"})
      .gte(0, {message: "Product Quantity must be >= 0"})
      })
    )
  });
  
  
  const form = useForm<FormValues>({
    resolver: zodResolver(validateVariation),
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
    name: "variations",
  });
  useEffect(() => {
    if (product) {
      product.variations?.forEach((item: any, index: number) => {
        update(index, {
          variationId: item.id,
          name: item.type_name,
          option_list: item.variation_options?.map((i: any) => ({
            optionId: i.id,
            option_value: i.type_value,
          })),
        });
      });
    }
  }, [product, isEditVariation]);
  const onSubmit = async (values: FormValues) => {
    //console.log(values);
    const data = {...values, productId: product.id};
    console.log(data);
    try {
      const res = await axios.post('/product/updateAndCreateProductVariation', data, {
        headers: { "Content-Type": "application/json" },
          withCredentials: true,
      })
      success();
      const getProduct = await axios.get(`/product/getProductById/${product.id}`);
      setProduct(getProduct.data);
      console.log(res.data);

      setTimeout(() => {
        setIsEditVariation(false);
      }, 1000);
      
    } catch (error) {
      console.log(error);
      
    }
    
  }
  const handleCancelEditVariation = (e: any) => {
    e.preventDefault();
    setValue("variations", []);
    // product.variations?.forEach((item: any, index: number) => {
    //   update(index, {
    //     variationId: item.id,
    //     name: item.type_name,
    //     option_list: item.variation_options?.map((i: any) => ({option_value: i.type_value})),
    //   });
    // });
    setIsEditVariation(false);
  }
  useEffect(() => {
    if(productVariants) {
     
      let data = productVariants?.map((item: any) => {
        let result = [];
        for(const data of item?.variation_options) {
          result.push(data.option);
        }
        return result;
        // return {
        //   tier_name: result
        // }
      });
      setTierListOption(data);
      
    }
  }, [productVariants])
  //console.log(tierListOption);
  console.log(productVariants);
  
  const variations = useWatch({ control, name: "variations" });
  const [combinations, setCombinations] = useState<any>();
  console.log(variations);
  
  function cartesianProduct(arrays: any) {
    return arrays.reduce(
      (acc: any, curr: any) => {
        return acc?.flatMap((item: any) => {
          return curr?.map((value: any) => {
            return Array.isArray(item) ? [...item, value] : [item, value];
          });
        });
      },
      [[]]
    );
  }
  useEffect(() => {
 
      if (variations && tierListOption) {
        let options = variations?.map((variation: any) =>
          variation.option_list.map((option: any) => option.option_value)
        );
        let existedOptions = variations.map((variation: any) =>
          variation.option_list.filter((option: any) => option.optionId)
        );

        let existed = existedOptions?.map((variation: any) =>
          variation.map((option: any) => option.option_value)
        );

        const combinations = cartesianProduct(options);

        const tier = cartesianProduct(existed);

        setCombinations(
          combinations?.filter(
            (item: any) =>
              !tier.some((i: any) => i.toString() === item.toString())
          )
        );

        //setCombinations(combinations);
      }
  } , [variations, tierListOption])
  console.log(combinations);
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col md:w-full">
        {fields?.map((item: any, index: number) => (
          <div key={index} className="bg-gray-100 mb-2 p-2 border-[1px] rounded-sm">
            <div className="flex mb-3">
              <div className="md:flex md:flex-1">
                <p className="text-[16px]">
                  {`${index + 1}. Variation name: `}
                  <span className="text-red-400">{item.name}</span>
                </p>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <div className="w-1/5">
                <p className="text-[16px]">Variation option</p>
              </div>
              <div className="grid grid-cols-3 gap-2 w-[90%]">
                <OptionList
                  optionList={product?.variations[index].variation_options}
                  idx={index}
                  control={control}
                  register={register}
                  errors={errors}
                  isEditVariation={isEditVariation}
                  numsOption={
                    product.variations[index].variation_options?.length
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {
        combinations?.length !== 0 && (
          <NewCombineVariation
            control={control}
            register={register}
            setValue={setValue}
            errors={errors}
            combinations={combinations}
            variations={variations}
          />
        )
      }
      {contextHolder}
      {isEditVariation && (
        <div className="flex space-x-3">
          <button
            //onClick={handleSubmitBasicInfo}
            className="px-3 py-1 min-w-[80px] bg-blue-400 hover:bg-blue-500 rounded-md"
          >
            Save
          </button>
          <button
            onClick={handleCancelEditVariation}
            className="px-3 py-1 min-w-[80px] border-[1px] bg-red-400 rounded-md"
          >
            Cancel
          </button>
        </div>
      )}
    </form>
  );
};

export default ProductVariation;
