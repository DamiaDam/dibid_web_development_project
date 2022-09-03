import Card from "react-bootstrap/Card";
import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import '../css/lux/bootstrap.min.css';
import { BACKEND_URL } from '../config';
import { ProductResponse } from '../interfaces';
import { useNavigate } from "react-router-dom";
import Countdown from 'react-countdown';

interface VerticalCardProps {
    productId: number;
}

const VerticalCard: React.FC<VerticalCardProps> = ({ productId }) => {

    const navigate = useNavigate();

    useEffect(() => {
        // declare the data fetching function
        const fetchData = async () => {
            const response: AxiosResponse = await axios.get(BACKEND_URL + "/products/id/" + +productId,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('apptoken')}`
              }
            });
            const data: ProductResponse = response.data;
            if (data.productId>=0) {
                setProductData(data);
            }
        }

        // call the function
        fetchData()
            // make sure to catch any error
            .catch(console.error);
    }, [])

    const [productData, setProductData] = useState<ProductResponse>({
        productId: -1,
        name: "",
        imgUrl: "",
        currentBid: 0,
        buyPrice: 0,
        firstBid: 0,
        numberOfBids: 0,
        startingDate: 0,
        endingDate: 0,    
        description: "",
        location: "",
        seller: "",
        sellerRating: 0,
        categories: []
    });

    const [showMore, setShowMore] = useState(false);

    // const imgSrc: string = productData.imgUrl;
    // const name: string= productData.name;
    // const price: number = productData.price;
    // const description: string = productData.description;
    // const productUrl: string = productData.productUrl;

    //Currency
    const currency: string = "USD";
    let currencySymbol: string = '';
    switch(currency) {
        case("EUR"):
            currencySymbol = '\u20AC';
            break;
        case("USD"):
            currencySymbol = '\u0024';
            break;
        default:
            currencySymbol = '\u0024';
            break;
    }

    var lenFlag: Boolean = productData.description.length > 100 ? true : false;
    return (
        <React.Fragment>
            <Card style={{ width: '18rem' }} className="rounded-lg">
                <Card.Link onClick={() => navigate(`/product/${productId}`)} >
                    <Card.Img variant="top" src={`${BACKEND_URL}/image/${productData.imgUrl}`} />
                </Card.Link>
                <Card.Body>
                    <Card.Title>
                        <Card.Link href={`/product/${productId}`} style={{ textDecoration: 'none' }}>{productData.name}</Card.Link>
                    </Card.Title>
                    <Card.Text>{currency} {productData.currentBid}{currencySymbol}</Card.Text>

                    {productData.endingDate!== 0 &&
                        <span style={{color: "red"}}>
                        { (productData.endingDate*1 > Date.now())
                            ?
                                    <React.Fragment>
                                        Expires in <Countdown date={ Date.now() + (productData.endingDate*1 - Date.now())}  />
                                    </React.Fragment>
                            :
                                    "Expired!"
                        }
                        </span>
                    }

                    <Card.Text>Buy now for {currency} {productData.buyPrice}{currencySymbol}</Card.Text>
                    <Card.Text>
                        {lenFlag &&
                            <Card.Link href="#" style={{ textDecoration: 'none' }}>
                                {showMore ? productData.description : `${productData.description.substring(0, 100)}`}
                                <Card.Link onClick={() => setShowMore(!showMore)}>
                                    <Card.Text>{showMore ? "Show less..." : "Show more..."}</Card.Text>
                                </Card.Link>
                            </Card.Link>
                        }
                        {!lenFlag &&
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