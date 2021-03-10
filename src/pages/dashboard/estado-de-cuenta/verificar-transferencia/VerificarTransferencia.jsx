import axios from "axios";
import React from "react";
import { config, headersAuth } from "../../../../config";
import Inputmask from "inputmask";
import NumberFormat from "react-number-format";
import AlertErrors from "../../../../component/AlertErrors";

export default class VerificarTransferencia extends React.Component {
	constructor(props) {
		super(props);

		this.state = this.InitialState;
	}

	InitialState = {
		transferencia: {
			date: "",
			reference: "",
			sign: "",
			commission: "",
			mount: "",
			id: "",
			verified: "",
			modificable: {
				accountOrigin: "Josue Alvarez",
				concept: "",
				destinatario: "",
			},
		},
		loading: false,
		error: [],
		success: false,
		data: "",
	};

	handleInputChangeModificable = (event) => {
		const target = event.target;

		this.setState({
			transferencia: {
				...this.state.transferencia,
				modificable: {
					...this.state.transferencia.modificable,
					[target.name]: target.value,
				},
			},
		});
	};

	handleInputSubmit = (event) => {
		event.preventDefault();
		const datos = Object.assign({}, this.state.transferencia.modificable, {
			reference_id: this.state.transferencia.id,
		});

		this.setState({
			...this.state,
			loading: true,
		});

		axios
			.post(`${config.url}/details`, datos, {
				headers: headersAuth(),
			})
			.then((response) => {
				console.log(response);
				this.setState({
					...this.state,
					loading: false,
					success: true,
					error: [],
				});

				this.props.history.push("/dashboard/estado/listar");
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

	async componentDidMount() {
		this.maskInputNumber("mount");
		await this.obtenerInfo();
	}

	maskInputNumber = (name, monto = "999,999,999,999.99") => {
		Inputmask(`Bs. ${monto} `, {
			numericInput: true,
			autoUnmask: true,
			rightAlign: false,
		}).mask(document.getElementsByName(name));
	};

	obtenerInfo = async () => {
		const { referencia } = this.props.match.params;

		try {
			const { data } = await axios.get(
				`${config.url}/state-account/${referencia}`,
				{
					headers: headersAuth(),
				},
			);

			this.setState({
				transferencia: {
					...this.state.transferencia,
					date: data.data.date,
					reference: data.data.reference,
					sign: data.data.sign,
					commission: data.data.commission,
					mount: data.data.mount,
					id: data.data.id,
					verified: data.data.verified,
				},
			});
		} catch (error) {
			console.log(error.response);
		}
	};

	render() {
		const {
			accountOrigin,
			concept,
			destinatario,
		} = this.state.transferencia.modificable;

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
						<h3 className="capitalize text-lg font-semibold">
							Verificar Transferencia
						</h3>
						<div className="flex flex-wrap">
							<label
								className="w-full capitalize text-xs py-2 pl-1"
								htmlFor="date"
							>
								Responsable de la salida:
							</label>
							<select
								name="accountOrigin"
								value={accountOrigin || ""}
								onChange={this.handleInputChangeModificable}
								className="rounded-lg shadow-md p-2 focus:outline-none w-full appearance-none max-w-full cursor-pointer"
							>
								<option value="Josue Alvarez">Josue Alvarez</option>
								<option value="Franjer Fernandez">Franjer Fernandez</option>
								<option value="Alejandra Villarroel">
									Alejandra Villarroel
								</option>
							</select>
						</div>
						<div className="flex flex-wrap">
							<label
								className="w-full capitalize text-xs py-2 pl-1"
								htmlFor="destinatario"
							>
								Destinatario:
							</label>
							<input
								type="text"
								className="rounded-lg shadow-md  bg-white p-2 focus:outline-none w-full"
								placeholder="Destinatario"
								name="destinatario"
								value={destinatario || ""}
								autoComplete="off"
								onChange={this.handleInputChangeModificable}
							/>
						</div>
						<div className="flex flex-wrap">
							<label
								className="w-full capitalize text-xs py-2 pl-1"
								htmlFor="concept"
							>
								Concepto:
							</label>
							<textarea
								type="text"
								className="rounded-lg shadow-md  bg-white p-2 focus:outline-none w-full h-36 resize-none"
								placeholder="Concepto"
								name="concept"
								value={concept || ""}
								onChange={this.handleInputChangeModificable}
								autoComplete="off"
							></textarea>
						</div>

						<button
							type="submit"
							className="mt-4 w-full capitalize text-center bg-green-500 hover:bg-green-600 transition-all rounded-lg py-2 text-lg text-white focus:outline-none "
						>
							{this.state.loading ? (
								<i className="fas fa-spinner animate-spin "></i>
							) : (
								"Verificar Transferencia"
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
									{this.state.transferencia.date}
								</p>
								<p className="text-sm pb-2">
									<span className="font-medium ">Referencia: </span>
									{this.state.transferencia.reference}
								</p>
								<p className="text-sm pb-2">
									<span className="font-medium ">Tipo de movimiento: </span>
									{this.state.transferencia.sign === "+" ? "Entrada" : "Salida"}
								</p>
								<p className="text-sm pb-2">
									<span className="font-medium ">¿Es una comisión?: </span>
									{this.state.transferencia.commission}
								</p>
								<p className="text-sm pb-2">
									<span className="font-medium ">Monto: </span>
									<NumberFormat
										value={this.state.transferencia.mount}
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
