import React from "react";
import { DatePicker } from "antd";
import moment from "moment";

const DateField = props => {
	const dateFormat = "MM/DD/YYYY";
	return (
		<DatePicker
			style={{ marginLeft: "10px", marginRight: "10px" }}
			format={dateFormat}
			value={moment(props.value ? props.value : new Date(), dateFormat)}
			onChange={props.handleDateChange}
			placeholder={props.placeholderText}
		/>
	);
};

export default DateField;
