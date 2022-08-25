import axios from "axios";
import React from "react";
import { Col } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { WALLET_BACKEND } from "../config";
import { LocationProps } from "../interfaces";

const AdminSideMenu: React.FC = () => {
    const { state } = useLocation() as unknown as LocationProps;
    const navigate = useNavigate();

    const allUsers = async () => {
        navigate('/users/allUsers', { state: state });
        window.location.reload();
    };

    const adminUsers = async () => {
        navigate('/users/adminUsers', { state: state });
        window.location.reload();
    };
    const validatedUsers = async () => {
        navigate('/users/validatedUsers', { state: state });
        window.location.reload();
    };
    const nonValidatedUsers = async () => {
        navigate('/users/nonValidatedUsers', { state: state });
        window.location.reload();
    };
    const downloadXMLBids = async () => {

        await axios.get(WALLET_BACKEND + `/export/xml`, 
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('apptoken')}`
                }
            }
        )
        .then(async res => {
            window.location.replace(WALLET_BACKEND + `/export/dl/` + res.data);
        })
        .catch(err => {
            console.log('err = ', err);
        });
    };
    const downloadJSONBids = async () => {

        await axios.get(WALLET_BACKEND + `/export/json`, 
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('apptoken')}`
                }
            }
        )
        .then(async res => {
            window.location.replace(WALLET_BACKEND + `/export/dl/` + res.data);
        })
        .catch(err => {
            console.log('err = ', err);
        });
    };

    return (
        <React.Fragment>
            <Col md={2}>
                <nav
                    id="sidebarMenu"
                    className="collapse d-lg-block sidebar collapse bg-white"
                >
                    <div className="position-sticky">
                        <div className="list-group list-group-flush mx-3 mt-4">
                            <a
                                onClick={allUsers}
                                className="list-group-item list-group-item-action py-2 ripple pointer"
                                aria-current="true"
                            >

                                <span>All users</span>
                            </a>
                            <a
                                onClick={adminUsers}
                                className="list-group-item list-group-item-action py-2 ripple pointer"
                                aria-current="true"
                            >

                                <span>Admin users</span>
                            </a>
                            <a
                                onClick={validatedUsers}
                                className="list-group-item list-group-item-action py-2 ripple pointer"
                                aria-current="true"
                            >

                                <span>Validated users</span>
                            </a><a
                                onClick={nonValidatedUsers}
                                className="list-group-item list-group-item-action py-2 ripple pointer"
                                aria-current="true"
                            >

                                <span>Validation pending users</span>
                            </a><a
                                onClick={downloadXMLBids}
                                className="list-group-item list-group-item-action py-2 ripple pointer"
                                aria-current="true"
                            >
                                <span>Export Bids to XML</span>
                            </a><a
                                onClick={downloadJSONBids}
                                className="list-group-item list-group-item-action py-2 ripple pointer"
                                aria-current="true"
                            >
                                <span>Export Bids to JSON Object</span>
                            </a>
                        </div>
                    </div>
                </nav>
            </Col>
        </React.Fragment >
    );
}

export default AdminSideMenu;