import { Button, Form, Input } from "antd";
import axios from "axios";

const UserForm = ({ setUserData }: any) => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    const { data } = await axios.post("http://localhost:8080/user/add", values);
    setUserData(data?.users);
    form.resetFields();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off">
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: "Please input your name!",
          },
        ]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Preferred Working Hour Per Day"
        name="preferredWorkingHours"
        rules={[
          {
            required: true,
            message: "Please Input Preferred Working Hour Per Day!",
          },
        ]}>
        <Input />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserForm;
