import axios from 'axios';

const notificationAPI = {

    getUnreadNotifications: async (userId, page, noOfRecords) => {
        try {
            const response = await axios.post(
                'http://localhost:8080/api/notification/get_notifications_of_user',
                {
                    userId: userId,
                    startRecord: (page - 1) * noOfRecords,
                    noOfRecords: noOfRecords,
                }
            );
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },

    // getAllNotifications: async (page) => {
    //     try {
    //         const response = await axios.post(
    //             'http://localhost:8080/api/notification/get_notifications_of_user',
    //             {
    //                 userId: userId,
    //                 startRecord: (page - 1) * noOfRecords,
    //                 noOfRecords: noOfRecords,
    //             }
    //         );
    //         setAllNotifications(response.data.all);
    //         setAllTotal(response.data.totalAll);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // },

    // updateReadStatus: async (notificationId, readStatus) => {
    //     try {
    //         const response = await axios.post(
    //             'http://localhost:8080/api/notification/update',
    //             {
    //                 notificationId: notificationId,
    //                 readStatus: readStatus,
    //             }
    //         );
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    createNotification: async (title, content, avatar, userId, typeId) => {
        try {
            const response = await axios.post(
                'http://localhost:8080/api/notification',
                {
                    title: title,
                    content: content,
                    avatar: avatar,
                    userId: userId,
                    typeId: typeId,
                }
            );
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
}

export default notificationAPI

