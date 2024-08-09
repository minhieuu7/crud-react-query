import instance from "@/configs/axios";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Card, Typography } from "antd";
import { useParams } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ['books', id],
    queryFn: async () => {
      const response = await instance.get(`/books/${id}`);
      return response.data;
    }
  });

  console.log(data?.data.image);
  

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  const cardStyle: React.CSSProperties = {
    width: 620,
    margin: 'auto',
  };

  const imgStyle: React.CSSProperties = {
    display: 'block',
    width: 273,
  };

  return (
    <Card hoverable style={cardStyle} bodyStyle={{ padding: 0, overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <img
          alt="Book cover"
          src={data?.data.image}
          style={imgStyle}
        />
        <div style={{ padding: 32, flex: 1 }}>
          <Typography.Title level={2}>{data?.data.title}</Typography.Title>
          <Typography.Paragraph><strong>Author:</strong> {data?.data.author}</Typography.Paragraph>
          <Typography.Paragraph><strong>Price:</strong> ${data?.data.price}</Typography.Paragraph>
          <Typography.Paragraph><strong>Year:</strong> {data?.data.year}</Typography.Paragraph>
          <Typography.Paragraph><strong>Description:</strong> {data?.data.description}</Typography.Paragraph>
          <Button type="primary" href="https://ant.design" target="_blank">
            <ShoppingCartOutlined /> Buy Now
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default EditProduct;
