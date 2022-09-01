import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { WALLET_BACKEND } from "../config";
import { LocationProps, UserInfoDTO } from "../interfaces";

interface UserInfoList {
    users: UserInfoDTO[]
    senderUserName: string;
}

interface UserCardInterface {
    senderUserName: string;
    user: UserInfoDTO;
}

interface MessageBoardSideMenuInfo {
    senderUserName: string;
}

const UserCard: React.FC<UserCardInterface> = ({ user, senderUserName }) => {
    const { state } = useLocation() as unknown as LocationProps;
    const navigate = useNavigate();
    console.log('/messages/' + senderUserName + '/' + user.username);
    const usernav = async () => {
        navigate('/messages/' + senderUserName + '/' + user.username, { state: state });
    }

    return (
        <React.Fragment>
            <a
                className="list-group-item list-group-item-action py-2 ripple"
                aria-current="true"
                onClick={usernav}
            >
                <span>{user.username}</span>
            </a>
        </React.Fragment>
    );
}

const MessengerList: React.FC<UserInfoList> = ({ users, senderUserName }) => {

    const navigate = useNavigate();

    const renderList = (): JSX.Element[] => {
        console.log(users);
        return users.map((user: UserInfoDTO, index: any) => {
            return (
                <tr key={index} id={index} onClick={() => navigate('/message')}>
                    <UserCard user={user} senderUserName={senderUserName} />
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

const MessageBoardSideMenu: React.FC<MessageBoardSideMenuInfo> = ({ senderUserName }) => {


    // //Get all messengers
    // const params = useParams();  // useState for UserInfo items
    // const [users, setUsers] = useState<UserInfoDTO[]>([]);

    // const axiosgetURL: string = `${WALLET_BACKEND}/users/${params.userType}`
    // // useEffect to get all user info then set
    // useEffect(() => {

    //     const getAllUsers = async () => {
    //         const res = await axios.get(axiosgetURL,
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${localStorage.getItem('apptoken')}`
    //                 }
    //             }
    //         );
    //         console.log('res: ', res);
    //         setUsers(res.data);
    //     }

    //     getAllUsers();
    // }, [])

    const users: UserInfoDTO[] = [
        {
            username: 'malakas',
            email: 'malakas',
            name: 'malakas',
            surname: 'malakas',
            phone: 'malakas',
            tin: 'malakas',
            country: 'malakas',
            address: 'malakas',
            validated: true,
            admin: false,
        }
    ]
    return (
        <React.Fragment>
            <Col md={2}>
                <nav
                    id="sidebarMenu"
                    className="collapse d-lg-block sidebar collapse bg-white"
                >
                    <div className="position-sticky">
                        <div className="list-group list-group-flush mx-3 mt-4">
                            <MessengerList users={users} senderUserName={senderUserName} />
                        </div>
                    </div>
                </nav>
            </Col>
        </React.Fragment>
    );

}

export default MessageBoardSideMenu;