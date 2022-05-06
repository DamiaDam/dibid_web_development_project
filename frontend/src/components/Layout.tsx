import React, { Component } from "react";
import Footer from "./Footer/Footer";
import Header from "./Header";

type AuthProps = {
    children: JSX.Element,
    loginGuard?: boolean
};

const Layout: React.FC<AuthProps> = ({ children, loginGuard }) => {

    return (
        <React.Fragment>
            <Header />
            {children}
            <Footer />
        </React.Fragment>
    );
}

export default Layout;