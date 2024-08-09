import instance from "@/configs/axios";
import { BackwardFilled, Loading3QuartersOutlined } from "@ant-design/icons"
import { useMutation, useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Form, FormProps, Input, message } from "antd"
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import { Link, useParams } from "react-router-dom"

// định nghĩa các trường 
type FieldType = {
  name?: string;
  price?: string;
  description?: string;
};

const EditProduct = () => {
  const {id} = useParams();
  const queryClient = useQueryClient();

  const [messageApi, contextHolder] = message.useMessage();
  const [form] = useForm();
  const {data, isLoading, isError, error} = useQuery({
    queryKey: ['products', id],
    queryFn: async ()=> {
      return await instance.get(`/products/${id}`)
    }
  })

  console.log(data);
  
  const {mutate, isPending} = useMutation({
    mutationFn: async (newProduct: FieldType)=> {
      try {
        return await instance.put(`products/${id}`, newProduct)
      } catch (error) {
        throw new Error("Cập nhật sản phẩm thất bại !")
      }
    },
    onSuccess: () =>  {
      messageApi.open({
        type: 'success',
        content: "Cập nhật sản phẩm thành công !",
      })
      form.resetFields();
      queryClient.invalidateQueries({
        queryKey: ['products', id]
      })
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

  if(isLoading) return <div>Loading.....</div>
  if(isError) return <div>{error.message}</div>
  
  return (
    <div>
      <>
      {contextHolder}
      <div className="flex items-center justify-between mb-4">
     <h1 style={{color: "gray"}}>Cập nhật sản phẩm: <span style={{color: "green"}}>{data?.data.name}</span> </h1>
      <Button>
       <Link to={`/admin/products`}>
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
    initialValues={data?.data}
    onFinish={onFinish}
    autoComplete="off"
  >
    <Form.Item<FieldType>
      label="Tên sản phẩm"
      name="name"
      rules={[{ required: true, message: 'Tên sản phẩm không được trống !' }]}
    >
      <Input disabled={isPending}/>
    </Form.Item>

    <Form.Item<FieldType>
      label="Giá"
      name="price"
      rules={[{ required: true, message: 'Giá sản phẩm không được trống !' }]}
    >
      <Input disabled={isPending}/>
    </Form.Item>


    <Form.Item<FieldType>
      label="Mô tả"
      name="description"
    >
      <TextArea rows={4} disabled={isPending}/>
    </Form.Item>
    
    
    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit" disabled={isPending}>
        {isPending ? <Loading3QuartersOutlined className="animate-spin mr-2"/> : 'Submit'}
      </Button>
    </Form.Item>
  </Form>
    </div>
  )
}

export default EditProduct
