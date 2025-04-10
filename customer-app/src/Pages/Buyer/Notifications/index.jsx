import React, { Fragment, useState } from 'react';
import {
  List,
  Card,
  Layout,
  Pagination,
  Typography,
  Segmented,
  Modal,
} from 'antd';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { setNumOfNotifications } from 'Redux/actions';
// import types from 'Redux/types';
// import selectors from 'Redux/selectors';
// import actions from 'Redux/actions';
import notificationAPI from 'api/notification';

const Notifications = () => {
  const dispatch = useDispatch();
  // const notifications = useSelector(selectors.takeAll);

  const [userId, setUserId] = useState(2);

  const [noOfRecords, setNoOfRecords] = useState(4);

  const [unreadTotal, setUnreadTotal] = useState();

  const [allTotal, setAllTotal] = useState();

  const [unreadCurrentPage, setUnreadCurrentPage] = useState(1);

  const [allCurrentPage, setAllCurrentPage] = useState(1);

  const [unreadNotifications, setUnreadNotifications] = useState([]);

  const [allNotifications, setAllNotifications] = useState([]);

  const [unread, setUnread] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState();

  const getUnreadNotifications = async (page) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/notification/get_notifications_of_user',
        {
          userId: userId,
          startRecord: (page - 1) * noOfRecords,
          noOfRecords: noOfRecords,
        }
      );
      // setUnreadNotifications(response.data.unread);
      // setUnreadTotal(response.data.totalUnread);

      //dispatch(actions.notifications.getNotifications(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  const getAllNotifications = async (page) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/notification/get_notifications_of_user',
        {
          userId: userId,
          startRecord: (page - 1) * noOfRecords,
          noOfRecords: noOfRecords,
        }
      );
      setAllNotifications(response.data.all);
      setAllTotal(response.data.totalAll);
    } catch (error) {
      console.log(error);
    }
  };

  const updateReadStatus = async (notificationId, readStatus) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/notification/update',
        {
          notificationId: notificationId,
          readStatus: readStatus,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickToNotification = async (notificationId, readStatus) => {
    try {
      await updateReadStatus(notificationId, readStatus);
      // const newUnreadNotifications = notifications.unread.filter(
      //   (item) => item.id !== notificationId
      // );
      // const totalUnread = notifications.totalUnread - 1;
      // const newList = {
      //   ...notifications,
      //   unread: { ...newUnreadNotifications },
      //   totalUnread,
      // };
      // setUnreadNotifications(newList);
      //dispatch(actions.notifications.removeNotifications(notificationId));
    } catch (error) { }
  };
  // console.log('notifications', notifications);
  // useEffect(() => {
  //   getUnreadNotifications(unreadCurrentPage);
  //   getAllNotifications(allCurrentPage);
  //   const noti = notificationAPI.getUnreadNotifications(1, 1, 4);
  //   console.log("noti", noti);
  // }, []);

  // useEffect(() => {
  //   dispatch(setNumOfNotifications(unreadTotal));
  // }, [unreadNotifications]);

  // const { Title, Text } = Typography;

  return (
    <div>Notifications</div>
    // <Layout style={{ padding: '24px 50px' }}>
    //   <div className="mb-xl">
    //     <Segmented
    //       options={[
    //         { label: 'Unread', value: 1 },
    //         { label: 'All', value: 2 },
    //       ]}
    //       onChange={(value) => {
    //         if (value === 1) {
    //           setUnread(true);
    //         } else {
    //           setUnread(false);
    //         }
    //       }}
    //     />
    //   </div>

    //   {unread ? (
    //     <Fragment>
    //       <Title level={3}>UNREAD NOTIFICATIONS</Title>
    //       <List
    //         grid={{ gutter: 16, column: 1 }}
    //         dataSource={notifications.unread}
    //         renderItem={(item) => (
    //           <List.Item key={item.id}>
    //             <Card
    //               title={
    //                 <span style={{ color: '#1890ff' }}>
    //                   [{item.Notification.User.username}] -{' '}
    //                   {item.Notification.title}
    //                 </span>
    //               }
    //               onClick={() => {
    //                 setSelectedItem(item);
    //                 setIsModalOpen(true);
    //                 handleClickToNotification(item.id, true);
    //               }}>
    //               <p>{item.Notification.content}</p>
    //               <p>
    //                 {new Date(item.Notification.createAtDate).toLocaleString()}
    //               </p>
    //             </Card>
    //           </List.Item>
    //         )}
    //       />

    //       <Pagination
    //         className="text-center"
    //         current={unreadCurrentPage}
    //         onChange={(unreadCurrentPage) => {
    //           console.log('allCurrentPage', notifications);
    //           getUnreadNotifications(unreadCurrentPage);
    //           setUnreadCurrentPage(unreadCurrentPage);
    //         }}
    //         total={notifications.totalUnread}
    //         pageSize={noOfRecords}
    //       />
    //     </Fragment>
    //   ) : (
    //     <Fragment>
    //       <Title level={3}>ALL NOTIFICATIONS</Title>
    //       <List
    //         grid={{ gutter: 16, column: 1 }}
    //         dataSource={notifications.all}
    //         renderItem={(item) => (
    //           <List.Item>
    //             <Card
    //               title={
    //                 <span style={{ color: '#1890ff' }}>
    //                   [{item.Notification.User.username}] -{' '}
    //                   {item.Notification.title}
    //                 </span>
    //               }>
    //               <p>{item.Notification.content}</p>
    //               <p>
    //                 {new Date(item.Notification.createAtDate).toLocaleString()}
    //               </p>
    //             </Card>
    //           </List.Item>
    //         )}
    //       />
    //       <Pagination
    //         className="text-center"
    //         current={allCurrentPage}
    //         onChange={(allCurrentPage) => {
    //           getAllNotifications(allCurrentPage);
    //           setAllCurrentPage(allCurrentPage);
    //         }}
    //         total={allTotal}
    //         pageSize={noOfRecords}
    //       />
    //     </Fragment>
    //   )}

    //   {isModalOpen ? (
    //     <Modal
    //       title="Notification detail"
    //       open={isModalOpen}
    //       onCancel={() => {
    //         setIsModalOpen(false);
    //       }}
    //       bodyStyle={{ textAlign: 'center' }}
    //       footer={null}>
    //       <Card
    //         title={
    //           <span style={{ color: '#1890ff' }}>
    //             [{selectedItem.Notification.User.username}] -{' '}
    //             {selectedItem.Notification.title}
    //           </span>
    //         }>
    //         <p>{selectedItem.Notification.content}</p>
    //         <p>
    //           {new Date(
    //             selectedItem.Notification.createAtDate
    //           ).toLocaleString()}
    //         </p>
    //       </Card>
    //     </Modal>
    //   ) : (
    //     ''
    //   )}
    // </Layout>
  );
};

export default Notifications;
