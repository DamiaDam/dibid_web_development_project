import axios from "axios";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { LocationProps, UserInfoDTO } from "../interfaces";
import AdminSideMenu from "./AdminSideMenu";

interface UserInfoList {
  users: UserInfoDTO[]
}

interface UserCardInterface {
  user: UserInfoDTO;
}


const UserCard: React.FC<UserCardInterface> = ({ user }) => {

  return (
    <React.Fragment>
      <td>{user.name}</td>
      <td>{user.surname}</td>
      <td>{user.username}</td>
      <td>{user.email}</td>
    </React.Fragment>
  );
}


const UserList: React.FC<UserInfoList> = ({ users }) => {

  const { state } = useLocation() as unknown as LocationProps;
  const navigate = useNavigate();

  const renderList = (): JSX.Element[] => {
    console.log(users);
    return users.map((user: UserInfoDTO, index: any) => {
      return (
        <tr key={index} id={index} onClick={() => navigate('/users/user/' + user.username, { state: state })}>
          <UserCard user={user} />
        </tr>
      );
    });
  }

  return (
    <React.Fragment>
      {renderList()}
    </React.Fragment>
  );

}


const ManageUsers: React.FC = () => {
  const params = useParams();  // useState for UserInfo items
  const [users, setUsers] = useState<UserInfoDTO[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userTypeOptions = ["allUsers", "adminUsers", "validatedUsers", "nonValidatedUsers"]
    if (params.userType !== undefined) {
      if (!userTypeOptions.includes(params.userType)) {
        navigate('/');
      }
    } else { navigate('/'); }
  }, [])


  const axiosgetURL: string = `${BACKEND_URL}/users/${params.userType}`
  // useEffect to get all user info then set
  useEffect(() => {

    const getAllUsers = async () => {
      const res = await axios.get(axiosgetURL,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('apptoken')}`
          }
        }
      );
      console.log('res: ', res);
      setUsers(res.data);
    }

    getAllUsers();
  }, [])

  return (
    <React.Fragment>
      <Row xs='auto'>
        <AdminSideMenu />
        <Col md={9}>
          <MDBTable hover>
            <MDBTableHead>
              <tr>
                <th>First</th>
                <th>Last</th>
                <th>Username</th>
                <th>E-mail</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              <UserList users={users} />
            </MDBTableBody>
          </MDBTable>
        </Col>
      </Row>
    </React.Fragment>
  );
}







export default ManageUsers;