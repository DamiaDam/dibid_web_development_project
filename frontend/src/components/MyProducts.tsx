import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Pagination, Row } from 'react-bootstrap';
import { PAGE_SIZE, BACKEND_URL } from '../config';
import { getUsernameFromApptoken } from '../utils';
import ProductList from './ProductList';

const MyProducts: React.FC = () => {

    const [productList, setProductList] = useState<number[]>([]);
    const [totalProducts, setTotalProducts] = useState<number>(0);
    const [page, setPage] = useState<number>(1);

    // Get all user's products
    useEffect(() => {

        const getUserProducts = async () => {
            await axios.post(BACKEND_URL + '/products/user/' + getUsernameFromApptoken(),
                { pageNumber: page, pageSize: PAGE_SIZE }
            ).then(res => {
                console.log('rd: ', res.data)
                setProductList(res.data.products);
                setTotalProducts(res.data.total);
            })
        }

        getUserProducts();
    }, [page]);

    const paginator = (e: any) => {
        setPage(+e.target.text);
    }


    return (
        <Container>
            <h1>My Products</h1>
            <Row>
                <ProductList productList={productList} />
            </Row>
            {totalProducts > 0 &&
                <Row>
                    <Pagination>
                        {page > 1 && <Pagination.Item onClick={(e) => paginator(e)}>{1}</Pagination.Item>}
                        {page > 3 && <Pagination.Ellipsis />}
                        {page > 2 && <Pagination.Item onClick={(e) => paginator(e)}>{page - 1}</Pagination.Item>}
                        <Pagination.Item active>{page}</Pagination.Item>
                        {page + 1 < (Math.ceil(totalProducts / PAGE_SIZE)) && <Pagination.Item onClick={(e) => paginator(e)}>{page + 1}</Pagination.Item>}
                        {page + 2 < (Math.ceil(totalProducts / PAGE_SIZE)) && <Pagination.Ellipsis />}
                        {page < (Math.ceil(totalProducts / PAGE_SIZE)) && <Pagination.Item onClick={(e) => paginator(e)}>{Math.ceil(totalProducts / PAGE_SIZE)}</Pagination.Item>}
                    </Pagination>
                </Row>
            }
        </Container>
    )
}

export default MyProducts;