import axios from "axios";
import React, { useEffect, useState } from "react";
import { WALLET_BACKEND } from "../config";
import { CategoryInterface, SelectInterface } from "../interfaces";
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

    const convertToSelectInterface = (categories: CategoryInterface[]): any[] => {

        const options: SelectInterface[] = [];

        categories.map( (category: CategoryInterface) => {
            options.push({value: category.id.toString(), label: category.name})
        });

        return options;
    }

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