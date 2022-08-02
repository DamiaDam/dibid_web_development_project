import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Col, Container, ListGroup, ListGroupItem, Row, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { WALLET_BACKEND } from '../config';
import otherImg from '../images/categories/other.png';
import ProductList from './ProductList';

const Category: React.FC = () => {

    const params = useParams();
    const [productList,setProductList] = useState<number[]>([]);
    const [catName, setCatName] = useState<string>("");

    useEffect(() => {
		// load products from db
        const loadProducts = async () => {
            await axios.get(WALLET_BACKEND+'/products/cat/'+params.cat, { headers : {
                Authorization: `Bearer ${localStorage.getItem('apptoken')}`
            }})
            .then(res => {
                // TODO: check if res is correct
                setProductList(res.data);
            });
        }

        const getName = async () => {
            await axios.get(WALLET_BACKEND+`/categories/get/${params.cat}`
            ).then(res => {
                setCatName(res.data.name);
            })
        }

        loadProducts();
        getName();
	}, []);

    return (
        <React.Fragment>
            <h1>{catName}</h1>
            <ProductList productList={productList} />
        </React.Fragment>
    );
}

export default Category