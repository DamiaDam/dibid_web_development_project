import axios from "axios";
import React, { useEffect, useState } from "react";
import { WALLET_BACKEND } from "../config";
import { CategoryInterface, SelectInterface } from "../interfaces";
import { convertToSelectInterface } from '../utils';
import Select from 'react-select';

interface CategorySelectorProps {
    onChange: (selection: SelectInterface[] | any) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({onChange}) => {

    const [categories, setCategories] = useState<CategoryInterface[]>([]);

    useEffect(() => {
        
        const getAllCategories = async () => {
            await axios.get(WALLET_BACKEND+'/categories/getall'
            ).then(res => {
                setCategories(res.data);
            })
        }
        
        getAllCategories();
    }, [])

    return(
        <React.Fragment>
            <p>Categories</p>
            <Select
                defaultValue={[]}
                isMulti
                name="categories"
                options={convertToSelectInterface(categories)}
                onChange={onChange}
                className="basic-multi-select"
                classNamePrefix="select"
            />
        </React.Fragment>
    );
}

export default CategorySelector;