import axios from "axios";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { WALLET_BACKEND } from "../config";
import { Dropdown } from "./Dropdown";

interface CountryDropDownProps {
    setCountry: Dispatch<SetStateAction<string>>;
}

const CountryDropdown: React.FC<CountryDropDownProps> = (props: CountryDropDownProps) => {

    const [countries, setCountries] = useState<string[]>([]);

    useEffect(() => {
		// load countries from db
		axios.get(`${WALLET_BACKEND}/countries/getall`)
    .then(res => {
      console.log('countryList: ', res.data);
      const countryList = res.data;
      setCountries(countryList);
		});
	}, []);

    const onDropdownChange = (e: any): void => {
        console.log('Selected country ', e.target.value);
        props.setCountry(e.target.value);
    }

    return(
        <React.Fragment>
            <Dropdown 
                name={'Country'}
                options={countries}
                onDropdownChange={onDropdownChange}
            />
        </React.Fragment>
    );

}

export default CountryDropdown;