import { Modal, Rate, message } from "antd";
import { useState } from "react";
import useAxiosPrivate from "../../../../Hooks/useAxiosPrivate";

const getVariation = (skus) => {
    let result = "";
    for (const item of skus) {
      let str = `${item.variation_options.variation_name}: ${item.variation_options.type_value}`;
      if (result !== "") {
        result = result + "," + str;
        break;
      }
      result += str;
      //result[`${item.variation_options.variation_name}`] = item.variation_options.type_value
    }
    return result;
  };

const ShowFormReview = ({
    isModalReview,
    setIsModalReview,
    values,
    setValues
}) => {
    const [rating, setRating] = useState(0);
    const [reviewContent, setReviewContent] = useState('');
    const axiosPrivate = useAxiosPrivate();
    const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'You have successfully reviewed the product',
    });
  };
    const handleRating = (value) => {
        console.log(value);
        setRating(value);
    }
    const handleReviewContent = (e) => {
        setReviewContent(e.target.value);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(rating === 0) {
            return;
        }
        let title = values.product_detail?.skus_variation_options?.length === 0 ? "Review product" :
        `Variation: ${getVariation(values.product_detail?.skus_variation_options)}`
        const data = {
            rating,
            review_content: reviewContent,
            productId: values?.product_detail.Product.id,
            review_title: title

        }
        console.log(data);
        try {
            const res =  await axiosPrivate.post('/product-review/create', data);
            console.log(res.data);
            success();
            setValues(null);
                setRating(0);
                setReviewContent('');
            setTimeout(() => {
                setIsModalReview(false);
            }, 500);

        } catch (error) {
            console.log(error);
        }
    }
    return (
      <Modal
        width="40%"
        open={isModalReview}
        footer={null}
        title="Create review product"
        onCancel={() => {
          // setKeyDetail(0);
          setIsModalReview(false);
          setValues(null);
          setRating(0);
          setReviewContent('');
        }}
      >
        <div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-5">
              <p className="font-bold text-[18px]">Rating:</p>
              <Rate value={rating} onChange={handleRating} />
            </div>
            <div className="flex flex-col mb-5">
              <p className="font-bold text-[18px]">Review content:</p>
              <textarea 
                value={reviewContent}
                className="w-full px-2 pl-1 pb-6  bg-transparent appearance-none border-[1px] border-gray-500 rounded-[6px] focus:outline-none focus:bg-white focus:border-blue-400" 
                onChange={handleReviewContent}    
            />

            </div>
            {contextHolder}
            <div className="flex justify-center space-x-6 mt-5">
                <button className="px-3 py-1 rounded bg-blue-400">Save</button>
                {/* <button 
                    className="px-3 py-1 rounded border-[1px] border-red-150"
                    onClick={(e) => {e.preventDefault(); setIsModalReview(false)}}
                >Cancel</button> */}
            </div>
          </form>
        </div>
      </Modal>
    );
}

export default ShowFormReview;