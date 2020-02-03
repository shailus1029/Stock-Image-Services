import React, { Component } from "react";
import { Provider } from "react-redux";
import configureStore from "./Redux/Store/store.js";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "../src/Containers/Home/Home.jsx";
import SearchImages from "../src/Containers/Search/Search.jsx";
import Login from "../src/Containers/Login/Login.jsx";

class App extends Component {
	render() {
		return (
			<Provider store={configureStore()}>
				<BrowserRouter>
					<Switch>
						<Route exact path="/" component={Login} />
						<Route exact path="/upload" component={Home} />
						<Route exact path="/listing" component={SearchImages} />
					</Switch>
				</BrowserRouter>
			</Provider>
		);
	}
}

export default App;
