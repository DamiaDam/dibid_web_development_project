import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { WALLET_BACKEND } from "../config";
import { ProductResponse, UserResponse } from "../interfaces";

const UserView: React.FC = () => {
    const params = useParams();

    useEffect(() => {
        // declare the data fetching function
        const fetchData = async () => {
            const response: AxiosResponse = await axios.post(WALLET_BACKEND + "/users/getuser/", params.usr);
            const data: ProductResponse = response.data;
            if (data.exists) {
                setUserData(data);
            }
        }

        // call the function
        fetchData()
            // make sure to catch any error
            .catch(console.error);
    }, [])

    const [userData, setUserData] = useState<UserResponse>({

    });

    return (
        <React.Fragment>
            {params.usr}
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control placeholder='{userData.name}' disabled />
                </Form.Group>
            </Form>
        </React.Fragment>
    );
}

export default UserView;