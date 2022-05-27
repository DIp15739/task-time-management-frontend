import { Table } from "antd";

const UserTable = ({ tableData }: any) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: "15%",
    },
    {
      title: "Name",
      dataIndex: "name",
      width: "30%",
    },
    {
      title: "Preferred Working Hours",
      dataIndex: "preferredWorkingHours",
      width: "25%",
    },
  ];

  const data = tableData?.map((d: any) => {
    return {
      id: d.id,
      name: d.name,
      preferredWorkingHours: d.preferredWorkingHours,
    };
  });

  return (
    <Table
      bordered
      dataSource={data}
      columns={columns}
      rowClassName="editable-row"
    />
  );
};

export default UserTable;
