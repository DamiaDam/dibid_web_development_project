import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { WALLET_BACKEND } from '../config';
import { CategoryInterface, MapCoordsDTO, ProductResponse, SubmitBidDTO } from '../interfaces';
import { getUsernameFromApptoken } from '../utils';
import { isAuthenticated } from './AuthGuard';
import PopUpConfirm from './PopUpConfirm';
import StaticMap from './StaticMap';


const ProductView: React.FC = () => {
    const params = useParams();
    
    const bidAmount = useRef<HTMLInputElement>(null);

    const [loggedIn, setLoggedIn] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    const [categories, setCategories] = useState<CategoryInterface[]>([]);
    const [position, setPosition] = useState<MapCoordsDTO>();

    const [popup, setPopup] = useState(false);
    const [price, setPrice] = useState(0);
    const handleClose = () => setPopup(false);
    const handleShow = (price: number) => {
        setPrice(price);
        setPopup(true);
    }

    useEffect(() => {

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

                const cats = (await axios.get(WALLET_BACKEND + "/categories/product/"+ data.productId)).data;
                setCategories(cats);

                let pos: MapCoordsDTO = {lat: 0.0, lng: 0.0};
                if( data.latitude )
                    pos.lat = data.latitude;
                if ( data.longitude )
                    pos.lng = data.longitude;
                
                setPosition(pos);
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
        handleShow(productData.buyPrice);
    }

    const setErr = (err: string) => {
        setError(err);

        setTimeout(() => {
            setError("");
        }, 3000);

    }

    const bidNow = () => {
        const bid = bidAmount.current?.value;
        if(bid === undefined || bid === "") {
            setErr('Bid amount not given!')
            return;
        }

        if(+bid < productData.currentBid) {
            setErr('Bid amount is smaller than current bid!')
            return;
        }
        if(+bid > productData.buyPrice) {
            setErr('Bid amount is larger than buy now price!')
            return;
        }

        handleShow(+bid);
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

    return (
        <React.Fragment>

            <PopUpConfirm price={price} submitBid={submitBid} show={popup} handleClose={handleClose}/>

            <h2>{productData.name}</h2>
            <img src={`${WALLET_BACKEND}/image/${productData.imgUrl}`} style={{maxWidth: '512px'}}/>
            <p>Description: {productData.description}</p>
            <p>Categories:
                {showCategories()}
            </p>
            <p>Seller: {productData.seller}, Rating: {productData.sellerRating}</p>
            <p>Location: {productData.location}</p>
            {position &&
                <StaticMap position={ position } />
            }
            <p>Current Bid: {productData.currentBid}</p>
            <p>Buy Now Price: {productData.buyPrice}</p>
            
            {loggedIn
                ?
                <React.Fragment>
                    Your bid:
                    <input type="text" id="bid" ref={bidAmount} />
                    <Button onClick={bidNow}>
                        Bid
                    </Button>

                    <Button onClick={buyNow}>
                        Buy Now for {productData.buyPrice}
                    </Button>
                </React.Fragment>
                :
                <Button disabled>
                    Login to bid
                </Button>
            }
            {error.length > 0 &&
                <p className='err'>{error}</p>
            }

        </React.Fragment>
    );
}

export default ProductView