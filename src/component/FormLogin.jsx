import React, { Component } from "react";

class FormLogin extends Component {
	render() {
		return (
			<form className="flex flex-wrap" onSubmit={this.props.handleInputSubmit}>
				<div className="w-full flex bg-white rounded-lg mt-4 items-center text-gray-500">
					<i className="fas fa-user text-lg  ml-2 w-1/12"></i>
					<input
						type="text"
						placeholder="Usuario"
						name="username"
						className="bg-transparent w-10/12  p-2 focus:outline-none  border-transparent"
						value={this.props.username}
						onChange={this.props.handleInputChange}
					/>
				</div>
				<div className="w-full flex bg-white rounded-lg mt-4 items-center text-gray-500">
					<i className="fas fa-key text-lg  ml-2 w-1/12"></i>
					<input
						type="password"
						placeholder="Password"
						name="password"
						className="bg-transparent w-10/12  p-2 focus:outline-none  border-transparent"
						value={this.props.password}
						onChange={this.props.handleInputChange}
					/>
				</div>
				<button
					type="submit"
					className="mt-4 w-full capitalize text-center bg-green-500 hover:bg-green-600 transition-all rounded-lg py-2 text-lg mb-2 focus:outline-none "
					disabled={this.props.loading}
				>
					{this.props.loading ? (
						<i className="fas fa-spinner animate-spin "></i>
					) : (
						"Iniciar sesión"
					)}
				</button>
			</form>
		);
	}
}

export default FormLogin;
