import imagesApi from "../Api/images";

export function searchImages(body) {
	return dispatch => {
		imagesApi
			.searchImages(body)
			.then(response => {
				dispatch(searchImagesSuccess(response.data));
			})
			.catch(err => {
				dispatch(searchImagesFailure(err));
			});
	};
}

export function searchImagesSuccess(payload) {
	return {
		type: "SEARCH_IMAGE_SUCCESS",
		payload: payload
	};
}

export function searchImagesFailure(payload) {
	return {
		type: "SEARCH_IMAGE_ERROR",
		payload: payload
	};
}
