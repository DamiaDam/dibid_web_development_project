import axios, { AxiosResponse } from "axios";
import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { LocationProps } from "../interfaces";
import { getUsernameFromApptoken } from "../utils";
import VerticalCard from "./VerticalCard";

interface ProductListProps {
    productList: number[];
	msgBtn?: boolean
}

const ProductList: React.FC<ProductListProps> = ({productList, msgBtn=false}) => {

	console.log('prodlist: ', productList)

	const { state } = useLocation() as unknown as LocationProps;
  	const navigate = useNavigate();

	const messageSeller = async (itemId: number) => {
		const response: AxiosResponse = await axios.get(BACKEND_URL + "/products/id/" + itemId,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('apptoken')}`
          }
        })

		const seller: string = response.data.seller;

		const sender: string = getUsernameFromApptoken();

		navigate(`/messages/${sender}/${seller}`);

		
	}

    const renderList = (): JSX.Element[] => {
			return productList.map((id: any) => {
				return (
					<Col sm={3} key={id}>
						<div id={id} style={{marginTop: '20px'}}>
							<VerticalCard productId={id} />
							{msgBtn &&
								<Button className="my-2 rounded" onClick={() => messageSeller(id)}>Message Seller</Button>
							}
						</div>
					</ Col>
				);
			});
	}

    return (
        <React.Fragment>
			<Row>
            	{
				productList.length > 0 &&
				renderList()}
			</Row>
        </React.Fragment>
    );
}

export default ProductList;