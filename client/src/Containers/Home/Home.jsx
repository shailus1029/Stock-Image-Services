import React, { Component } from "react";
import { connect } from "react-redux";
import { testAction } from "../../Redux/Actions/homeAction.js";
import "./Home.css";
import axios from "axios";

let fileObj = [];
let fileArray = [];
let predefinedTags = ["beauty", "nature", "mountain", "hill", "glamour", "Technology", "science", "machine learning"];

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			file: [null],
			descriptions: [],
			tags: []
		};
		this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this);
		this.uploadFiles = this.uploadFiles.bind(this);
	}

	simpleAction(event) {
		this.props.simpleAction();
	}

	uploadMultipleFiles(e) {
		console.log(e.target.files);
		fileObj.push(e.target.files);
		for (let i = 0; i < fileObj[0].length; i++) {
			fileArray.push(URL.createObjectURL(fileObj[0][i]));
		}
		this.setState({ file: fileArray });
	}

	uploadFiles(e) {
		e.preventDefault();
		const formData = new FormData();
		fileObj = fileObj[0];
		for (let key in fileObj) {
			formData.append("fileUpload", fileObj[key]);
		}
		formData.append("imagesData", JSON.stringify(this.state.descriptions));
		axios({
			method: "post",
			headers: {
				"Content-Type": "multipart/form-data"
			},
			url: `http://localhost:9005/api/images/bulkUpload`,
			data: formData
		}).then(res => {
			console.log(res);
			console.log(res.data);
		});
	}

	handleDescription(event, index) {
		const value = event.target.value;
		let temp = "";
		for (let key in fileObj[0]) {
			if (fileObj[0].hasOwnProperty(key) && key == index) {
				temp = fileObj[0][key].name;
			}
		}
		const obj = {
			[`${temp}`]: {
				description: value,
				tags: [predefinedTags[Math.floor(Math.random() * predefinedTags.length)]]
			}
		};
		const data = this.state.descriptions;
		let updatedData = [];
		if (data.length === 0) {
			updatedData = updatedData.concat(obj);
		} else {
			for (let i = 0; i < data.length; i++) {
				let isFound = false;
				for (let key in data[i]) {
					if (data[i].hasOwnProperty(key) && key == temp) {
						isFound = true;
					}
					if (isFound) {
						updatedData = data.map(item => {
							for (let key in item) {
								if (item.hasOwnProperty(key) && key == temp) {
									item[key].description = value;
									item[key].tags = [predefinedTags[Math.floor(Math.random() * predefinedTags.length)]];
								}
								return item;
							}
						});
					} else {
						updatedData = data.concat(obj);
					}
				}
			}
		}
		this.setState({
			descriptions: updatedData
		});
	}

	render() {
		return (
			<React.Fragment>
				<div className="homeContainer">
					<form>
						<div className="form-group multi-preview preview">
							{(fileArray || []).map((url, index) => (
								<div key={index}>
									<img src={url} height="100px" width="100px" alt="imgPreview" />
									<input
										type="text"
										className="form-control"
										onChange={event => {
											this.handleDescription(event, index);
										}}
									/>
								</div>
							))}
						</div>

						<div className="form-group">
							<input type="file" className="form-control" onChange={this.uploadMultipleFiles} multiple />
						</div>
						<button type="button" className="btn btn-danger btn-block" onClick={this.uploadFiles}>
							Upload
						</button>
					</form>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		homeReducer: state.homeReducer
	};
};

const mapDispatchToProps = dispatch => ({
	simpleAction: () => dispatch(testAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
