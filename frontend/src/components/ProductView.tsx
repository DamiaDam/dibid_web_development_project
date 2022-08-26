import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { WALLET_BACKEND } from '../config';
import { ProductResponse, SubmitBidDTO } from '../interfaces';
import { getUsernameFromApptoken } from '../utils';


const ProductView: React.FC = () => {
    const params = useParams();
    
    const bidAmount = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // declare the data fetching function
        const fetchData = async () => {
            const response: AxiosResponse = await axios.get(WALLET_BACKEND + "/products/id/" + params.productId,
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
        location: ""
    });

    const buyNow = () => {
        submitBid(productData.buyPrice)
    }

    const bidNow = () => {
        const bid = bidAmount.current?.value;
        if(bid === undefined || bid === "")
            throw new Error('bid not given!');
        if(+bid < productData.currentBid)
            throw new Error('Bid smaller than current amount!')
        if(+bid > productData.buyPrice)
            throw new Error('Bid larger than buy now price!')
        submitBid(+bid)
    }

    const submitBid = async (amount: number) => {
        if(productData.productId <= 0)
            throw new Error('product not found');
        
        const bid: SubmitBidDTO = {
            productId: productData.productId,
            time: Date.now(),
            amount: amount,
            bidder: getUsernameFromApptoken()
        }

        await axios.post(WALLET_BACKEND+`/bid/submit`, bid,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('apptoken')}`
                }  
            }
        ).then(res => {
            console.log(res);
            if (res.data.success) {
              console.log('bid created')
            //   handleShow();
            }
            else
              console.log('error')
          });
    }

    return (
        <React.Fragment>

            <h2>{productData.name}</h2>
            <img src={`${WALLET_BACKEND}/image/${productData.imgUrl}`} style={{maxWidth: '512px'}}/>
            <p>{productData.description}</p>
            <p>Current Bid: {productData.currentBid}</p>
            <p>Buy Now Price: {productData.buyPrice}</p>
            
            Your bid:
            <input type="text" id="bid" ref={bidAmount} />
            <Button onClick={bidNow}>
                Bid
            </Button>

            <Button onClick={buyNow}>
                Buy Now for {productData.buyPrice}
            </Button>

            {/* <Card>
                <Row xs='auto'>
                    <Col>
                        <Card.Img src={productData.imgUrl} />
                    </Col>
                    <Col>
                    </Col>
                </Row>
            </Card> */}
        </React.Fragment>
    );
}

export default ProductView