import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { WALLET_BACKEND } from "../config";
import { GetUserResponseDTO, ProductResponse, UserInfoDTO } from "../interfaces";

const UserView: React.FC = () => {
    const params = useParams();

    // useEffect(() => {
    //     // declare the data fetching function
    //     const fetchData = async () => {
    //         const response: AxiosResponse = await axios.post(WALLET_BACKEND + "/users/getuser/", params.usr);
    //         const data: ProductResponse = response.data;
    //         if (data.exists) {
    //             setUserData(data);
    //         }
    //     }

    //     // call the function
    //     fetchData()
    //         // make sure to catch any error
    //         .catch(console.error);
    // }, [])

    // const [userData, setUserData] = useState<GetUserResponseDTO>({
    //     exists: false
    // });

    const userData: GetUserResponseDTO = {
        exists: true,
        info: {
            address: "a",
            name: "a",
            surname: "a",
            tin: "a",
            username: "a",
            email: "a",
            phone: "a",
            country: "a",
            latitude: 1,
            longitude: 1
        }
    }

    return (
        <React.Fragment>
            <Col>
                <Container className='container my-4'>
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
                        {userData.info?.latitude === undefined ?
                            <div />
                            :
                            <Form.Group className="mb-3">
                                <Form.Label>Latitude</Form.Label>
                                <Form.Control className="rounded-3" placeholder={userData.info?.latitude.toString()} disabled />
                            </Form.Group>
                        }
                        {userData.info?.longitude === undefined ?
                            <div />
                            :
                            <Form.Group className="mb-3 rounded-3">
                                <Form.Label>Longtitude</Form.Label>
                                <Form.Control className="rounded-3" placeholder={userData.info?.longitude.toString()} disabled />
                            </Form.Group>
                        }
                        <Button disabled>Validate User</Button>
                    </Form>
                </Container >
            </Col>
        </React.Fragment >
    );
}

export default UserView;