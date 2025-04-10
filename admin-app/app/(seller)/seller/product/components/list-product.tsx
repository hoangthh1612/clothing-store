"use client";

import {
  DeleteOutlined,
  EditOutlined,
  FileSearchOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Image, Input, Modal, Popconfirm, Select, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "@/api/axios";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import ProductDetailModal from "./product-detail";

const getPriceRange = (product_details: any) => {
  const listPrices = product_details?.map((item: any) => item.price);
  //const listPrices = [100000, 200000, 300000];
  let max = Math.max(...listPrices);
  let min = Math.min(...listPrices);
  if (max === min) return `${max}`;
  return `${min}-${max}`;
  // if (max === min) return {min, max};
  // return {min, max};
};

const formatCurrency = (amount: number) => {
  const options = {
    style: "currency",
    currency: "VND"
  };

  return amount.toLocaleString("vi-VN", options).replace("₫", "đ");
}
const formatNumber = (amount: number) => {
  // const options = {
  //   style: "currency",
  //   currency: "VND"
  // };

  // return amount.toLocaleString("vi-VN", options).replace("₫", "");
  return amount.toLocaleString("vi-VN");

}
function convertPriceRangeToNumber(priceRange: string) {
  // Bước 1: Loại bỏ ký tự đơn vị tiền tệ
  //const sanitizedPrice = priceRange.replace('đ', '');

  // Bước 2: Chia chuỗi thành hai giá trị min và max
  const [min, max] = priceRange.split('-').map(value => parseInt(value.trim(), 10));

  // Bước 3: Trả về đối tượng chứa giá trị min và max
  return { min, max };
}


const ProductManagement = () => {
  const { Text, Title } = Typography;
  const axiosPrivate = useAxiosPrivate();
  const [products, setProducts] = useState<any>(null);
  const [categories, setCategories] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchedText, setSearchedText] = useState("");
  const [isDetail, setIsDetail] = useState(false);
  const [infoProduct, setInfoProduct] = useState<any>(null);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [filterProducts, setFilterProducts] = useState<any>(null);
  const [categoryName, setCategoryName] = useState("all");
  const [keyDetail, setKeyDetail] = useState(0);
  const router = useRouter();
  const [productId, setProductId] = useState<any>(null);
  const getProductsOfStore = async () => {
  
    const res = await axiosPrivate.get("/product/getProductByStore");
    setProducts(res.data);
  };

  const getCategories = async () => {
    try {
      const res = await axiosPrivate.get("/category/getCategoryOfStore");
      // console.log(res.data);
      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
    
  }
 
  useEffect(() => {
    getProductsOfStore();
    getCategories();
  }, []);
  // console.log(products);
  

  const totalStock = (product: any) => {
    let total = 0;
    product.product_details?.forEach((item:any) => {
      // console.log(item.quantity);
      total += item.quantity;
    }
    );
    return total;
  }
  const getPrice = (product: any) => {
    
    return product.product_details[0]?.price || 0;
  }

  // Category
  const handleChangeCategory = (e: any) => {
    console.log(e.target.value);
    setCategoryName(e.target.value);
    
  }
  useEffect(() => {
    if(products) {
      if(categoryName === 'all') setFilterProducts(products);
      else {
        setFilterProducts(products?.filter((item: any) => item.Category.category_name === categoryName));
      }
    }
  }, [products, categoryName])
  
  const data = filterProducts?.map((product: any, index: number) => {
    return {
      key: product.id,
      id: product.id,
      image: product.image,
      product_name: product.product_name,
      category: product.Category.category_name,
      variation: product.variations?.length === 0 ? "No" : "Yes",
      stock: totalStock(product),
      price: getPrice(product),
    };
  });
  

  const handleDetailProduct = (e: any, record: any) => {
    e.preventDefault();
    setKeyDetail(record.id);
    //console.log(record.id);
    for(const item of products) {
      if(item.id === record.id) {
        setInfoProduct(item);
      }
    }
    
    setIsDetail(true);
  };

  const handleDeleteProduct = async ( record: any) => {
    //console.log(record);
    try {
      const res = await axiosPrivate.delete(`/product/delete/${record.id}`);
      setProducts((pre: any) => pre?.filter((item: any) => item.id !== record.id));
      
    } catch (error) {
      console.log(error);
      
    }
  }

  
  
  const onDeleteProduct = (e: any, record: any) => {
    e.preventDefault();
    console.log(record);
  };
  
  const onEditProduct = (e: any, record: any) => {
    e.preventDefault();
    // for(const item of products) {
    //   if(item.id === record.id) {
    //     setEditingProduct(item);
        
    //   }
    // }
    // setProductId(record.id);
    // setIsEditing(true);
  
    router.push(`/seller/product/edit-product?productId=${record.id}`);
  };


  const columns = [
    {
      key: "1",
      title: "Image",
      dataIndex: "image",
      render: (value: any) => {
        return <Image src={value} style={{objectFit: "cover"}} width={80} height={45} />;
      },
    },
    {
      key: "2",
      title: "Product Name",
      dataIndex: "product_name",
      filteredValue: [searchedText],
      onFilter: (value: any, record: any) => {
        return (
          String(record.product_name)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.category).toLowerCase().includes(value.toLowerCase())
        );
      },
    },
    {
      key: "3",
      title: "Category",
      dataIndex: "category",
    },
    {
      key: "7",
      title: "Variation",
      dataIndex: "variation",
    },
    {
      key: "4",
      title: "Stock",
      dataIndex: "stock",
      sorter: (a: any, b: any) => a.stock - b.stock,
      showSorterTooltip: false,
    },
    {
      key: "5",
      title: "Price",
      dataIndex: "price",
      sorter: (a: any, b: any) => {
        return (b.price - a.price)
      },
      showSorterTooltip: false,
      render: (value: any) => {
        return (
          <p>{formatCurrency(value)}</p>
        )
      }
    },
    {
      key: "8",
      title: "Actions",
      render: (record: any) => {
        return (
          <>
            <FileSearchOutlined
              onClick={(e) => handleDetailProduct(e, record)}
              className={`text-blue-500 ${record.key === keyDetail && "bg-blue-300"}`}
            />
            <EditOutlined
              onClick={(e) => {onEditProduct(e, record)}}
              style={{ color: "#FF7008", marginLeft: "10px" }}
            />
            <Popconfirm
              title="Delete product"
              description="Are you sure, you want to delete this product record?"
              okType="danger"
              onConfirm={() => handleDeleteProduct(record)}
            >
            <DeleteOutlined
              style={{ color: "red", marginLeft: "10px" }}
              onClick={(e) => {
                onDeleteProduct(e, record);
              }}
            /> 
            </Popconfirm> 
          </>
        );
      },
    },
  ];
  const onAddProduct = () => {
    router.push('./new');
  };
  
  return (
    <div className="bg-white px-10 pt-10 pb-5">
      <div className="flex mb-5">
        <div className="flex flex-1 filter-product">
          <div className="md:flex md:items-center space-x-3">
            <label htmlFor="category">Category</label>
            <select
              className="min-w-[32px] px-2 py-1 bg-transparent border-[1px] border-gray-500 rounded-[6px] focus:outline-none focus:bg-white focus:border-blue-400"
              name="category"
              onChange={handleChangeCategory}
              id="category"
            >
              <option key="all" value="all">All</option>
              {categories && 
                categories?.map((item: any, index: number) => (
                  <option key={index} value={item.category_name}>{item.category_name}</option>
                ))}
            </select>
            {/* <Select
                className="w-28"
                defaultValue="All"
                options={(options.map(c => ({label: c, value: c})))}
            >

            </Select> */}
          </div>
          <div className="ml-2">
            <Input.Search
              className="min-w-[32px]"
              placeholder="Enter product name"
              onSearch={(value) => {
                setSearchedText(value);
                //console.log(value);
              }}
              onChange={(e) => {
                setSearchedText(e.target.value);
                //console.log(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="flex-non mr-8">
          <Button
            className="flex items-center bg-blue-400 hover:bg-blue-500"
            icon={<PlusOutlined />}
            onClick={onAddProduct}
          >
            New product
          </Button>
        </div>
      </div>

      <Table 
        bordered
        columns={columns} 
        dataSource={data}>

        </Table>
      <ProductDetailModal
        isDetail={isDetail}
        infoProduct={infoProduct}
        setIsDetail={setIsDetail}
        keyDetail={keyDetail}
        setKeyDetail={setKeyDetail}
      />
      {/* <EditingProductModal
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        setProducts={setProducts}
        products={products}
        productId={productId}
        
      /> */}
    </div>
  );
};

export default ProductManagement;
