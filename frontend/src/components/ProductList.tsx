import React from "react";
import { Col, Row } from "react-bootstrap";
import VerticalCard from "./VerticalCard";

interface ProductListProps {
    productList: number[];
}

const ProductList: React.FC<ProductListProps> = ({productList}) => {

	console.log('prodlist: ', productList)

    const renderList = (): JSX.Element[] => {
			return productList.map((id: any) => {
				return (
					<Col sm={3} key={id}>
						<div id={id} style={{marginTop: '20px'}}>
							<VerticalCard productId={id}/>
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