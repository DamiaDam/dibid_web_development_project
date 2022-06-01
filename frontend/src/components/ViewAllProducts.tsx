import React, { useEffect, useState } from "react";
import '../css/lux/bootstrap.min.css'
import { WALLET_BACKEND } from "../config";
import axios from "axios";
import ProductList from "./ProductList";

const ViewAllProducts: React.FC = () => {

    const [productList,setProductList] = useState<number[]>([]);

    useEffect(() => {
		// load products from db
        const loadProducts = async () => {
            await axios.get(WALLET_BACKEND+'/products/active', { headers : {
                Authorization: `Bearer ${localStorage.getItem('apptoken')}`
            }})
            .then(res => {
                // TODO: check if res is correct
                console.log(res.data);
                setProductList(res.data);
            });
        }

        loadProducts();
	}, []);

    return (
        <ProductList productList={productList} />
    );
}

export default ViewAllProducts;