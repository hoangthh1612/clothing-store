import axios from 'axios';

const userAPI = {
    getUserById: async (userId) => {
        try {
            const response = await axios.post(
                'http://localhost:8080/api/user/get_user_by_id',
                {
                    userId: userId
                }
            );
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    updateUserInfo: async (user) => {
        try {
            const response = await axios.post('http://localhost:8080/api/user/update_user_info', user)
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    changePassword: async (password_data) => {
        try {
            const response = await axios.post('http://localhost:8080/api/user/change_password', password_data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
}

export default userAPI;