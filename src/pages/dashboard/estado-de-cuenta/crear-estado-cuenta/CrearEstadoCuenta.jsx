import React, { Component } from "react";
import Inputmask from "inputmask";
import axios from "axios";
import { config, headersAuth } from "../../../../config";
import AlertErrors from "../../../../component/AlertErrors";
import NumberFormat from "react-number-format";

class CrearEstadoCuenta extends Component {
	constructor(props) {
		super(props);
		this.state = {
			form: this.initialState,
			loading: false,
			success: false,
			error: [],
			data: "",
			formInvalid: true,
		};
	}

	initialState = {
		date: "",
		commission: "no",
		reference: "",
		cuenta_terceros: "no",
		sign: "+",
		monto_comision: "",
		mount: "",
	};

	deshabilitarSelect = true;

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
		const obj = Object.assign({}, this.state.form, {
			mount: this.convertirDecimal("mount"),
		});
		if (obj.cuenta_terceros === "no") {
			delete obj["monto_comision"];
		}

		this.setState({
			loading: true,
		});

		axios
			.post(`${config.url}/state-account`, obj, {
				headers: {
					...headersAuth(),
				},
			})
			.then((response) => {
				console.log(response);
				this.setState({
					form: this.initialState,
					loading: false,
					success: true,
					data: response.data?.data,
					error: [],
				});
			})
			.catch((error) => {
				console.log(error.response);
				this.setState({
					...this.state, //despues revisar
					loading: false,
					success: false,
					error: error.response?.data?.errores,
				});
			});
	};

	convertirDecimal = (nameMount) => {
		const mount = this.state.form[nameMount];
		const arrayMount = mount.split("");
		arrayMount.splice(mount.length - 2, 0, ".");
		const mountJoin = parseFloat(arrayMount.join(""));

		return mountJoin;
	};

	componentDidMount() {
		Inputmask("2029-99-99").mask(document.getElementsByName("date"));
		this.maskInputNumber("mount");
		this.maskInputNumber("monto_comision", "999,999,999.99");
	}

	maskInputNumber = (name, monto = "999,999,999,999.99") => {
		Inputmask(`Bs. ${monto} `, {
			numericInput: true,
			autoUnmask: true,
			rightAlign: false,
		}).mask(document.getElementsByName(name));
	};

	render() {
		let style = " text-white bg-opacity-80 rounded-lg text-left p-2 ";
		if (this.state?.error?.length < 1 && !this.state.success) {
			style += "hidden ";
		}
		this.state.success ? (style += " bg-green-500") : (style += " bg-red-500");

		return (
			<React.Fragment>
				<div className="my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4">
					<form
						className="w-full  bg-gray-100  p-3 rounded-lg shadow-lg col-auto md:col-span-2 lg:col-auto"
						onSubmit={this.handleInputSubmit}
					>
						<h3 className="capitalize text-lg font-semibold">
							Registrar transferencia
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
								value={this.state.form.date || ""}
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
								value={this.state.form.reference || ""}
								onChange={this.handleInputChange}
								autoComplete="off"
							/>
						</div>
						<div className="flex flex-wrap justify-between gap-2  flex-nowrap">
							<div className="flex flex-wrap w-6/12">
								<label
									className="w-full capitalize text-xs py-2 pl-1"
									htmlFor="sign"
								>
									Tipo de movimiento
								</label>
								<select
									name="sign"
									value={this.state.form.sign || ""}
									onChange={(e) => {
										if (e.target.value === "+") {
											this.deshabilitarSelect = true;
											this.setState({
												form: {
													...this.state.form,
													commission: "no",
													cuenta_terceros: "no",
													monto_comision: "",
												},
											});
										} else {
											this.deshabilitarSelect = false;
										}

										this.handleInputChange(e);
									}}
									className="rounded-lg shadow-md p-2 focus:outline-none w-full appearance-none max-w-full cursor-pointer"
								>
									<option value="+">Entrada</option>
									<option value="-">Salida</option>
								</select>
							</div>

							<div className="flex flex-wrap w-6/12">
								<label
									className="w-full capitalize text-xs py-2 pl-1"
									htmlFor="commission"
								>
									¿Es una comisión?
								</label>
								<select
									name="commission"
									value={this.state.form.commission || ""}
									disabled={this.deshabilitarSelect}
									onChange={this.handleInputChange}
									className="rounded-lg shadow-md p-2 focus:outline-none w-full appearance-none max-w-full cursor-pointer"
								>
									<option value="si">Si</option>
									<option value="no">No</option>
								</select>
							</div>
						</div>
						<div className="flex flex-wrap justify-between gap-2 flex-nowrap">
							<div className="flex flex-wrap w-6/12">
								<label
									className="w-full capitalize text-xs py-2 pl-1"
									htmlFor="cuenta_terceros"
								>
									Tipo de transferencias
								</label>
								<select
									name="cuenta_terceros"
									value={this.state.form.cuenta_terceros || ""}
									disabled={this.deshabilitarSelect}
									onChange={this.handleInputChange}
									className="rounded-lg shadow-md p-2 focus:outline-none w-full appearance-none max-w-full cursor-pointer"
								>
									<option value="si">Otros bancos</option>
									<option value="no">Mismo banco</option>
								</select>
							</div>
							<div className="flex flex-wrap  w-6/12">
								<label
									className="w-full capitalize text-xs py-2 pl-1"
									htmlFor="monto_comision"
								>
									Comisión:
								</label>
								<input
									type="text"
									className="rounded-lg shadow-md p-2 focus:outline-none w-full"
									placeholder="Monto de la comisión"
									disabled={
										this.state.form.cuenta_terceros === "no" ||
										this.deshabilitarSelect
											? true
											: false
									}
									name="monto_comision"
									value={this.state.form.monto_comision || ""}
									onChange={this.handleInputChange}
									autoComplete="off"
								/>
							</div>
						</div>

						<div className="flex flex-wrap">
							<label
								className="w-full capitalize text-xs py-2 pl-1"
								htmlFor="mount"
							>
								Monto de la transferencia:
							</label>
							<input
								type="text"
								className="rounded-lg shadow-md p-2 focus:outline-none w-full"
								placeholder="Monto transferencia"
								name="mount"
								value={this.state.form.mount || ""}
								onChange={this.handleInputChange}
							/>
						</div>

						<button
							type="submit"
							className="mt-4 w-full capitalize text-center bg-green-500 hover:bg-green-600 transition-all rounded-lg py-2 text-lg text-white focus:outline-none "
							// disabled={this.state.formInvalid}
						>
							{this.state.loading ? (
								<i className="fas fa-spinner animate-spin "></i>
							) : (
								"Registrar"
							)}
						</button>
					</form>
					<div className="w-full row-start-1  sm:row-start-auto">
						<div className="flex flex-wrap bg-gray-100  p-3 rounded-lg shadow-lg">
							<div className="w-full">
								<h3 className="capitalize text-lg font-semibold pb-2">
									Datos Transferencia
								</h3>
								<p className="text-sm pb-2">
									<span className="font-medium ">Fecha: </span>
									{this.state.form.date}
								</p>
								<p className="text-sm pb-2">
									<span className="font-medium ">Referencia: </span>
									{this.state.form.reference}
								</p>
								<p className="text-sm pb-2">
									<span className="font-medium ">Tipo de Movimiento: </span>
									{this.state.form.sign === "+" ? "Entrada" : "Salida"}
								</p>
								<p className="text-sm pb-2">
									<span className="font-medium ">¿Es una comisión?: </span>
									{this.state.form.commission}
								</p>
								<p className="text-sm pb-2">
									<span className="font-medium ">Monto : </span>

									<NumberFormat
										value={this.state.form.mount}
										displayType={"text"}
										thousandSeparator={true}
										prefix={"Bs. "}
										renderText={(textMount) => <span>{textMount}</span>}
									/>
								</p>
								<AlertErrors
									styleAlert={style}
									success={this.state.success}
									data={this.state.data}
									error={this.state.error}
								/>
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default CrearEstadoCuenta;
