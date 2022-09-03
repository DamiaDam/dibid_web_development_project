import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Col } from "react-bootstrap"
import { useLocation, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { CategoryInterface, LocationProps } from "../interfaces";


export interface CategoryPreviewCardInterface {
	category: CategoryInterface;
	image: any;
}

const CategoryPreviewCard: React.FC<CategoryPreviewCardInterface> = ({category, image}) => {

	const navigate = useNavigate();
	const { state } = useLocation() as unknown as LocationProps;

	const visitCategory = async () => {
		navigate(`/category/${category.id}`, { state: state });
	};

	const [productCount, setProductCount] = useState({total: 0, active: 0})

	useEffect(() => {
	  
	  const fetchProducts = async () => {

		await axios.get(BACKEND_URL+`/products/catcount/${category.id}`
        ).then(res => {
			setProductCount(res.data);
        })

	  }
	
	  fetchProducts()
	}, [])
	

	return(
		<Col>
			<Card style={{ width: '15rem', height: '20rem' }}>
			<div className='zoom'>
				<Card.Link onClick={visitCategory}><Card.Img variant="top" src={image} /></Card.Link>
			</div>
			<Card.Body>
				<ul className="list-unstyled">
					<Card.Title className='underline-on-hover'>
						<Card.Link onClick={visitCategory} style={{ textDecoration: 'none' }}>
							{category.name}
						</Card.Link>
					</Card.Title>
					<li>Total Products: {productCount.total}</li>
					<li>Active Products: {productCount.active}</li>
				</ul>
			</Card.Body>
			</Card>
		</Col>
	);
}

export default CategoryPreviewCard