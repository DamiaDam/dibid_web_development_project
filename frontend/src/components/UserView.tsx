import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { WALLET_BACKEND } from "../config";
import { GetUserResponseDTO, ValidateDTO, ValidateResponseDTO } from "../interfaces";
import { LocationProps } from '../interfaces';
import AdminSideMenu from "./AdminSideMenu";

const POST_URL = `${WALLET_BACKEND}/users/validateUser`;

const UserView: React.FC = () => {
    const params = useParams();

    const { state } = useLocation() as unknown as LocationProps;
    const navigate = useNavigate();

    const manageUsers = async () => {
        navigate('/users', { state: state });
    };

    useEffect(() => {
        // declare the data fetching function
        const fetchData = async () => {
            const response: AxiosResponse = await axios.get(WALLET_BACKEND + "/users/getuser/" + params.usr);
            console.log(response);
            const data: GetUserResponseDTO = response.data;
            if (data.exists) {
                setUserData(data);
            }
        }

        // call the function
        fetchData()
            // make sure to catch any error
            .catch(console.error);
    }, [])

    const [userData, setUserData] = useState<GetUserResponseDTO>({
        exists: false
    });

    const validateUser = async () => {


        const validateRequest: ValidateDTO = {
            username: userData.info?.username
        };
        await axios.post<ValidateResponseDTO>(POST_URL, validateRequest
        ).then(res => {
            console.log(res);
            if (res.data.success) {
                console.log('user validated')
            }
            else
                console.log('error')
            navigate('/users', { state: state })
        });
    }


    return (
        <React.Fragment>
            <Row xs='auto'>
                <AdminSideMenu />
                <Col md={10} className='ps-5'>
                    <h5><div className='underline-on-hover pt-4' ><a onClick={manageUsers} className='px-2 form-text' style={{ textDecoration: 'none', cursor: 'pointer' }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-short" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z" />
                    </svg>Back</a></div></h5>
                    <h3 className="form-label mt-4">User Info</h3>
                    {userData.exists ?
                        <Form>
                            <Row xs='auto' className="mb-5">
                                <Col md={4} className='pe-5'>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control className="rounded-3" placeholder={userData.info?.username} disabled />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control className="rounded-3" placeholder={userData.info?.name} disabled />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Surname</Form.Label>
                                        <Form.Control className="rounded-3" placeholder={userData.info?.surname} disabled />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control className="rounded-3" placeholder={userData.info?.email} disabled />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Phone number</Form.Label>
                                        <Form.Control className="rounded-3" placeholder={userData.info?.phone} disabled />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>TIN</Form.Label>
                                        <Form.Control className="rounded-3" placeholder={userData.info?.tin} disabled />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Country</Form.Label>
                                        <Form.Control className="rounded-3" placeholder={userData.info?.country} disabled />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control className="rounded-3" placeholder={userData.info?.address} disabled />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Validated</Form.Label>
                                        <Form.Control className="rounded-3" placeholder={userData.info?.validated.toString()} disabled />
                                    </Form.Group>
                                    {userData.info?.latitude === undefined || userData.info?.latitude === -1 ?
                                        <div />
                                        :
                                        <Form.Group className="mb-3">
                                            <Form.Label>Latitude</Form.Label>
                                            <Form.Control className="rounded-3" placeholder={userData.info?.latitude.toString()} disabled />
                                        </Form.Group>
                                    }
                                    {userData.info?.longitude === undefined || userData.info?.longitude === -1 ?
                                        <div />
                                        :
                                        <Form.Group className="mb-3 rounded-3">
                                            <Form.Label>Longtitude</Form.Label>
                                            <Form.Control className="rounded-3" placeholder={userData.info?.longitude.toString()} disabled />
                                        </Form.Group>
                                    }
                                    {!userData.info?.validated &&
                                        <Form.Group className="my-5 rounded-3">
                                            <Button className="rounded-3 float-end" style={{ width: '10rem' }} onClick={validateUser} >Validate User</Button>
                                        </Form.Group>}
                                </Col>
                            </Row>
                            <Row className="">
                            </Row>
                        </Form>
                        : <div>User does not exist!</div>}
                </Col>
            </Row>
        </React.Fragment >
    );
}

export default UserView;