import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
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
            <a
                className="list-group-item list-group-item-action py-2 ripple"
                aria-current="true"
            >
                <span>{user.username}</span>
            </a>
        </React.Fragment>
    );
}

const MessengerList: React.FC<UserInfoList> = ({ users }) => {

    const navigate = useNavigate();

    const renderList = (): JSX.Element[] => {
        console.log(users);
        return users.map((user: UserInfoDTO, index: any) => {
            return (
                <tr key={index} id={index} onClick={() => navigate('/users/user/' + user.username)}>
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

const MessageBoardSideMenu: React.FC = () => {


    //Get all messengers
    const params = useParams();  // useState for UserInfo items
    const [users, setUsers] = useState<UserInfoDTO[]>([]);

    const axiosgetURL: string = `${WALLET_BACKEND}/users/${params.userType}`
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
            <Col md={2}>
                <nav
                    id="sidebarMenu"
                    className="collapse d-lg-block sidebar collapse bg-white"
                >
                    <div className="position-sticky">
                        <div className="list-group list-group-flush mx-3 mt-4">
                            <MessengerList users={users} />
                        </div>
                    </div>
                </nav>
            </Col>
        </React.Fragment>
    );

}

export default MessageBoardSideMenu;