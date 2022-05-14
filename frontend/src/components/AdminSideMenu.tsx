import React from "react";
import { Col } from "react-bootstrap";

const AdminSideMenu: React.FC = () => {


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
                                href="#"
                                className="list-group-item list-group-item-action py-2 ripple"
                                aria-current="true"
                            >

                                <span>All users</span>
                            </a>
                            <a
                                href="#"
                                className="list-group-item list-group-item-action py-2 ripple"
                                aria-current="true"
                            >

                                <span>Admin users</span>
                            </a>
                            <a
                                href="#"
                                className="list-group-item list-group-item-action py-2 ripple"
                                aria-current="true"
                            >

                                <span>Validated users</span>
                            </a><a
                                href="#"
                                className="list-group-item list-group-item-action py-2 ripple"
                                aria-current="true"
                            >

                                <span>Validation pending users</span>
                            </a>
                        </div>
                    </div>
                </nav>
            </Col>
        </React.Fragment >
    );
}

export default AdminSideMenu;