import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { testAction } from "../../Redux/Actions/homeAction.js";
import "./Home.css";
import axios from "axios";
import ButtonField from "../../Components/Atoms/ButtonField/ButtonField.jsx";
import LoadingScreen from "../../utils/LoadingScreen";
import { Modal } from "antd";

let fileObj = [];
let fileArray = [];
let predefinedTags = ["beauty", "nature", "mountain", "hill", "glamour", "Technology", "science", "machine learning"];

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			file: [null],
			descriptions: [],
			tags: [],
			loading: false,
			showModal: false
		};
		this.handleOk = this.handleOk.bind(this);
		this.handleModal = this.handleModal.bind(this);
		this.uploadFiles = this.uploadFiles.bind(this);
		this.handleListing = this.handleListing.bind(this);
		this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this);
	}

	uploadMultipleFiles(e) {
		console.log(e.target.files);
		fileObj.push(e.target.files);
		for (let i = 0; i < fileObj[0].length; i++) {
			fileArray.push(URL.createObjectURL(fileObj[0][i]));
		}
		this.setState({ file: fileArray });
	}

	handleModal() {
		this.setState({
			showModal: !this.state.showModal
		});
	}

	handleOk() {
		this.setState({
			showModal: !this.state.showModal
		});
		this.props.history.push("/listing");
	}

	handleListing() {
		this.props.history.push("/listing");
	}

	uploadFiles(e) {
		e.preventDefault();
		this.setState({
			loading: true
		});
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
			url: `http://localhost:3000/api/images/bulkUpload`,
			data: formData
		}).then(res => {
			this.setState({
				loading: false,
				showModal: true
			});
			fileObj = [];
			fileArray = [];
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
		const { loading } = this.state;
		if (loading) {
			return (
				<div style={{ paddingTop: "15%" }}>
					<LoadingScreen loading={true} size={150} />
				</div>
			);
		}
		return (
			<React.Fragment>
				<div className="homeContainer">
					<form>
						<div className="uploadWrapper">
							<div className="form-group">
								<input type="file" className="form-control" onChange={this.uploadMultipleFiles} multiple />
							</div>
							<div className="uploadBtn">
								<ButtonField
									type="primary"
									btnClass="searchButton"
									buttonText="Upload"
									handleChange={this.uploadFiles}
								/>
							</div>
							<div className="backButton">
								<ButtonField
									type="primary"
									btnClass="searchButton"
									buttonText="Go to gallery"
									handleChange={this.handleListing}
								/>
							</div>
						</div>
						<div className="form-group multi-preview preview">
							{(fileArray || []).map((url, index) => (
								<div className="imagePreview" key={index}>
									<img src={url} height="200px" width="250px" alt="imgPreview" />
									<div className="descriptionInput">
										<input
											type="text"
											className="form-control"
											onChange={event => {
												this.handleDescription(event, index);
											}}
											placeholder="Add Description"
											className="inputText"
										/>
									</div>
								</div>
							))}
						</div>
					</form>
				</div>
				<Modal title="Success" visible={this.state.showModal} onCancel={this.handleOk} onOk={this.handleOk}>
					<p>Image is uploaded successfully</p>
					<p>Click on the OK Button to see the image listing</p>
				</Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
