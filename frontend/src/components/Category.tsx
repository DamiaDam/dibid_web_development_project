import React from 'react';
import { useParams } from 'react-router-dom';

interface CategoryProps {
    name?: string;
}

const Category: React.FC<CategoryProps> = ({name}) => {

    const params = useParams();

    return (
        <div>
            <h1>{params.cat}</h1>
            <span>Browse products of category {params.cat}:</span>
        </div>
    );
}

export default Category