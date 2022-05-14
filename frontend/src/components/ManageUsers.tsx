import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
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
    <Card style={{ display: 'flex', flexDirection: 'row', width: '12rem' }}>
      <Card.Img variant="top" src={""} style={{ backgroundAttachment: 'fixed' }} />
      <Card.Body>
        <Card.Title>{user.name} {user.surname}</Card.Title>
        <Card.Text>Email: {user.email}</Card.Text>
        <Card.Text>Phone number: {user.phone}</Card.Text>
      </Card.Body>
    </Card>
    // TODO:
    // onClick: navigate to /users/:user.name
    // if admin add different class (so it makes it different colour)
    // if validated add different class (eg different colour)
  );
}


const UserList: React.FC<UserInfoList> = ({ users }) => {

  const renderList = (): JSX.Element[] => {
    console.log(users);
    return users.map((user: UserInfoDTO, index: any) => {
      return (
        <div key={index} id={index} style={{ marginTop: '20px' }}>
          <UserCard user={user} />
        </div>
      );
    });
  }

  return (
    <ul className='credentials-container'>
      {renderList()}
    </ul>
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
      <UserList
        users={users}
      />
    </React.Fragment>
  );
}

export default ManageUsers;