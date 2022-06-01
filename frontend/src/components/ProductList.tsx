import React from "react";
import VerticalCard from "./VerticalCard";

interface ProductListProps {
    productList: number[];
}

const ProductList: React.FC<ProductListProps> = ({productList}) => {

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

export default ProductList;