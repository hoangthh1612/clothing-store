"use client";

import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import {
  DeleteOutlined,
  EditOutlined,
  FileSearchOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Image,
  Input,
  Modal,
  Popconfirm,
  Table,
  Typography,
  message,
} from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const { RangePicker } = DatePicker;

const formatCurrency = (amount: number) => {
  const options = {
    style: "currency",
    currency: "VND"
  };

  return amount.toLocaleString("vi-VN", options).replace("₫", "đ");
}
const formatNumber = (amount: number) => {
  const options = {
    style: "currency",
    currency: "VND"
  };

  return amount.toLocaleString("vi-VN", options).replace("₫", "");
}

const VoucherManagement = () => {
  const [data, setData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [vouchers, setVouchers] = useState<any>();
  const [searchedText, setSearchedText] = useState("");
  const [isDetail, setIsDetail] = useState(false);
  const [infoProduct, setInfoProduct] = useState<any>(null);
  const [showVouchers, setShowVouchers] = useState<any>(null);
  const [dateRange, setDateRange] = useState<any>(null);
  const router = useRouter();
  const axiosPrivate = useAxiosPrivate();


  //onst URL = process.env.BASE_URL;
  const [messageApi, contextHolder] = message.useMessage();
  const deletedSuccess = () => {
    messageApi.open({
      type: "success",
      content: "Deleted voucher successfully",
    });
  };
  
  const onDetailProduct = (record: any) => {
    setInfoProduct(record);
    setIsDetail(true);
  };

  const getVoucherOfStore = async () => {
    try {
      const res = await axiosPrivate.get("/voucher/getVoucherOfStore");
  
     
      setVouchers(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getVoucherOfStore();
  }, []);

  useEffect(() => {
    if (vouchers) {
      let data = vouchers.map((item: any) => {
        return {
          key: item.id,
          id: item.id,
          code: item.code,
          type_discount: item.Amount_discount ? "amount" : "percent",
          discount: item.Amount_discount
            ? item.Amount_discount.amount
            : item.Percentage_discount.percent,
          max_reduction:
            item.Percentage_discount && item.Percentage_discount.max_reduction,
          minSpend: item.minSpend,
          quantity: item.quantity,
          apply: item.used,
          start_time: item.start_time,
          end_time: item.end_time,
        };
      });
      setShowVouchers(data);
    }
  }, [vouchers]);

  const onDeleteVoucher = (record: any) => {
    // Modal.confirm({
    //   title: "Are you sure, you want to delete this product record?",
    //   //okeText: "Yes",
    //   //okeType: "danger",
    //   onOk: () => {
    //     setData((pre: any) => {
    //       return pre.filter((product: any) => product.id !== record.id);
    //     });
    //   },
    // });
  };

  
  const columns = [
    {
      key: "1",
      title: "Voucher code",
      dataIndex: "code",
    },

    {
      key: "3",
      title: "Type discount",
      dataIndex: "type_discount",
    },
    {
      key: "2",
      title: "Discount",
      dataIndex: "discount",
      render: (value: any, record: any) => {
        return (
          <div>
            {record.type_discount === "amount" ? (
              <p>{record.discount}</p>
            ) : (
              <>
                <p>Percent: {record.discount}%</p>
                <p>Max reduction: {record.max_reduction}</p>
              </>
            )}
          </div>
        );
      },
      filteredValue: [searchedText],
      onFilter: (value: any, record: any) => {
        return (
          String(record.productName)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.category).toLowerCase().includes(value.toLowerCase())
        );
      },
    },
    {
      key: "4",
      title: "Min spend",
      dataIndex: "minSpend",
      render: (value: any) => {
        return (<p>{formatCurrency(value)}</p>)
      }
    },
    {
      key: "5",
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      key: "6",
      title: "Apply",
      dataIndex: "apply",
    },
    {
      key: "7",
      title: "Start time",
      dataIndex: "start_time",
      sorter: (a: any, b: any) => {
        const dateA = Date.parse(a.start_time);
        const dateB = Date.parse(b.start_time);
        return dateA - dateB;
      },
      render: (text: string) => {
        const date = new Date(text).toLocaleString();

        return date;
      },
    },
    {
      key: "8",
      title: "Expire time",
      dataIndex: "end_time",
      sorter: (a: any, b: any) => {
        const dateA = Date.parse(a.end_time);
        const dateB = Date.parse(b.end_time);
        return dateA - dateB;
      },
      render: (text: string) => {
        const date = new Date(text).toLocaleString();

        return date;
      },
    },
    {
      key: "action",
      title: "Actions",
      render: (record: any) => {
        return (
          <>
            {/* <FileSearchOutlined
                onClick={() => onDetailProduct(record)}
                style={{ color: "blue", marginLeft: "10px" }}
              />
              <EditOutlined
                style={{ color: "#FF7008", marginLeft: "10px" }}
              /> */}
              <Popconfirm
              title="Delete voucher"
              description="Are you sure, you want to delete this voucher record?"
              okType="danger"
              onConfirm={() => handleDeleteVoucher(record)}
            >
              <DeleteOutlined
              style={{ color: "red", marginLeft: "10px" }}
              onClick={() => {
                onDeleteVoucher(record);
              }}
            />
            </Popconfirm>
            
          </>
        );
      },
    },
  ];

  const handleDateRangeChange = (dates: any) => {
    setDateRange(dates);
    // Thực hiện các bước lọc hoặc xử lý dữ liệu khác tại đây
  };

  console.log(dateRange);

  const handleFilterOrder = (e: any) => {
    e.preventDefault();
    const filteredVouchers = vouchers.filter((voucher: any) => {
      const voucherDate = new Date(voucher.end_time);
      return dateRange[0] <= voucherDate && voucherDate <= dateRange[1];
    });
    console.log(filteredVouchers);
    setShowVouchers(filteredVouchers);
  };
  const handleDeleteVoucher = async (record: any) => {
    try {
      const res = await axiosPrivate.put(`/voucher/deleteVoucher/${record.id}`);
      deletedSuccess();
      setVouchers((pre: any) => pre?.filter((item: any) => item.id !== record.id));

    } catch (error) {
      console.log(error);
      
    }
  }
  const disabledDate = (current: any) => {
    // Bạn có thể điều chỉnh logic ở đây theo nhu cầu cụ thể của mình
    return current && current > new Date();
  };
  return (
    <div className="px-10 pt-10 pb-5">
      <div className="flex items-center mb-5">
        <div className="flex-1 flex items-center space-x-4">
          <p className="font-bold">Voucher date</p>
          <RangePicker
            //disabledDate={disabledDate}
            onChange={handleDateRangeChange}
            value={dateRange}
            //format="YYYY-MM-DD HH:mm:ss"
          />
          <button
            disabled={!dateRange}
            onClick={handleFilterOrder}
            className={`px-3 py-1 rounded ${
              dateRange ? `bg-blue-400` : `bg-blue-200 cursor-not-allowed`
            }`}
          >
            Filter
          </button>
        </div>
        {/* <Input.Search
            placeholder="Enter search..."
            style={{
              width: "25%",
              marginBottom: "20px",
            }}
            onSearch={(value) => {
              setSearchedText(value);
              //console.log(value);
            }}
            onChange={(e) => {
              setSearchedText(e.target.value);
              //console.log(e.target.value);
            }}
          /> */}
        <div className="flex-none flex justify-end">
          <Button
            onClick={() => {
              router.push("./create-voucher");
            }}
            icon={<PlusOutlined />}
            className="bg-blue-400 hover:bg-blue-500"
          >
            Create voucher
          </Button>
        </div>
      </div>
      {contextHolder}
      {showVouchers && (
        <Table bordered columns={columns} dataSource={showVouchers}></Table>
      )}

      <Modal
        open={isDetail}
        onOk={() => {
          setIsDetail(false);
        }}
        onCancel={() => {
          setIsDetail(false);
        }}
      >
        <Typography.Text>
          productName: {infoProduct?.productName}
        </Typography.Text>
        <br />
        <Typography.Text>Category: {infoProduct?.category}</Typography.Text>
      </Modal>
    </div>
  );
};

export default VoucherManagement;
