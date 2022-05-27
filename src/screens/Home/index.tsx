import { Button, Col, Row } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserForm from "./../../components/UserForm";
import UserInfoForm from "../../components/UserInfoForm";
import UserTable from "../../components/UserTable";
import UserInfoTable from "../../components/UserInfoTable";

export default function HomeScreen() {
  const [userData, setUserData] = useState([]);

  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("http://localhost:8080/user/get");
      setUserData(data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("http://localhost:8080/userInfo/get");
      setUserInfo(data);
    })();
  }, []);

  return (
    <div>
      <Row>
        <Col md={10} style={{ marginLeft: "1rem", marginRight: "9rem" }}>
          <h1>Add User</h1>
          <UserForm setUserData={setUserData} />
        </Col>
        <Col md={10}>
          <h1>Add User Info</h1>
          <UserInfoForm data={userData} setUserInfo={setUserInfo} />
        </Col>
      </Row>
      <Row>
        <Col md={10} style={{ marginLeft: "1rem", marginRight: "9rem" }}>
          <h1>User Table</h1>
          <UserTable tableData={userData} />
        </Col>
        <Col md={10}>
          <h1>User Info Table</h1>
          <UserInfoTable
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            userList={userData}
          />
        </Col>
      </Row>
    </div>
  );
}
