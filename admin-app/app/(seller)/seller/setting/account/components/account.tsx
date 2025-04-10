"use client";

//import Container from 'Components/Common/Container';
import {
  Form,
  Typography,
  Input,
  Tag,
  Table,
  Select,
  Button,
  Space,
  Divider,
  Row,
  Col,
  Upload,
  Modal,
} from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  LockOutlined,
  HomeOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ConfigProvider } from 'antd';
import { StyleProvider } from '@ant-design/cssinjs';
import { CircularProgress } from "@mui/material";
import ChooseAddressModal from "./chooseAddress";

type MyFormValues = {
  avatar: string;
  fullname: string;
  phone_number: string;
  address: string;
};

const { Title, Text } = Typography;
const { Search } = Input;
const Account = () => {
  const axiosPrivate = useAxiosPrivate();
  const [user, setUser] = useState<any>();

  const [editingUser, setEditingUser] = useState({});

  const [isEditing, setIsEditing] = useState(false);

  // change password modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [reNewPassword, setReNewPassword] = useState("");

  const [passwordMessage, setPasswordMessage] = useState("");
  const [image, setImage] = useState<any>(null);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [urlImage, setUrlImage] = useState<any>();
  const [isLoadingImage, setIsLoadingImage] = useState(false);

  //////////////

  const [isDetail, setIsDetail] = useState(false);
  const [infoProduct, setInfoProduct] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [keyDetail, setKeyDetail] = useState(0);

  const [address, setAddress] = useState("{}");

  const [inputAddress, setInputAddress] = useState("");
  useEffect(()=>{

    const rs = JSON.parse(address)
    setInputAddress(rs.detailAddress + ', ' + rs.wardName + ', ' + rs.districtName + ', ' + rs.provinceName);

  }, [address])

  useEffect(()=>{
    if(user){
      setAddress(user.address)
    }
  }, [user])

  ////////////////////////////////////

  const handleChangePassword = () => {
    setIsModalOpen(true);
  };

  // type password
  const handleTypeCurrentPassword = (e: any) => {
    const { value } = e.target;
    setCurrentPassword(value);
  };

  const handleTypeNewPassword = (e: any) => {
    const { value } = e.target;
    setNewPassword(value);
  };

  const handleTypeReNewPassword = (e: any) => {
    const { value } = e.target;
    setReNewPassword(value);
  };

  const handleSavePassword = async () => {
    // if (reNewPassword != newPassword) {
    //   setPasswordMessage('New passwords not match');
    // } else {
    //   const password_data = {
    //     userId: user.id,
    //     current_password: currentPassword,
    //     new_password: newPassword
    //   }
    //   const res = await userAPI.changePassword(password_data);
    //   console.log("data: ", password_data, res);
    //   if (res.code === '201') {
    //     setPasswordMessage('Current password is incorrect');
    //   } else {
    //     setPasswordMessage('Password changed successfully');
    //     setCurrentPassword('');
    //     setNewPassword('');
    //     setReNewPassword('');
    //     setIsModalOpen(false);
    //   }
    // }
    // toast(passwordMessage, {
    //   position: 'top-right',
    // });
  };
  const validateUserInfo = z.object({
    avatar: z.string().nonempty({ message: "Avatar is required" }),
    fullname: z.string().nonempty({ message: "Fullname is required" }),
    phone_number: z.string().nonempty({ message: "Phone number is required" }),
    address: z.string().nonempty({ message: "Address is required" }),
  });
  const form = useForm<MyFormValues>({
    resolver: zodResolver(validateUserInfo),
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

  const onSubmit = async (values: any) => {
    console.log(values);

    const rt = {...values, address2: address}

    try {
      const res = await axiosPrivate.put('/user/updateUser', rt);
      console.log(res.data);
      
      toast("Updated successfully", {
        type: "success",
        position: "top-center",
      });
    } catch (error) {
      console.log(error);
      
    }
  };

  const uploadImage = async (image: any) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "qgxrg9uu");
    try {
      setUploadingImg(true);
      let res = await fetch(
        "http://api.cloudinary.com/v1_1/hoangthh1612/image/upload",
        {
          method: "post",
          body: data,
        }
      );
      const urlData = await res.json();
      setUploadingImg(false);
      return urlData.url;
    } catch (err) {
      setUploadingImg(false);
      console.log(err);
    }
  };
 
  const validateImg = async (e: any) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
    
    try {
      setIsLoadingImage(true);
      const url = await uploadImage(e.target.files[0]);

      url && setUrlImage(url);
      url && setIsLoadingImage(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    urlImage && setValue("avatar", urlImage);
  }, [urlImage])
    console.log(urlImage);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axiosPrivate.get("/user/verifyUser");
        //console.log(res.data);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    if (user) {
      setValue("avatar", user.avatar);
      setImagePreview(user.avatar);
      setValue("fullname", user.fullname);
      setValue("phone_number", user.phone_number);
      setValue("address", inputAddress);
    }
  }, [user]);

  useEffect(()=>{
    setValue("address", inputAddress)
}, [inputAddress])


  if (!user) {
    return <div>Loading...</div>;
  }
  //form onSubmit={handleSubmit(onSubmit)}
  return (
    <div className="max-w-[850px] m-auto bg-white px-5 py-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={2}>Account Infomation - {user.username}</Title>
          </Col>
          <Col>
            <Row align="middle">
              <Controller
                control={control}
                name={`avatar`}
                render={({ field: { onBlur, value } }) => (
                  <div className="w-[100px] h-[100px] border-[1px] border-dashed border-gray-300 flex flex-col items-center rounded-[50%] object-cover justify-center relative">
                    {isLoadingImage && (
                      <div>
                        <CircularProgress size={25} />
                      </div>
                    )}
                    {!isLoadingImage && (
                      <>
                        {imagePreview && <img src={imagePreview} className="h-full w-full rounded-[50%] object-cover" />}
                        <input
                          type="file"
                          hidden
                          accept="image/png, image/jpeg"
                          id="image-upload"
                          onChange={validateImg}
                          onBlur={onBlur}
                        />
                        <label
                          htmlFor="image-upload"
                          className="cursor-pointer absolute image-upload-label"
                        >
                          <i className="add-picture-icon">+</i>
                        </label>
                      </>
                    )}
                  </div>
                )}
              />

              {errors?.avatar?.message && (
                <p className="text-red-400">{errors?.avatar?.message}</p>
              )}

              {/* <img
              src={
                user?.avatar || "https://www.svgrepo.com/show/382111/female-avatar-girl-face-woman-user-5.svg"
              }
              alt="avatar"
              
              className="w-[100px] h-[100px] rounded-[50%] object-cover"
            /> */}
              {/* <Upload>
              <Button type="primary">Change</Button>
            </Upload> */}
            </Row>
          </Col>
        </Row>
        <Divider />
        <div>
          <Row className="space-x-2 flex items-center">
            <Col>
              <UserOutlined className="text-4xl pe-xl" />
            </Col>
            <Col flex={1}>
              <Row justify={"space-between"} align="middle">
                <Text className="w-[100%]" strong>Full name</Text>
                <input
                  className="w-[90%] px-2 py-1 bg-transparent appearance-none border-2 border-gray-500 rounded-[6px] focus:outline-none focus:bg-white focus:border-blue-400"
                  type="text"
                  {...register("fullname")}
                />
                {errors?.fullname?.message && (
                  <p className="text-red-400">{errors.fullname.message}</p>
                )}
                {/* <input

                name="fullname"
                value={user.fullname}
                onChange={handleChange}
              /> */}
              </Row>
            </Col>
          </Row>
          <Divider />
          <Row className="space-x-2 flex items-center">
            <Col>
              <PhoneOutlined className="text-4xl pe-xl" />
            </Col>
            <Col flex={1}>
              <Row justify={"space-between"} align="middle">
                <Text className="w-[100%]" strong>Phone number</Text>
                <input
                  //name={`basic_info.brand`}
                  className="w-[90%] px-2 py-1 bg-transparent appearance-none border-2 border-gray-500 rounded-[6px] focus:outline-none focus:bg-white focus:border-blue-400"
                  type="text"
                  {...register("phone_number")}
                />
              </Row>
              {errors?.phone_number?.message && (
                <p className="text-red-400">{errors.phone_number.message}</p>
              )}
            </Col>
          </Row>
          <Divider />
          <Row className="space-x-2 flex items-center">
            <Col>
              <HomeOutlined className="text-4xl pe-xl" />
            </Col>
            <Col flex={1}>
              <Row justify={"space-between"} align="middle">
                <Text className="w-[100%]" strong>Address</Text>
                <input
                  //name={`basic_info.brand`}
                  className="w-[89%] px-2 py-1 bg-transparent appearance-none border-2 border-gray-500 rounded-[6px] focus:outline-none focus:bg-white focus:border-blue-400"
                  type="text"
                  {...register("address")}
       
                />
                <Button onClick={(e)=>{
                    e.preventDefault();

                    setIsDetail(pre => !pre);

                }}>Change</Button>
              </Row>
              {errors?.address?.message && (
                <p className="text-red-400">{errors.address.message}</p>
              )}
            </Col>
          </Row>
          <Divider />
          <Row className="space-x-2 flex items-center">
            <Col>
              <MailOutlined className="text-4xl pe-xl" />
            </Col>
            <Col flex={1}>
              <Row justify={"space-between"} align="middle">
                <Text className="w-[100%]" strong>Email</Text>
                <input
                  //name={`basic_info.brand`}
                  className="w-[90%] px-2 py-1 bg-transparent appearance-none border-2 border-gray-500 rounded-[6px] focus:outline-none focus:bg-white focus:border-blue-400"
                  type="text"
                  defaultValue={user.email}
                  disabled={true}
                />
              </Row>
            </Col>
          </Row>
          <Divider />
          <Row className="space-x-2 flex items-center">
            <Col>
              <LockOutlined className="text-4xl pe-xl" />
            </Col>
            <Col flex={1}>
              <Row justify={"space-between"} align="middle">
                <Text strong>Password</Text>
                {/* <Input
                name="password"
                value={user.password}
              /> */}
                <Button onClick={handleChangePassword}>Change Password</Button>
              </Row>
              {/* <Divider /> */}
            </Col>
          </Row>
          <Divider />
          <Row justify="end">
            <Space>
              <button className="bg-blue-400 px-3 py-1 rounded-md">
                <span>Save</span>
              </button>
              <ToastContainer />
            </Space>
          </Row>
        </div>
      </form>
      {isModalOpen ? (
        <Modal
          title="Change Password"
          open={isModalOpen}
          onCancel={() => {
            setIsModalOpen(false);
          }}
          bodyStyle={{ textAlign: "center" }}
          cancelButtonProps={{ type: "default" }}
          footer={[
            <Button key="back" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={handleSavePassword}
              disabled={
                currentPassword === "" ||
                newPassword === "" ||
                reNewPassword === ""
              }
            >
              Save Change
            </Button>,
          ]}
        >
          <Row>
            <Col flex={1}>
              <Row justify={"space-between"} align="middle">
                <Text strong>Current password</Text>
                <Input.Password className="w-[90%]"
                  name="password"
                  placeholder="Current password"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  onChange={handleTypeCurrentPassword}
                />
              </Row>
              <Divider />
            </Col>
          </Row>

          <Row>
            <Col flex={1}>
              <Row justify={"space-between"} align="middle">
                <Text strong>New Password</Text>
                <Input.Password
                  name="new_password"
                  placeholder="New Password"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  onChange={handleTypeNewPassword}
                />
              </Row>
              <Divider />
            </Col>
          </Row>

          <Row>
            <Col flex={1}>
              <Row justify={"space-between"} align="middle">
                <Text strong>Re-enter new Password</Text>
                <Input.Password
                  name="re_new_password"
                  placeholder="Re-enter new Password"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  onChange={handleTypeReNewPassword}
                />
              </Row>
              <Divider />
            </Col>
          </Row>
        </Modal>
      ) : (
        ""
      )}

          <ConfigProvider>
            <StyleProvider hashPriority="high">
              <ChooseAddressModal isDetail={isDetail}
                address = {address}
                setAddress = {setAddress}
                infoProduct={infoProduct}
                setIsDetail={setIsDetail}
                keyDetail={keyDetail}
                setKeyDetail={setKeyDetail}/>
              </StyleProvider>
          </ConfigProvider>
    </div>
  );
};

export default Account;
