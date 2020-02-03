import React from "react";
import { Button } from "antd";

const ButtonField = props => {
	return (
		<Button className={`${props.btnClass}`} style={{ margin: `${props.margin}` }} type={props.type} onClick={props.handleChange}>
			{props.buttonText}
		</Button>
	);
};

export default ButtonField;
