import React, { useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { CategoryInterface, LocationProps } from '../interfaces';

interface CategoriesListSmallProps {
    categories: CategoryInterface[];
    count: number
}

const CategoriesListSmall: React.FC<CategoriesListSmallProps> = ({ categories, count }) => {

    const { state } = useLocation() as unknown as LocationProps;
    const navigate = useNavigate();

    const [smCategories, setSmCategories] = useState<CategoryInterface[]>([]);

    useEffect(() => {

        var smCount: number;
        if (categories.length < count) {
            smCount = categories.length;
        }
        else
            smCount = count;

        setSmCategories(categories.slice(0, smCount));

    }, [categories])

    const renderCategories = (): JSX.Element[] => {
        return smCategories.map((category: CategoryInterface) => {
            return (
                <Nav.Link key={category.id} onClick={() => navigate(`/category/${category.id}`)} >{category.name}</Nav.Link>
            );
        });
    }


    return (
        <React.Fragment>
            {renderCategories()}
        </React.Fragment>
    )
}

export default CategoriesListSmall;