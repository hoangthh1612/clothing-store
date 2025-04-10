import axios from 'axios';

const productAPI = {
    getProductById: async (id) => {
        try {
            const response = await axios.post(
                'http://localhost:8080/api/product/get_product_by_id',
                {
                    id: id
                }
            );
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    getReviewsOfProduct: async (productId) => {
        try {
            const response = await axios.post(
                'http://localhost:8080/api/product/get_reviews_of_product',
                {
                    productId: productId
                }
            );
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    createProductReview: async (review_title, review_content, rating, productId, userId) => {
        try {
            const response = await axios.post(
                'http://localhost:8080/api/product/create_product_review',
                {
                    review_title: review_title,
                    review_content: review_content,
                    rating: rating,
                    productId: productId,
                    userId: userId
                }
            );
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
}
export default productAPI;