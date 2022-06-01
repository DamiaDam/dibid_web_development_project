import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { WALLET_BACKEND } from '../config';
import { getUsernameFromApptoken } from '../utils';
import ProductList from './ProductList';

const MyProducts: React.FC = () => {

    const [productList, setProductList] = useState<number[]>([]);

    // Get all user's products
    useEffect(() => {
      
        const getUserProducts = async () => {
            await axios.get(WALLET_BACKEND+'/products/user/'+getUsernameFromApptoken()
            ).then(res => {
                console.log('rd: ', res.data)
                setProductList(res.data);
            })
        }
    
        getUserProducts();
    }, [])
    

    return <ProductList productList={productList} />;
}

export default MyProducts;