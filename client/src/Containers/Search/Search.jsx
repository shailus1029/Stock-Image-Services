import React from "react";
import "./Search.css";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroller";
import InputField from "../../Components/Atoms/InputField/InputField.jsx";
import ButtonField from "../../Components/Atoms/ButtonField/ButtonField.jsx";
import DateField from "../../Components/Atoms/DateField/DateField.jsx";
import ImageCard from "../../Components/Atoms/ImageCard/ImageCard.jsx";
import { searchImages } from "../../Redux/Actions/imageAction";

class SearchImages extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			descriptions: "",
			tags: "",
			fromDate: "",
			toDate: "",
			images: [],
			hasMoreItems: true,
			pageNumber: 0,
			pageSize: 30
		};

		this.showItems = this.showItems.bind(this);
		this.handleUpload = this.handleUpload.bind(this);
		this.handleTags = this.handleTags.bind(this);
		this.handleToDate = this.handleToDate.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.handleFromDate = this.handleFromDate.bind(this);
		this.handleDescription = this.handleDescription.bind(this);
	}

	componentDidMount() {
		const body = {
			tags: "",
			fromDate: "",
			toDate: "",
			descriptions: ""
		};
		this.props.searchImages(body);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.imageReducer.images !== this.props.imageReducer.images) {
			this.setState({
				images: this.props.imageReducer.images
			});
		}
	}

	handleDescription(event) {
		const value = event.target.value;
		this.setState({
			descriptions: value
		});
	}

	handleTags(event) {
		const value = event.target.value;
		this.setState({
			tags: value
		});
	}

	handleFromDate(date, dateString) {
		this.setState({
			fromDate: dateString
		});
	}

	handleToDate(date, dateString) {
		this.setState({
			toDate: dateString
		});
	}

	handleUpload() {
		this.props.history.push("/upload");
	}

	handleSearch() {
		const { tags, fromDate, toDate, descriptions } = this.state;
		const body = {
			tags,
			fromDate,
			toDate,
			descriptions
		};
		this.props.searchImages(body);
	}

	showItems() {
		const { pageNumber, pageSize } = this.state;
		if (this.state.images.length > 0) {
			var items = [];
			const len =
				(pageNumber + 1) * pageSize <= this.state.images.length
					? (pageNumber + 1) * pageSize
					: this.state.images.length;
			for (let i = 0; i < len; i++) {
				items.push(
					<div key={i} className="singleImageCard">
						<ImageCard imageDetail={this.state.images[i]} />
					</div>
				);
			}
		}
		return items;
	}

	loadMore() {
		const { pageNumber, pageSize } = this.state;
		if ((pageNumber + 1) * pageSize === this.state.images.length && this.state.images.length !== 0) {
			this.setState({ hasMoreItems: false });
		} else if ((pageNumber + 1) * pageSize < this.state.images.length) {
			setTimeout(() => {
				this.setState({ pageNumber: pageNumber + 1 });
			}, 2000);
		}
	}

	render() {
		return (
			<div style={{ width: "100%" }}>
				<div className="searchBarDiv">
					<div className="searchItem">
						<div>
							<p>Description</p>
						</div>
						<InputField
							value={this.state.descriptions}
							handleChange={this.handleDescription}
							placeholderText="Search By Description"
						/>
					</div>
					<div className="searchItem">
						<div>
							<p>Tags</p>
						</div>
						<InputField
							value={this.state.tags}
							handleChange={this.handleTags}
							placeholderText="Search By Description"
						/>
					</div>
					<div className="searchItem">
						<div className="dateDiv">
							<p>From Date</p>
						</div>
						<DateField
							value={this.state.fromDate}
							className="datePicker"
							handleDateChange={this.handleFromDate}
							placeholderText="From Date"
						/>
					</div>
					<div className="searchItem">
						<div className="dateDiv">
							<p>To Date</p>
						</div>
						<DateField
							value={this.state.toDate}
							className="datePicker"
							handleDateChange={this.handleToDate}
							placeholderText="To Date"
						/>
					</div>
					<div className="searchItem searchbtn">
						<ButtonField type="primary" btnClass="searchButton" buttonText="Search" handleChange={this.handleSearch} />
					</div>
					<div className="searchItem searchbtn">
						<ButtonField type="primary" btnClass="searchButton" buttonText="Upload" handleChange={this.handleUpload} />
					</div>
				</div>
				{this.state.images.length > 0 ? (
					<div className="imageGallery" style={{ height: "700px", overflow: "auto" }}>
						<InfiniteScroll
							loadMore={this.loadMore.bind(this)}
							hasMore={this.state.hasMoreItems}
							loader={<div className="loader"> Loading... </div>}
							useWindow={false}
						>
							{this.showItems()}
						</InfiniteScroll>
					</div>
				) : (
					<div className="noImageFoundText">
						<p>No Images Found</p>
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		imageReducer: state.imageReducer
	};
};

const mapDispatchToProps = dispatch => {
	return {
		searchImages: page => {
			dispatch(searchImages(page));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchImages);
