import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}: any) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}>
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const UserInfoTable = ({ userInfo, setUserInfo, userList }: any) => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState("");

  useEffect(() => {
    const tempData = userInfo.map((d: any) => {
      const user = userList.find((v: any) => v.id === d.user);
      return {
        key: d.id,
        id: d.id,
        user: user.name,
        userId: d.user,
        preferredWorkingHours: user.preferredWorkingHours,
        hours: d.hours,
        date: d.date,
        note: d.note,
        status:
          Number(d.hours) >= Number(user.preferredWorkingHours)
            ? "green"
            : "red",
      };
    });
    setData(tempData);
  }, [userInfo]);

  const isEditing = (record: any) => record.key === editingKey;

  const edit = (record: any) => {
    form.setFieldsValue({
      name: "",
      age: "",
      address: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: any) => {
    try {
      const row = await form.validateFields();
      const newData: any = [...data];
      const index = newData.findIndex((item: any) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });

        const updateData = { ...item, ...row };

        const reqData = {
          id: updateData.id,
          user: updateData.userId,
          date: updateData.date,
          hours: updateData.hours,
          note: updateData.note,
        };

        const { data } = await axios.post(
          "http://localhost:8080/userInfo/update",
          reqData
        );

        setUserInfo(data?.users);
        setData(data?.users);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: "10%",
    },
    {
      title: "User",
      dataIndex: "user",
      width: "10%",
    },
    {
      title: "Date",
      dataIndex: "date",
      width: "30%",
      editable: true,
    },
    {
      title: "Hours",
      dataIndex: "hours",
      width: "10%",
      editable: true,
    },
    {
      title: "Note",
      dataIndex: "note",
      width: "40%",
      editable: true,
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: (_: any, record: any) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}>
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record: any) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        // rowClassName="editable-row"
        rowClassName={(record, index) =>
          record.status === "green" ? "green" : "red"
        }
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

export default UserInfoTable;
