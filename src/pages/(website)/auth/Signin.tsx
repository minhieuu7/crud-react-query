import React from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import instance from "@/configs/axios";
import { Link, useNavigate } from "react-router-dom";
import { LoginOutlined } from "@ant-design/icons";

type FieldType = {
  email?: string;
  password?: string;
  remember?: boolean;
};

const Signin: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const {data} = useQuery({
    queryKey: ['users'],
    queryFn: async ()=> {
        return await instance.get('users');
    }
  })

  const {mutate} = useMutation({
    mutationFn: async (user: FieldType)=> {
       try {
        const response = await instance.post('users', user);
        return response;
       } catch (error) {
        throw new Error('Lỗi đăng nhập !');
       }
    },
    onSuccess: () => {
        messageApi.open({
            type: 'success',
            content: 'Đăng nhập thành công !'
        });
        navigate('/admin');
    },
    onError: (error) => {
        messageApi.open({
            type: 'error',
            content: error.message
        });
    }
  });

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    mutate(values);
  };

  return (
    <div>
        <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold text-center text-blue-500 my-4">Đăng Nhập</h1>
            <a>
            <LoginOutlined className="mr-3"/>
                <Link to={'/admin/signup'}>Chưa có tài khoản? đăng ký tại đây</Link>
            </a>
        </div>
      {contextHolder}
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Email không được để trống!" },
            { type: "email", message: "Email không đúng định dạng!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Mật khẩu không được trống!" },
            { min: 8, message: "Mật khẩu tối thiểu 8 ký tự!" },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Đăng Nhập
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Signin;
