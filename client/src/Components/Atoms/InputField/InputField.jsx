import React from "react";
import { Input } from "antd";

const InputField = props => {
	return (
		<Input
			placeholder={props.placeholderText}
			style={{ width: `${props.inputFieldWidth}` }}
			onChange={props.handleChange}
			value={props.value}
			type={props.type}
		/>
	);
};

export default InputField;
