import IProduct from "@/Types/products";
import instance from "@/configs/axios";
import {EyeOutlined, PlusCircleFilled } from "@ant-design/icons";
import {useQuery } from "@tanstack/react-query";
import { Button, Skeleton, Table} from "antd";
import { Link} from "react-router-dom";

const ProductAdminPage = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      try {
        return await instance.get("/books");
      } catch (error) {
        throw new Error("Call API failed ");
      }
    },
  });
  
  const dataSource = data?.data.books.map((item: IProduct) => ({
    key: item._id,
    ...item,
  }));

  const columns = [
    {
      key: "title",
      title: "Tên Sách",
      dataIndex: "title",
    },
    {
      key: "author",
      title: "Tác giả",
      dataIndex: "author",
    },
    {
      key: "price",
      title: "Giá",
      dataIndex: "price",
    },
    {
      key: "description",
      title: "Mô tả",
      dataIndex: "description",
    },
    {
      key: "image",
      title: "Hình ảnh",
      dataIndex: "image",
      render: (text: string) => <img src={text} alt="" style={{width: "100px", height: "100px"}}/>
    },
    {
      key: "year",
      title: "Năm xuất bản",
      dataIndex: "year",
    },
    {
      key: "action",
      render: (_: any, product: IProduct) => {
        return (
          <div className="flex space-x-3">  
            <Button >
              <Link to={`/admin/books/${product._id}/detail`}>
              <EyeOutlined />
              </Link>
            </Button>


          </div>
        );
      },
    },
  ];

  if (isError) return <div>{error.message}</div>;
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h1>Books Management</h1>
        <Button>
          <Link to={`/admin/books/add`}>
            <PlusCircleFilled />
            Thêm Sách
          </Link>
        </Button>
      </div>
      {isLoading ? <Skeleton/> : <Table dataSource={dataSource} columns={columns} />}
    
    </>
  );
};

export default ProductAdminPage;
