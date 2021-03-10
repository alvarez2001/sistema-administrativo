import axios from "axios";
import React, { Component } from "react";
import { config, headersAuth } from "../../../../config";

class CrearUsuario extends Component {
	constructor(props) {
		super(props);

		this.state = {
			usuario: {
				nombre: "",
				apellido: "",
				email: "",
				password: "",
				username: "",
				image: "",
			},
			loading: false,
			success: false,
			data: "",
			error: [],
		};
	}

	handleInputChange = (event) => {
		const target = event.target;

		this.setState({
			usuario: {
				...this.state.usuario,
				[target.name]: target.value,
			},
		});
	};

	handleInputSubmit = (event) => {
		event.preventDefault();
		const imageInput = document.querySelector("#image").files[0];
		const image = imageInput ? imageInput : null;

		const { apellido, username, email, nombre, password } = this.state.usuario;

		const form = new FormData();
		form.append("image", image);
		form.append("nombre", nombre);
		form.append("apellido", apellido);
		form.append("username", username);
		form.append("email", email);
		form.append("password", password);

		this.setState({
			loading: true,
		});
		axios
			.post(config.url + "/usuario/registro", form, {
				headers: {
					"Content-Type": "multipart/form-data",
					...headersAuth(),
				},
			})
			.then((response) => {
				this.setState({
					usuario: {
						nombre: "",
						apellido: "",
						email: "",
						password: "",
						username: "",
						image: "",
					},
					loading: false,
					success: true,
					data: response.data?.data,
					error: [],
				});
			})
			.catch((error) => {
				this.setState({
					loading: false,
					success: false,
					error: error.response?.data?.errores,
				});
			});
	};

	render() {
		let style = " text-white bg-opacity-80 rounded-lg text-left p-2 ";
		if (this.state?.error?.length < 1 && !this.state.success) {
			style += "hidden ";
		}
		this.state.success ? (style += " bg-green-500") : (style += " bg-red-500");

		return (
			<React.Fragment>
				<div className="my-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
					<form
						className="w-full  bg-gray-100  p-3 rounded-lg shadow-lg"
						onSubmit={this.handleInputSubmit}
					>
						<h3 className="capitalize text-lg font-semibold">Crear Usuario</h3>
						<div className="flex flex-wrap">
							<label
								className="w-full capitalize text-xs py-2 pl-1"
								htmlFor="nombre"
							>
								Nombre:
							</label>
							<input
								type="text"
								className="rounded-lg shadow-md p-2 focus:outline-none w-full"
								placeholder="Nombre"
								value={this.state.usuario.nombre}
								onChange={this.handleInputChange}
								name="nombre"
								autoComplete="off"
							/>
						</div>
						<div className="flex flex-wrap">
							<label
								className="w-full capitalize text-xs py-2 pl-1"
								htmlFor="apellido"
							>
								apellido:
							</label>
							<input
								type="text"
								className="rounded-lg shadow-md p-2 focus:outline-none w-full"
								placeholder="Apellido"
								name="apellido"
								value={this.state.usuario.apellido}
								onChange={this.handleInputChange}
								autoComplete="off"
							/>
						</div>
						<div className="flex flex-wrap">
							<label
								className="w-full capitalize text-xs py-2 pl-1"
								htmlFor="email"
							>
								Email:
							</label>
							<input
								type="email"
								className="rounded-lg shadow-md p-2 focus:outline-none w-full"
								placeholder="Email"
								name="email"
								value={this.state.usuario.email}
								onChange={this.handleInputChange}
								autoComplete="off"
							/>
						</div>
						<div className="flex flex-wrap">
							<label
								className="w-full capitalize text-xs py-2 pl-1"
								htmlFor="username"
							>
								username:
							</label>
							<input
								type="text"
								className="rounded-lg shadow-md p-2 focus:outline-none w-full"
								placeholder="Username"
								name="username"
								value={this.state.usuario.username}
								onChange={this.handleInputChange}
								autoComplete="off"
							/>
						</div>
						<div className="flex flex-wrap">
							<label
								className="w-full capitalize text-xs py-2 pl-1"
								htmlFor="password"
							>
								password:
							</label>
							<input
								type="password"
								className="rounded-lg shadow-md p-2 focus:outline-none w-full"
								placeholder="password"
								name="password"
								value={this.state.usuario.password}
								onChange={this.handleInputChange}
							/>
						</div>
						<div className="flex flex-wrap">
							<label
								className="w-full capitalize text-xs py-2 pl-1"
								htmlFor="image"
							>
								imagen:
							</label>
							<input
								type="file"
								className="rounded-lg   p-2 pt-0 focus:outline-none w-full"
								placeholder="Imagen"
								name="image"
								id="image"
								value={this.state.usuario.image}
								onChange={this.handleInputChange}
							/>
						</div>

						<button
							type="submit"
							className="mt-4 w-full capitalize text-center bg-green-500 hover:bg-green-600 transition-all rounded-lg py-2 text-lg text-white focus:outline-none "
						>
							{this.state.loading ? (
								<i className="fas fa-spinner animate-spin "></i>
							) : (
								"Guardar usuario"
							)}
						</button>
					</form>
					<div className="w-full row-start-1  sm:row-start-auto">
						<div className="flex flex-wrap bg-gray-100  p-3 rounded-lg shadow-lg">
							<div className="w-full">
								<h3 className="capitalize text-lg font-semibold pb-2">
									Datos Usuario
								</h3>
								<p className="text-sm pb-2">
									<span className="font-medium ">Nombre: </span>
									{this.state.usuario.nombre}
								</p>
								<p className="text-sm pb-2">
									<span className="font-medium ">Apellido: </span>
									{this.state.usuario.apellido}
								</p>
								<p className="text-sm pb-2">
									<span className="font-medium ">Email: </span>
									{this.state.usuario.email}
								</p>
								<p className="text-sm pb-2">
									<span className="font-medium ">Username: </span>
									{this.state.usuario.username}
								</p>
								<div className={style}>
									<ul className="text-xs ">
										{this.state.success ? (
											<li className="py-1"> {this.state.data} </li>
										) : (
											this.state?.error?.map((error, index) => {
												return (
													<li className="py-1" key={index}>
														{error?.msg}
													</li>
												);
											})
										)}
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default CrearUsuario;
