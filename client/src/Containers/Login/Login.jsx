import React from "react";
import { withRouter } from "react-router-dom";
import "./Login.css";
import "antd/dist/antd.css";
import InputField from "../../Components/Atoms/InputField/InputField.jsx";
import ButtonField from "../../Components/Atoms/ButtonField/ButtonField.jsx";

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			password: "",
			error: false,
			errorText: "",
			correctPassword: "stock_images"
		};
		this.handlePassword = this.handlePassword.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
	}

	handlePassword(event) {
		const value = event.target.value;
		this.setState({
			password: value,
			error: false
		});
	}

	handleLogin() {
		const { password, correctPassword } = this.state;
		if (password === "") {
			this.setState({
				error: true,
				errorText: "***Please Enter Password"
			});
		} else if (password.trim() === correctPassword.trim()) {
			this.props.history.push("/listing");
		} else {
			this.setState({
				error: true,
				errorText: "***Please Enter Correct Password"
			});
		}
	}

	render() {
		return (
			<div className="loginContainer">
				<div className="loginText">
					<h1>Stock Image Services</h1>
				</div>
				<div className="loginDiv">
					<div className="passwordInput">
						<InputField type="password" value={this.state.password} handleChange={this.handlePassword} placeholderText="Enter Password" />
					</div>

					<div className="loginButton">
						<ButtonField type="primary" btnClass="searchButton" buttonText="Login" handleChange={this.handleLogin} />
					</div>
					{this.state.error ? (
						<div className="errorText">
							<p>{this.state.errorText}</p>
						</div>
					) : null}
				</div>
			</div>
		);
	}
}

export default withRouter(Login);
