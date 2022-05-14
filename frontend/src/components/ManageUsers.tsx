import axios from "axios";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { WALLET_BACKEND } from "../config";
import { UserInfoDTO } from "../interfaces";

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

  const navigate = useNavigate();

  const renderList = (): JSX.Element[] => {
    console.log(users);
    return users.map((user: UserInfoDTO, index: any) => {
      return (
        <tr key={index} id={index} onClick={() => navigate('/users/user/'+user.username)}>
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

  // useState for UserInfo items
  const [users, setUsers] = useState<UserInfoDTO[]>([]);

  // useEffect to get all user info then set
  useEffect(() => {

    const getAllUsers = async () => {
      const res = await axios.get(`${WALLET_BACKEND}/users/allinfo`);
      console.log('res: ', res);
      setUsers(res.data);
    }

    getAllUsers();
  }, [])

  return (
    <React.Fragment>
      <Row xs='auto'>
                <Col md={2}>
                    <nav
                        id="sidebarMenu"
                        className="collapse d-lg-block sidebar collapse bg-white"
                    >
                        <div className="position-sticky">
                            <div className="list-group list-group-flush mx-3 mt-4">
                                <a
                                    href="#"
                                    className="list-group-item list-group-item-action py-2 ripple"
                                    aria-current="true"
                                >

                                    <span>All users</span>
                                </a>
                                <a
                                    href="#"
                                    className="list-group-item list-group-item-action py-2 ripple"
                                    aria-current="true"
                                >

                                    <span>Admin users</span>
                                </a>
                                <a
                                    href="#"
                                    className="list-group-item list-group-item-action py-2 ripple"
                                    aria-current="true"
                                >

                                    <span>Validated users</span>
                                </a><a
                                    href="#"
                                    className="list-group-item list-group-item-action py-2 ripple"
                                    aria-current="true"
                                >

                                    <span>Validation pending users</span>
                                </a>
                            </div>
                        </div>
                    </nav>
                </Col>
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