import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from 'react-select';
import { WALLET_BACKEND } from "../config";
import { SelectInterface } from "../interfaces";


interface CountryDropDownProps {
    setCountry: (selection: SelectInterface[] | any) => void;
}

const CountryDropdown: React.FC<CountryDropDownProps> = (props: CountryDropDownProps) => {

    const [countries, setCountries] = useState<SelectInterface[] | any[]>([]);

    useEffect(() => {
		// load countries from db
		axios.get(`${WALLET_BACKEND}/countries/getall`)
        .then(res => {
            console.log('countryList: ', res.data);
            const countryList = res.data;
            const countries: SelectInterface[] = [];

            countryList.forEach((country: any) => {
                countries.push({value: country.id, label: country.name})
            });

            setCountries(countries);
		});
	}, []);

    return(
        <React.Fragment>
        <p>Country</p>
        <Select
            defaultValue={[]}
            name="countries"
            options={countries}
            onChange={props.setCountry}
            className="country-select"
            classNamePrefix="select"
        />
    </React.Fragment>
    );

}

export default CountryDropdown;