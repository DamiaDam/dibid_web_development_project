import axios from "axios";
import React, { useEffect, useState } from "react";
import { WALLET_BACKEND } from "../config";
import { CategoryInterface, SelectInterface } from "../interfaces";
import { convertToSelectInterface } from '../utils';
import Select from 'react-select';

interface CategorySelectorProps {
    defValue?: CategoryInterface[];
    onChange: (selection: SelectInterface[] | any) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({defValue, onChange}) => {

    const [categories, setCategories] = useState<CategoryInterface[]>([]);

    const [defaultValues, setDefaultValues] = useState<SelectInterface[]>([]);

    useEffect(() => {
        
        const getAllCategories = async () => {
            await axios.get(WALLET_BACKEND+'/categories/getall'
            ).then(res => {
                setCategories(res.data);
            })
        }
        
        getAllCategories();

        if(defValue){
            const dede: SelectInterface[] = convertToSelectInterface(defValue);
            // console.log('dede: ', dede)
            setDefaultValues(dede);
        }

    }, [defValue])

    // console.log('prop: ', defValue);
    // console.log('defValue: ', defaultValues);

    return(
        <React.Fragment>
            <p>Categories</p>
            { defValue && defaultValues.length > 0 &&
                <Select
                    defaultValue={defaultValues}
                    isMulti
                    name="categories"
                    options={convertToSelectInterface(categories)}
                    onChange={onChange}
                    className="basic-multi-select"
                    classNamePrefix="select"
                />
            }
            { !defValue &&
                <Select
                    defaultValue={[]}
                    isMulti
                    name="categories"
                    options={convertToSelectInterface(categories)}
                    onChange={onChange}
                    className="basic-multi-select"
                    classNamePrefix="select"
                />
            }
        </React.Fragment>
    );
}

export default CategorySelector;