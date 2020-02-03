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
			arr: [1, 2, 3, 4, 5],
			hasMoreItem: true,
			images: []
		};
		this.handleTags = this.handleTags.bind(this);
		this.handleToDate = this.handleToDate.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.handleFromDate = this.handleFromDate.bind(this);
		this.handleDescription = this.handleDescription.bind(this);
		this.handleLoadMoreImages = this.handleLoadMoreImages.bind(this);
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

	handleLoadMoreImages() {
		const { arr } = this.state;
		const newarra = arr.concat([1, 1, 1, 1, 1]);
		this.setState({
			arr: newarra
		});
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

	handleLoadMoreImages() {}

	render() {
		const { images } = this.state;
		const items = images.map(item => {
			return (
				<div className="singleImageCard">
					<ImageCard imageDetail={item} />
				</div>
			);
		});
		return (
			<div style={{ width: "100%" }}>
				<div className="searchBarDiv">
					<div className="searchItem">
						<InputField value={this.state.descriptions} handleChange={this.handleDescription} placeholderText="Search By Description" />
					</div>
					<div className="searchItem">
						<InputField value={this.state.tags} handleChange={this.handleTags} placeholderText="Search By Description" />
					</div>
					<div className="searchItem">
						<DateField className="datePicker" handleDateChange={this.handleFromDate} placeholderText="From Date" />
					</div>
					<div className="searchItem">
						<DateField className="datePicker" handleDateChange={this.handleToDate} placeholderText="To Date" />
					</div>
					<div className="searchItem">
						<ButtonField type="primary" btnClass="searchButton" buttonText="Search" handleChange={this.handleSearch} />
					</div>
				</div>
				<div className="imageGallery">
					<InfiniteScroll
						pageStart={0}
						threshold={10}
						loadMore={() => {
							console.log("load moree");
						}}
						// loadMore={this.handleLoadMoreImages.bind(this)}
						hasMore={this.state.hasMoreItem}
						// loader={
						// 	<div className="loader" key={0}>
						// 		Loading ...
						// 	</div>
						// }
					>
						{items}
					</InfiniteScroll>
				</div>
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
