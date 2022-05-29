import axios from "axios";
import React, { Dispatch, SetStateAction } from "react";
import { WALLET_BACKEND } from "../config";
import { Dropdown } from "./Dropdown";

interface DropDownProps {
    options: string[];
    setInterval: Dispatch<SetStateAction<string>>;
    name: string;
}

const DatetimeDropdown: React.FC<DropDownProps> = (props: DropDownProps) => {

    const datetimeOptions = ['now', '1h', '24h', 'custom'];

    const onDropdownChange = (e: any): void => {
        console.log('Selected country ', e.target.value);
        props.setInterval(e.target.value);
    }

    return(
        <React.Fragment>
            <Dropdown
                name={props.name}
                options={props.options}
                onDropdownChange={onDropdownChange}
            />
        </React.Fragment>
    );

}

export default DatetimeDropdown;