import axios from "axios";
import React from "react";
import { Col } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { LocationProps } from "../interfaces";

const AuctionListSideMenu: React.FC = () => {
    const { state } = useLocation() as unknown as LocationProps;
    const navigate = useNavigate();

    const allParticipatedAuctions = async () => {
        navigate('/auctionList/all', { state: state });
        window.location.reload();
    };

    const wonAuctions = async () => {
        navigate('/auctionList/won', { state: state });
        window.location.reload();
    };
    const validatedUsers = async () => {
        navigate('/auctionList/active', { state: state });
        window.location.reload();
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
                                onClick={allParticipatedAuctions}
                                className="list-group-item list-group-item-action py-2 ripple pointer"
                                aria-current="true"
                            >

                                <span>All participated auctions</span>
                            </a>
                            <a
                                onClick={wonAuctions}
                                className="list-group-item list-group-item-action py-2 ripple pointer"
                                aria-current="true"
                            >

                                <span>Won</span>
                            </a>
                            <a
                                onClick={validatedUsers}
                                className="list-group-item list-group-item-action py-2 ripple pointer"
                                aria-current="true"
                            >

                                <span>Active auction</span>
                            </a>
                        </div>
                    </div>
                </nav>
            </Col>
        </React.Fragment >
    );
}

export default AuctionListSideMenu;