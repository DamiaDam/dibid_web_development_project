import axios from "axios";
import React, { Dispatch, SetStateAction } from "react";
import { WALLET_BACKEND } from "../config";
import { DropdownItemInterface } from "../interfaces";
import { Dropdown } from "./Dropdown";

interface DropDownProps {
    options: DropdownItemInterface[];
    setInterval: Dispatch<SetStateAction<string>>;
}

const DatetimeDropdown: React.FC<DropDownProps> = (props: DropDownProps) => {

    const onDropdownChange = (e: any): void => {
        console.log('Selected country ', e.target.value);
        props.setInterval(e.target.value);
    }

    return(
        <React.Fragment>
            <Dropdown
                name={'Starting Date'}
                options={props.options}
                onDropdownChange={onDropdownChange}
            />
        </React.Fragment>
    );

}

export default DatetimeDropdown;