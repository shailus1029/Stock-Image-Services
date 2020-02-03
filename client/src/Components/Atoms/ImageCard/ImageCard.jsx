import React from "react";
import { Card } from "antd";
const { Meta } = Card;
import "./ImageCard.css";

function ImageCard(props) {
	let tagsData = "";
	if (props.imageDetail && props.imageDetail.tags) {
		props.imageDetail.tags.map(tag => {
			tagsData = tagsData + `#${tag} `;
		});
	}
	return (
		<Card hoverable style={{ width: 240, height: 350 }} cover={<img alt="example" height="225px" src={`http://localhost:3000${props.imageDetail.imageUrl}`} />}>
			<Meta title={tagsData} description={props.imageDetail.descriptions} />
		</Card>
	);
}
export default ImageCard;
