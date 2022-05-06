import axios from "axios";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { WALLET_BACKEND } from "../config";

interface CountryDropDownProps {
    setCountry: Dispatch<SetStateAction<string>>;
}

// interface DropDownProps {
//     setCountry: Dispatch<SetStateAction<string>>;
//     onChange;
// }

export const Dropdown = (props: any) => (
    <div className="form-group">
      <select
        className="form-control"
        name="{props.name}"
        onChange={props.onDropdownChange}
      >
        <option>{props.name}</option>
        {props.options.map((country: any, index: any) => (
          <option key={index} value={country}>
            {country}
          </option>
        ))}
      </select>
    </div>
  )

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


// export default class DropdownList extends React.Component {
//   constructor() {
//     super()
//     this.state = {
//       list: [],
//       chosenValue: '',
//     }
//   }

//   componentDidMount() {
//     fetch('http://universities.hipolabs.com/search?country=United+Kingdom')
//       .then((response) => response.json())
//       .then((item) => this.setState({ list: item }))
//   }

//   onDropdownChange = (e) => {
//     this.setState({ chosenValue: e.target.value })
//   }

//   render() {
//     return (
//       <div>
//         <h2>React Bootstrap Dropdown Select Box Example</h2>

//         <Dropdown
//           name={this.state.name}
//           options={this.state.list}
//           onDropdownChange={this.onDropdownChange}
//         />
//       </div>
//     )
//   }
// }