import React, { Component } from "react";
import Inputmask from "inputmask";

class CrearEstadoCuenta extends Component {
	constructor(props) {
		super(props);
		this.state = {
			form: {
				date: "",
				commission: "",
				reference: "",
				cuenta_terceros: "",
				sign: "",
				monto_comision: "",
				mount: "",
			},
			loading: false,
		};
	}
	handleInputChange = (event) => {
		const target = event.target;

		this.setState({
			form: {
				...this.state.form,
				[target.name]: target.value,
			},
		});
	};

	handleInputSubmit = (event) => {
		event.preventDefault();
	};

	componentDidMount() {
		Inputmask("2029-99-99").mask(document.getElementsByName("date"));
	}

	render() {
		// let style = " text-white bg-opacity-80 rounded-lg text-left p-2 hidden";
		// if (this.state?.error?.length < 1 && !this.state.success) {
		// 	style += "hidden ";
		// }
		// this.state.success ? (style += " bg-green-500") : (style += " bg-red-500");

		return (
			<React.Fragment>
				<div className="my-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
					<form
						className="w-full  bg-gray-100  p-3 rounded-lg shadow-lg"
						onSubmit={this.handleInputSubmit}
					>
						<h3 className="capitalize text-lg font-semibold">
							Crear estado cuenta
						</h3>
						<div className="flex flex-wrap">
							<label
								className="w-full capitalize text-xs py-2 pl-1"
								htmlFor="date"
							>
								Fecha:
							</label>
							<input
								type="text"
								className="rounded-lg shadow-md p-2 focus:outline-none w-full"
								placeholder="AAAA/MM/DD"
								value={this.state.form.date}
								onChange={this.handleInputChange}
								name="date"
								autoComplete="off"
							/>
						</div>
						<div className="flex flex-wrap">
							<label
								className="w-full capitalize text-xs py-2 pl-1"
								htmlFor="reference"
							>
								referencia:
							</label>
							<input
								type="text"
								className="rounded-lg shadow-md p-2 focus:outline-none w-full"
								placeholder="referencia"
								name="reference"
								value={this.state.form.reference}
								onChange={this.handleInputChange}
								autoComplete="off"
							/>
						</div>
						<div className="flex flex-wrap">
							<label
								className="w-full capitalize text-xs py-2 pl-1"
								htmlFor="email"
							>
								Cuenta de terceros?:
							</label>
							<select
								name="cuenta_terceros"
								value={this.state.form.cuenta_terceros}
								onChange={this.handleInputChange}
								className="rounded-lg shadow-md p-2 focus:outline-none w-full appearance-none max-w-full cursor-pointer"
							>
								<option>Si</option>
								<option>No</option>
							</select>
						</div>
						<div className="flex flex-wrap">
							<label
								className="w-full capitalize text-xs py-2 pl-1"
								htmlFor="commission"
							>
								comisión:
							</label>
							<input
								type="text"
								className="rounded-lg shadow-md p-2 focus:outline-none w-full"
								placeholder="comision"
								name="commission"
								value={this.state.form.commission}
								onChange={this.handleInputChange}
								autoComplete="off"
							/>
						</div>
						<div className="flex flex-wrap">
							<label
								className="w-full capitalize text-xs py-2 pl-1"
								htmlFor="monto_comision"
							>
								monto comision:
							</label>
							<input
								type="text"
								className="rounded-lg shadow-md p-2 focus:outline-none w-full"
								placeholder="monto comision"
								name="monto_comision"
								value={this.state.form.monto_comision}
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
								"Guardar estado"
							)}
						</button>
					</form>
					{/* <div className="w-full row-start-1  sm:row-start-auto">
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
					</div> */}
				</div>
			</React.Fragment>
		);
	}
}

export default CrearEstadoCuenta;
