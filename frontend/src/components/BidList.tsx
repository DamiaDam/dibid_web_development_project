import axios, { AxiosResponse } from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import Moment from "react-moment";
import { BACKEND_URL } from "../config";

export interface BidListProps {
    productId: number;
}

export interface BidInterface {
    bidId: number;
    price: number;
    bidder: string;
    timeOfBid: number;
    location: string;
}

const BidList: React.FC<BidListProps> = ({ productId }) => {

    // fetch bids of product with product id

    const [bids, setBids] = useState<BidInterface[]>([]);

    useEffect(() => {

        const fetchData = async () => {
            const response: AxiosResponse = await axios.get(BACKEND_URL + "/bid/product/" + productId,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('apptoken')}`
                    }
                });
            const data: BidInterface[] = response.data;
            if (data.length >= 0) {
                setBids(data);
            }
        }

        fetchData()

    }, [])

    const showBids = (): JSX.Element[] => {

        return bids.map(
            (bid) => {
                return (
                    <React.Fragment key={bid.bidId}>
                        <Card style={{ width: '18rem' }} className="rounded-lg">
                            <Card.Header>{bid.price}</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    bidder: {bid.bidder}
                                </Card.Text>
                                <Card.Text>
                                    Date: <Moment>{moment.unix(bid.timeOfBid / 1000)}</Moment>
                                </Card.Text>
                                <Card.Text>
                                    location: {bid.location}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </React.Fragment>);
            }
        )

    }


    return (
        <React.Fragment>
            {bids.length > 0 &&
                <React.Fragment>
                    <h1>Bids</h1>
                    {showBids()}
                </React.Fragment>
            }
        </React.Fragment>
    )
}

export default BidList;