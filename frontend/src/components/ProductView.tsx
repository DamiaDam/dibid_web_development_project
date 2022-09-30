import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { BACKEND_URL } from '../config';
import { CategoryInterface, LocationProps, MapCoordsDTO, ProductResponse, SubmitBidDTO } from '../interfaces';
import { getUsernameFromApptoken } from '../utils';
import AddProductItem from './AddProductItem';
import { isAuthenticated } from './AuthGuard';
import BidList from './BidList';
import PopUpConfirm from './PopUpConfirm';
import PopUpDelete from './PopUpDelete';
import StaticMap from './StaticMap';


const ProductView: React.FC = () => {
    const params = useParams();
    const { state } = useLocation() as unknown as LocationProps;
    const navigate = useNavigate();

    const bidAmount = useRef<HTMLInputElement>(null);

    const [loggedIn, setLoggedIn] = useState<boolean>(true);
    const [isSeller, setIsSeller] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const [categories, setCategories] = useState<CategoryInterface[]>([]);
    const [position, setPosition] = useState<MapCoordsDTO>();

    const [confirmPopup, setConfirmPopup] = useState(false);
    const handleCloseConfirm = () => setConfirmPopup(false);
    const [price, setPrice] = useState(0);
    const handleShowConfirm = (price: number) => {
        setPrice(price);
        setConfirmPopup(true);
    }

    const [deletePopup, setDeletePopup] = useState(false);
    const handleCloseDelete = () => setDeletePopup(false);
    const handleShowDelete = () => {
        setDeletePopup(true);
    }

    const [editMode, setEditMode] = useState(false);

    useEffect(() => {

        const fetchData = async () => {
            const response: AxiosResponse = await axios.get(BACKEND_URL + "/products/id/" + params.productId,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('apptoken')}`
                    }
                });
            const data: ProductResponse = response.data;
            if (data.productId >= 0) {
                console.log(data);
                setProductData(data);

                const cats = (await axios.get(BACKEND_URL + "/categories/product/" + data.productId)).data;
                setCategories(cats);

                let pos: MapCoordsDTO = { lat: 0.0, lng: 0.0 };
                if (data.latitude)
                    pos.lat = data.latitude;
                if (data.longitude)
                    pos.lng = data.longitude;

                setPosition(pos);

                try {
                    const username: string = getUsernameFromApptoken();
                    if (username == data.seller) {
                        setIsSeller(true);
                    }
                }
                catch { }

            }
        }

        setLoggedIn(isAuthenticated());
        fetchData()
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

    const buyNow = () => {
        handleShowConfirm(productData.buyPrice);
    }

    const setErr = (err: string) => {
        setError(err);

        setTimeout(() => {
            setError("");
        }, 3000);

    }

    const bidNow = () => {
        const bid = bidAmount.current?.value;
        if (bid === undefined || bid === "") {
            setErr('Bid amount not given!')
            return;
        }

        if (+bid < productData.currentBid) {
            setErr('Bid amount is smaller than current bid!')
            return;
        }
        if (+bid > productData.buyPrice) {
            setErr('Bid amount is larger than buy now price!')
            return;
        }

        handleShowConfirm(+bid);
    }

    const submitBid = async (amount: number) => {
        if (productData.productId <= 0)
            throw new Error('product not found');

        const bid: SubmitBidDTO = {
            productId: productData.productId,
            time: Date.now(),
            amount: amount,
            bidder: getUsernameFromApptoken()
        }

        await axios.post(BACKEND_URL + `/bid/submit`, bid,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('apptoken')}`
                }
            }
        ).then(res => {
            console.log(res);
            if (res.data.success) {
                console.log('bid created')
                window.location.reload();
            }
            else
                console.log('error')
        });
    }

    const showCategories = (): JSX.Element[] => {

        return categories.map(
            (category) => {
                return (<React.Fragment key={category.id}>
                    <a href={`/category/${category.id}`}>
                        {category.name}
                    </a>
                    {" "}
                </React.Fragment>);
            }
        )

    }

    const editProduct = () => {
        if (!isSeller || productData.numberOfBids > 0) {
            console.log('Cannot edit product');
            return;
        }


        setEditMode(editState => !editState);

    }

    const deleteProduct = async () => {
        if (!isSeller || productData.numberOfBids > 0) {
            console.log('Cannot delete product');
            return;
        }

        await axios.get(BACKEND_URL + '/products/delete/' + productData.productId,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('apptoken')}`
                }
            }
        ).then(async res => {
            console.log(res);
            if (res.data.success) {
                navigate('/', { state: state });
            }
            else {
                handleCloseDelete();
            }
        });
    }

    console.log(productData);
    console.log(productData.numberOfBids, productData.numberOfBids != 0);

    return (
        <React.Fragment>

            <PopUpConfirm price={price} submitBid={submitBid} show={confirmPopup} handleClose={handleCloseConfirm} />
            <PopUpDelete deleteProduct={deleteProduct} show={deletePopup} handleClose={handleCloseDelete} />
            <Row>
                <Col>
                    <h2>{productData.name}</h2>
                    <img src={`${BACKEND_URL}/image/${productData.imgUrl}`} style={{ maxWidth: '512px' }} />
                    <p>Description: {productData.description}</p>
                    <p>Categories:
                        {showCategories()}
                    </p>
                    <p>Seller: {productData.seller}, Rating: {productData.sellerRating}</p>
                    <p>Location: {productData.location}</p>
                    {position &&
                        <StaticMap position={position} />
                    }
                    <p>Current Bid: {productData.currentBid}</p>
                    {productData.buyPrice < Number.MAX_SAFE_INTEGER &&
                        <p>Buy Now Price: {productData.buyPrice}</p>
                    }
                    
                    {loggedIn
                        ?
                        <React.Fragment>
                            Your bid:
                            <input type="text" id="bid" ref={bidAmount} />
                            <Button onClick={bidNow}>
                                Bid
                            </Button>
                            {productData.buyPrice < Number.MAX_SAFE_INTEGER &&
                                <Button onClick={buyNow}>
                                    Buy Now for {productData.buyPrice}
                                </Button>
                            }
                        </React.Fragment>
                        :
                        <Button disabled>
                            Login to bid
                        </Button>
                    }
                    {error.length > 0 &&
                        <p className='err'>{error}</p>
                    }
                </Col>
                <Col>
                    {isSeller &&
                        <React.Fragment>
                            <Button onClick={editProduct} disabled={productData.numberOfBids != 0}>Edit</Button>
                            <Button onClick={handleShowDelete} disabled={productData.numberOfBids != 0}>Delete</Button>
                            <BidList productId={productData.productId} />
                            {editMode &&
                                <AddProductItem productId={productData.productId} />
                            }
                        </React.Fragment>
                    }
                </Col>
            </Row>

        </React.Fragment>
    );
}

export default ProductView