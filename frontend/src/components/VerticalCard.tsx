import Card from "react-bootstrap/Card";
import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import '../css/lux/bootstrap.min.css';
import { WALLET_BACKEND } from '../config';
import { ProductResponse } from '../interfaces';
import { useNavigate } from "react-router-dom";

interface VerticalCardProps {
    productId: number;
}

const VerticalCard: React.FC<VerticalCardProps> = ({ productId }) => {

    const navigate = useNavigate();

    useEffect(() => {
        // declare the data fetching function
        const fetchData = async () => {
            const response: AxiosResponse = await axios.get(WALLET_BACKEND + "/products/" + +productId,
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

    const [showMore, setShowMore] = useState(false);

    // const imgSrc: string = productData.imgUrl;
    // const name: string= productData.name;
    // const price: number = productData.price;
    // const description: string = productData.description;
    // const productUrl: string = productData.productUrl;

    //Currency
    const currency: string = "EUR";
    let currencySymbol: string = '';
    if (currency == "EUR") {
        currencySymbol = '\u20AC';
    }

    var lenFlag: Boolean = productData.description.length > 100 ? true : false;
    return (
        <React.Fragment>
            <Card style={{ width: '18rem' }} className="rounded-lg">
                <Card.Link onClick={() => navigate('/product/' + productData.toString())} >
                    <Card.Img variant="top" src={productData.imgUrl} />
                </Card.Link>
                <Card.Body>
                    <Card.Title>
                        <Card.Link href={""} style={{ textDecoration: 'none' }}>{productData.name}</Card.Link>
                    </Card.Title>
                    <Card.Text>{currency} {productData.startingPrice}{currencySymbol}</Card.Text>
                    <Card.Text>
                        {productData.description.length > 100 &&
                            <Card.Link href="#" style={{ textDecoration: 'none' }}>
                                {showMore ? productData.description : `${productData.description.substring(0, 100)}`}
                                <Card.Link onClick={() => setShowMore(!showMore)}>
                                    <Card.Text>{showMore ? "Show less..." : "Show more..."}</Card.Text>
                                </Card.Link>
                            </Card.Link>
                        }
                        {productData.description.length <= 100 &&
                            <Card.Link href="#" style={{ textDecoration: 'none' }}>
                                {productData.description}
                            </Card.Link>
                        }
                    </Card.Text>
                </Card.Body>
            </Card>
        </React.Fragment >
    );
}

export default VerticalCard;