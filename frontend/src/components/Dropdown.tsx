import { DropdownItemInterface } from "../interfaces";

export const Dropdown = (props: any) => (
    <div className="form-group">
      <select
        className="form-control"
        name="{props.name}"
        onChange={props.onDropdownChange}
      >
        <option>{props.name}</option>
        {props.options.map((option: DropdownItemInterface, index: any) => (
          <option key={index} value={option.key}>
            {option.value}
          </option>
        ))}
      </select>
    </div>
  )