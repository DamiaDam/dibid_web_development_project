import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { WALLET_BACKEND } from "../config";
import { GetUserResponseDTO, ProductResponse, UserInfoDTO, ValidateDTO, ValidateResponseDTO } from "../interfaces";
import { LocationProps } from "./types/LocationProps";

const POST_URL = `${WALLET_BACKEND}/users/validateUser`;

const UserView: React.FC = () => {
    const params = useParams();

    const { state } = useLocation() as unknown as LocationProps;
    const navigate = useNavigate();

    const home = async () => {
        navigate('/home', { state: state });
    };

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
            home();
        });
    }


    return (
        <React.Fragment>
            <Col>
                <Container className='container my-4'>
                    <h3 className="form-label mt-4">User Info</h3>
                    {userData.exists ?
                        <Form>
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
                            {userData.info?.latitude === undefined || userData.info?.latitude == -1 ?
                                <div />
                                :
                                <Form.Group className="mb-3">
                                    <Form.Label>Latitude</Form.Label>
                                    <Form.Control className="rounded-3" placeholder={userData.info?.latitude.toString()} disabled />
                                </Form.Group>
                            }
                            {userData.info?.longitude === undefined || userData.info?.longitude == -1 ?
                                <div />
                                :
                                <Form.Group className="mb-3 rounded-3">
                                    <Form.Label>Longtitude</Form.Label>
                                    <Form.Control className="rounded-3" placeholder={userData.info?.longitude.toString()} disabled />
                                </Form.Group>
                            }
                            <Button className="rounded-3" onClick={manageUsers} >Back</Button>
                            <Button className="rounded-3" onClick={validateUser} >Validate User</Button>
                        </Form>
                        : <div>User does not exist!</div>}
                </Container >
            </Col>
        </React.Fragment >
    );
}

export default UserView;