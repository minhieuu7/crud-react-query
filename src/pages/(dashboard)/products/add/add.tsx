import instance from "@/configs/axios";
import { BackwardFilled } from "@ant-design/icons"
import { useMutation } from "@tanstack/react-query";
import { Button, Form, FormProps, Input, message } from "antd"
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import { Link } from "react-router-dom"

// định nghĩa các trường 
type FieldType = {
  title?: string;
  author?: string;
  year?: number;
  price?: number;
  image?: string;
  description?: string;
};

const ProductAdd = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = useForm();
  const {mutate} = useMutation({
    mutationFn: async (newProduct: FieldType)=> {
      try {
        return await instance.post(`books`, newProduct)
      } catch (error) {
        throw new Error("Thêm sản phẩm thất bại !")
      }
    },
    onSuccess: () =>  {
      messageApi.open({
        type: 'success',
        content: "Thêm sản phẩm thành công !"
      })
      form.resetFields();
    },
    onError: (error) => {
      message.open({
        type: "error",
        content: error.message
      })
    }
  });
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
    mutate(values);
  };
  
  return (
    <div>
      <>
      {contextHolder}
      <div className="flex items-center justify-between mb-4">
     <h1>Thêm Sản Phẩm</h1>
      <Button>
       <Link to={`/admin/books`}>
       <BackwardFilled/>
        Quay Lại
       </Link>
      </Button>
    </div>
    </>
    <Form
    form={form}
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    // initialValues={{ remember: true }}
    onFinish={onFinish}
    // onFinishFailed={onFinishFailed}
    // autoComplete="off"
  >
    <Form.Item<FieldType>
      label="Tên Sách"
      name="title"
      rules={[{ required: true, message: 'Tên sản phẩm không được trống !' }]}
    >
      <Input/>
    </Form.Item>

    <Form.Item<FieldType>
      label="Giá"
      name="price"
      rules={[{ required: true, message: 'Giá sản phẩm không được trống !' }]}
    >
      <Input/>
    </Form.Item>

    <Form.Item<FieldType>
      label="Tác giả"
      name="author"
      rules={[{ required: true, message: 'Giá sản phẩm không được trống !' }]}
    >
      <Input/>
    </Form.Item>

    <Form.Item<FieldType>
      label="Hình ảnh"
      name="image"
      rules={[{ required: true, message: 'Giá sản phẩm không được trống !' }]}
    >
      <Input/>
    </Form.Item>

    <Form.Item<FieldType>
      label="Năm xuất bản"
      name="year"
      rules={[{ required: true, message: 'Giá sản phẩm không được trống !' }]}
    >
      <Input/>
    </Form.Item>

    <Form.Item<FieldType>
      label="Mô tả"
      name="description"
    >
      <TextArea rows={4}/>
    </Form.Item>
    
    
    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
    </div>
  )
}

export default ProductAdd
