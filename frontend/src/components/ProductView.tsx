import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { WALLET_BACKEND } from '../config';
import { ProductResponse } from '../interfaces';


const ProductView: React.FC = () => {
    const params = useParams();

    useEffect(() => {
        // declare the data fetching function
        const fetchData = async () => {
            const response: AxiosResponse = await axios.get(WALLET_BACKEND + "/products/" + params.productId,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('apptoken')}`
              }
            });
            const data: ProductResponse = response.data;
            if (data.exists) {
                setProductData(data);
            }
        }

        // call the function
        fetchData()
            // make sure to catch any error
            .catch(console.error);
    }, [])

    const [productData, setProductData] = useState<ProductResponse>({
        exists: false,
        name: "",
        startingPrice: -1,
        buyNowPrice: -1,
        startingDate: -1,
        endDate: -1,
        location: "",
        description: "",  
        imgUrl: ""
    });

    return (
        <React.Fragment>
            <Card>
                <Row xs='auto'>
                    <Col>
                        <Card.Img src={productData.imgUrl} />
                    </Col>
                    <Col>
                    </Col>
                </Row>
            </Card>
        </React.Fragment>
    );
}

export default ProductView