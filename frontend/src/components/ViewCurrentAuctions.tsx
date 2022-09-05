import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Row, Container, Button, Form, Col } from 'react-bootstrap';
import Select from 'react-select';
import { WALLET_BACKEND } from '../config';
import { CategoryInterface, SelectInterface, SearchProductInterface } from '../interfaces';
import ProductList from './ProductList';
import { convertToSelectInterface } from '../utils';

const ViewCurrentAuctions: React.FC = () => {

    const searchBar = useRef<HTMLInputElement>(null);
    const minBidBox = useRef<HTMLInputElement>(null);
    const maxBidBox = useRef<HTMLInputElement>(null);
    const minBuyNowBox = useRef<HTMLInputElement>(null);
    const maxBuyNowBox = useRef<HTMLInputElement>(null);

    const [productList, setProductList] = useState<number[]>([]);

    const [categories, setCategories] = useState<CategoryInterface[]>([]);

    const [category, setCategory] = useState<string>();



    useEffect(() => {
        const getAllCategories = async () => {
            await axios.get(WALLET_BACKEND + '/categories/getall'
            ).then(res => {
                setCategories(res.data);
            })
        }

        getAllCategories();
    }, [])


    const searchProducts = async () => {

        const searchText = searchBar.current?.value;
        console.log('searchText: ', searchText);

        await axios.post(WALLET_BACKEND + '/products/search', { searchText: searchText },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('apptoken')}`
                }
            }
        ).then(async res => {
            console.log(res);
            // TODO: check if res is correct
            console.log(res.data);
            setProductList(res.data);
        });
    }

    const searchWithFilters = async () => {

        const searchText = searchBar.current?.value;
        const minBid = minBidBox.current?.value ? +minBidBox.current.value : undefined;
        const maxBid = maxBidBox.current?.value ? +maxBidBox.current.value : undefined;
        const minBuyNow = minBuyNowBox.current?.value ? +minBuyNowBox.current.value : undefined;
        const maxBuyNow = maxBuyNowBox.current?.value ? +maxBuyNowBox.current.value : undefined;
        // const cat = category ? category : undefined;
        const cat: number | undefined = category ? +category : undefined;

        console.log('category', category)

        const searchBody: SearchProductInterface = {
            searchText: searchText,
            category: cat,
            minBid: minBid,
            maxBid: maxBid,
            minBuyNow: minBuyNow,
            maxBuyNow: maxBuyNow
        }

        await axios.post(WALLET_BACKEND + '/products/search', searchBody,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('apptoken')}`
                }
            }
        ).then(async res => {
            console.log(res);
            // TODO: check if res is correct
            console.log(res.data);
            setProductList(res.data);
        });
    }

    const setACategory = (selection: SelectInterface[] | any) => {
        console.log('selection: ', selection);
        setCategory(selection.value);
    }

    return (
        <React.Fragment>
            <Container fluid >
                <Row>
                    <Col xs={5}>
                        <Form.Control placeholder="Search titles & descriptions" ref={searchBar} />
                    </Col>
                    <Col>
                        <Button type="button" className="btn btn-secondary" onClick={searchProducts}>
                            <svg width="15px" height="15px">
                                <path d="M11.618 9.897l4.224 4.212c.092.09.1.23.02.312l-1.464 1.46c-.08.08-.222.072-.314-.02L9.868 11.66M6.486 10.9c-2.42 0-4.38-1.955-4.38-4.367 0-2.413 1.96-4.37 4.38-4.37s4.38 1.957 4.38 4.37c0 2.412-1.96 4.368-4.38 4.368m0-10.834C2.904.066 0 2.96 0 6.533 0 10.105 2.904 13 6.486 13s6.487-2.895 6.487-6.467c0-3.572-2.905-6.467-6.487-6.467 "></path>
                            </svg>
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Select
                        defaultValue={[]}
                        name="categories"
                        options={convertToSelectInterface(categories)}
                        onChange={setACategory}
                        className="basic-select"
                        classNamePrefix="select"
                        placeholder="Category"
                    />
                </Row>
                <Row>
                    <Form.Control placeholder="Min Bid" ref={minBidBox} />
                    <Form.Control placeholder="Max Bid" ref={maxBidBox} />
                    <Form.Control placeholder="Min Buy Now Price" ref={minBuyNowBox} />
                    <Form.Control placeholder="Max Buy Now Price" ref={maxBuyNowBox} />
                </Row>
                {/* <Row>
                    <Form.Control placeholder="Location" ref={locationBox}/>
                </Row> */}
                <Row>
                    <Button type="button" className="btn btn-secondary" onClick={searchWithFilters}>
                        <svg width="15px" height="15px">
                            <path d="M11.618 9.897l4.224 4.212c.092.09.1.23.02.312l-1.464 1.46c-.08.08-.222.072-.314-.02L9.868 11.66M6.486 10.9c-2.42 0-4.38-1.955-4.38-4.367 0-2.413 1.96-4.37 4.38-4.37s4.38 1.957 4.38 4.37c0 2.412-1.96 4.368-4.38 4.368m0-10.834C2.904.066 0 2.96 0 6.533 0 10.105 2.904 13 6.486 13s6.487-2.895 6.487-6.467c0-3.572-2.905-6.467-6.487-6.467 "></path>
                        </svg>
                    </Button>
                </Row>
                <Row>
                    <ProductList productList={productList} />
                </Row>
            </Container>
        </React.Fragment>
    )

}

export default ViewCurrentAuctions;