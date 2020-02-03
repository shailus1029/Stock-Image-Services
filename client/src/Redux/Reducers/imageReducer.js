const initialState = {
	loading: false,
	images: [],
	error: false
};

const imageReducer = (state = initialState, action) => {
	console.log("action======>>>>", action);
	switch (action.type) {
		case "SEARCH_IMAGE_SUCCESS":
			return Object.assign({}, state, {
				images: action.payload
			});

		case "SEARCH_IMAGE_ERROR":
			return Object.assign({}, state, {
				error: true
			});

		default:
			return Object.assign({}, state);
	}
};

export default imageReducer;
