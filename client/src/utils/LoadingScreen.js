import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
export default function LoadingScreen(props) {
	return (
		<div
			className="sweet-loading"
			style={{
				width: "100%",
				display: "flex",
				justifyContent: "center",
				margin: "25px 0"
			}}
		>
			<ClipLoader
				css={`
					margin: auto;
				`}
				sizeUnit={"px"}
				size={props.size}
				color="#D3AE4F"
				loading={props.loading}
			/>
		</div>
	);
}
