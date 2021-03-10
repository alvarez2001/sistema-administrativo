import React, { Component } from "react";
import Fondo from "../../assets/imgs/backgroundLogin.jpg";
import { config } from "../../config";
import axios from "axios";
import FormLogin from "../../component/FormLogin";

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			form: {
				username: "",
				password: "",
			},
			loading: false,
			error: [],
		};
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			form: {
				...this.state.form,
				[name]: value,
			},
		});
	}

	redirigir = (location) => {
		this.props.history.push(location);
	};

	handleInputSubmit = (event) => {
		event.preventDefault();

		this.setState({
			loading: true,
		});
		axios
			.post(config.url + "/usuario/login", this.state.form)
			.then((response) => {
				this.setState({ loading: false });
				sessionStorage.setItem("user-token", response.data?.data?.token);
				const json = JSON.stringify(response.data?.data?.usuario);
				sessionStorage.setItem("usuario", json);
				this.redirigir("/dashboard");
			})
			.catch((error) => {
				this.setState({
					loading: false,
					error: error.response?.data?.errores,
				});
				console.log(error.response);
			});
	};

	render() {
		if (sessionStorage.getItem("user-token")) {
			return this.redirigir("/dashboard");
		}

		let style = "bg-red-500 bg-opacity-80 rounded-lg text-left p-2 ";
		if (this.state?.error?.length < 1) {
			style += "hidden";
		}

		return (
			<React.Fragment>
				<div
					className="h-screen w-full relative bg-fixed bg-cover bg-no-repeat flex justify-center items-center"
					style={{
						backgroundImage: "url(" + Fondo + ")",
					}}
				>
					<div
						className="bg-gray-900  text-white text-center p-3  rounded-lg w-full sm:w-5/12 md:w-3/12 bg-opacity-40 "
						style={{
							minHeight: "300px",
						}}
					>
						<h1 className="text-5xl mb-8 mt-4 font-lobster tracking-wider">
							Login
						</h1>
						<div className={style}>
							<ul className="text-xs ">
								{this.state?.error?.map((error, index) => {
									return (
										<li className="py-1" key={index}>
											{error?.msg}
										</li>
									);
								})}
							</ul>
						</div>
						<FormLogin
							{...this.state.form}
							loading={this.state.loading}
							handleInputChange={this.handleInputChange}
							handleInputSubmit={this.handleInputSubmit}
						/>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Login;
