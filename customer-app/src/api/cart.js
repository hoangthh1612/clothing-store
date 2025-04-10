import axios from 'axios';

const cartAPI = {
    getCartOfUserId: async (userId) => {
        try {
            const response = await axios.post(
                'http://localhost:8080/api/cart/get_cart_of_user_id',
                {
                    userId: userId
                }
            );
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },

    getTotalPrice: async (userId) => {
        try {
            const response = await axios.post(
                'http://localhost:8080/api/cart/get_total_price',
                {
                    userId: userId
                }
            );
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },

    checkVariantExistsInCart: async (cartId, variantId) => {
        try {
            const response = await axios.post(
                'http://localhost:8080/api/cart/check_variant_exists_in_cart',
                {
                    cartId: cartId,
                    variantId: variantId,
                    // quantity: quantity,
                }
            );
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },

    createCartProduct: async (cartId, variantId, quantity) => {
        try {
            const response = await axios.post(
                'http://localhost:8080/api/cart/create_cart_product',
                {
                    cartId: cartId,
                    variantId: variantId,
                    quantity: quantity,
                }
            );
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },

    updateCartTotalPrice: async (userId, total_price) => {
        try {
            const response = await axios.post(
                'http://localhost:8080/api/cart/update_cart_total_price',
                {
                    userId: userId,
                    total_price: total_price
                }
            );
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

}
export default cartAPI;