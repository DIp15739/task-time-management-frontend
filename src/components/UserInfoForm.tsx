import { Button, DatePicker, DatePickerProps, Form, Input } from "antd";
import axios from "axios";
import { useState } from "react";

const UserInfoForm = ({ data, setUserInfo }: any) => {
  const [form] = Form.useForm();
  const [selectedUser, setSelectedUser] = useState<any>();
  const [selectedDate, setSelectedDate] = useState("");

  const onFinish = async (values: any) => {
    const { data } = await axios.post("http://localhost:8080/userInfo/add", {
      ...values,
      user: selectedUser,
      date: selectedDate,
    });
    setUserInfo(data.users);
    console.log("Success:", values);
    setSelectedUser("setSelectedUser");
    form.resetFields();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(dateString);
    setSelectedDate(dateString);
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
      <div className="ant-row ant-form-item">
        <div className="ant-col ant-col-8 ant-form-item-label">
          <label
            htmlFor="basic_date"
            className="ant-form-item-required"
            title="Select user">
            Select user
          </label>
        </div>
        <div className="ant-col ant-col-16 ant-form-item-control ">
          <select
            onChange={(e: any) => setSelectedUser(e.target.value)}
            value={selectedUser}
            className="ant-form-item-control-input">
            <option value="Select User">Select User</option>
            {data?.map((item: any) => (
              <option key={item.id} value={item?.id}>
                {item?.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Form.Item
        label="date"
        name="date"
        rules={[
          {
            required: true,
            message: "Please input your date!",
          },
        ]}>
        {/* <Input /> */}

        <DatePicker onChange={onChange} />
      </Form.Item>

      <Form.Item
        label="hours"
        name="hours"
        rules={[
          {
            required: true,
            message: "Please input your hours!",
          },
        ]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="note"
        name="note"
        rules={[
          {
            required: true,
            message: "Please input your note!",
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

export default UserInfoForm;
