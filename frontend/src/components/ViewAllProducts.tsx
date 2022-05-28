import React, { useEffect, useState } from "react";
import '../css/lux/bootstrap.min.css'
import VerticalCard from "./VerticalCard";
import { Row } from 'react-bootstrap';
import { WALLET_BACKEND } from "../config";
import axios from "axios";

const ViewAllProducts: React.FC = () => {

    const [productList,setProductList] = useState<number[]>([]);

    useEffect(() => {
		// load products from db
        const loadProducts = async () => {
            await axios.get(WALLET_BACKEND+'/products/getall', { headers : {
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

    const renderList = (): JSX.Element[] => {
		return productList.map((id: any) => {
			return (
				<div key={id} id={id} style={{marginTop: '20px'}}>
					<VerticalCard productId={id}/>
				</div>
			);
		});
	}

    return (
        <React.Fragment>
            {renderList()}
        </React.Fragment>
    );
}

export default ViewAllProducts;