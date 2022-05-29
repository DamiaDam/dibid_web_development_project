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