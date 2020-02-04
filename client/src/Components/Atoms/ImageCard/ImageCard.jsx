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
		<Card
			hoverable
			style={{ width: 240, height: 350 }}
			cover={
				<img
					alt="example"
					width="240px"
					height="225px"
					src={
						props.imageDetail && props.imageDetail.imageUrl ? `http://localhost:3000${props.imageDetail.imageUrl}` : ""
					}
				/>
			}
		>
			<Meta
				title={tagsData ? tagsData : ""}
				description={props.imageDetail && props.imageDetail.descriptions ? props.imageDetail.descriptions : ""}
			/>
		</Card>
	);
}
export default ImageCard;
