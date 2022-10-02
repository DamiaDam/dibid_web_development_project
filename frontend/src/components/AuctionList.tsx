import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../config";
import ProductList from "./ProductList";


const AuctionList: React.FC = () => {
    const navigate = useNavigate();
    const [productList, setProductList] = useState<number[]>([]);
    const params = useParams();  // useState for UserInfo items


    useEffect(() => {
        const auctionType = ["all", "won", "active"]
        if (params.auctionType !== undefined) {
            if (!auctionType.includes(params.auctionType)) {
                navigate('/');
            }
        } else { navigate('/'); }
    }, [navigate, params.auctionType])

    const axiosgetURL: string = `${BACKEND_URL}/bid/bids/${params.auctionType}`
    // useEffect to get all user info then set
    useEffect(() => {

        const getAuctions = async () => {
            const res = await axios.get(axiosgetURL,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('apptoken')}`
                    }
                }
            );
            console.log('res: ', res);
            setProductList(res.data);
        }

        getAuctions();
    }, [axiosgetURL])



    return (
        <React.Fragment>

            <Row xs='auto'>
                <AuctionList />
                <Col md={9}>
                    <ProductList productList={productList} />
                </Col>
            </Row>
        </React.Fragment>
    );
}







export default AuctionList;