import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { LocationProps, UserInfoDTO, UsersChatResponseDTO } from "../interfaces";

interface UserInfoList {
    users: string[];
    senderUserName: string;
}

interface UserCardInterface {
    senderUserName: string;
    username: string;
}

interface MessageBoardSideMenuInfo {
    senderUserName: string;
}

const UserCard: React.FC<UserCardInterface> = ({ username, senderUserName }) => {
    const { state } = useLocation() as unknown as LocationProps;
    const navigate = useNavigate();
    const usernav = async () => {
        navigate('/messages/' + senderUserName + '/' + username, { state: state });
    }

    return (
        <React.Fragment>
            <td>
                <a
                    className="list-group-item list-group-item-action py-2 ripple"
                    aria-current="true"
                    onClick={usernav}
                >
                    <span>{username}</span>
                </a>
            </td>
        </React.Fragment>
    );
}

const MessengerList: React.FC<UserInfoList> = ({ users, senderUserName }) => {


    const renderList = (): JSX.Element[] => {
        console.log(users);
        return users.map((usrnm: string, index: any) => {
            return (
                <tr key={index} id={index} >
                    <UserCard username={usrnm} senderUserName={senderUserName} />
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
    const [usersList, setUsers] = useState<string[]>([]);

    const axiosgetURL: string = `${BACKEND_URL}/messages/getUsersChats/${senderUserName}`
    // useEffect to get all user info then set
    useEffect(() => {

        const getAllcahtsFromUsers = async () => {
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

        getAllcahtsFromUsers();
    }, [axiosgetURL])
    if (usersList === undefined)
        throw new Error('Error in getting chats');

    // const users: UserInfoDTO[] = [
    //     {
    //         username: 'malakas',
    //         email: 'malakas',
    //         name: 'malakas',
    //         surname: 'malakas',
    //         phone: 'malakas',
    //         tin: 'malakas',
    //         country: 'malakas',
    //         address: 'malakas',
    //         validated: true,
    //         admin: false,
    //     }
    // ]
    return (
        <React.Fragment>
            <Col md={2}>
                <nav
                    id="sidebarMenu"
                    className="collapse d-lg-block sidebar collapse bg-white"
                >
                    <div className="position-sticky">
                        <div className="list-group list-group-flush mx-3 mt-4">
                            <table>
                                <tbody>
                                    <MessengerList users={usersList} senderUserName={senderUserName} />
                                </tbody>
                            </table>
                        </div>
                    </div>
                </nav>
            </Col>
        </React.Fragment>
    );

}

export default MessageBoardSideMenu;

