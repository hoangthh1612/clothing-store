import axios from 'axios';

const orderAPI = {
    getOrdersOfUser: async (userId, status, searchText, page, noOfRecords) => {
        try {
            const response = await axios.post(
                'http://localhost:8080/api/order/get_oders_of_user',
                {
                    userId: userId,
                    status: status,
                    searchText: searchText,
                    startRecord: (page - 1) * noOfRecords,
                    noOfRecords: noOfRecords
                }
            );
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    getOrderByOrderCode: async (order_code) => {
        try {
            const response = await axios.post(
                'http://localhost:8080/api/order/get_order_by_order_code',
                {
                    order_code: order_code
                }
            );
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    createOrder: async (order_status, payment_method, total_price, shipping_address, userId, name, email, phone, Order_details) => {
        try {
            const response = await axios.post(
                'http://localhost:8080/api/order',
                {
                    order_status: order_status,
                    payment_method: payment_method,
                    total_price: total_price,
                    shipping_address: shipping_address,
                    userId: userId,
                    name: name,
                    email: email,
                    phone: phone,
                    Order_details: Order_details,
                }
            );
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
}

export default orderAPI;