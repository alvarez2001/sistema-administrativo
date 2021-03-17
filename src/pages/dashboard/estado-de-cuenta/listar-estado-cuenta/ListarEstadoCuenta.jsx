import axios from "axios";
import React from "react";
import NumberFormat from "react-number-format";
import AutocompleteInput from "../../../../component/AutoCompleteInput";
import Paginacion from "../../../../component/Paginacion";
import { config, headersAuth } from "../../../../config";
import "./estilosEstadoCuenta.css";

class ListarEstadoCuenta extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
	}

	initialState = {
		data: [],
		total: 1,
		totalPages: 1,
		page: 1,
		success: false,
		loading: false,
		formBusqueda: {
			mes: "0",
			ano: "2021",
		},
		references: [],
		error: [],
	};

	componentDidMount() {
		this.cargarInfo();
		this.cargarReferencias();
	}

	handleInputChange = (event) => {
		const target = event.target;

		this.setState({
			formBusqueda: {
				...this.state.formBusqueda,
				[target.name]: target.value,
			},
		});

		setTimeout(() => {
			this.cargarInfo();
		}, 50);
	};

	pasarPaginacion = (page) => {
		this.cargarInfo(page);
	};

	cargarInfo = async (query = 0) => {
		try {
			const { ano, mes } = this.state.formBusqueda;
			const response = await axios.get(
				`${config.url}/state-account/paginacion/${ano}/${mes}?page=${query}&limit=10`,
				{
					headers: headersAuth(),
				},
			);
			const { data, total, totalPages, page } = response.data.data;

			this.setState({
				data: data,
				total: total,
				totalPages: totalPages,
				page: page,
			});
		} catch (error) {
			console.log(error.response);
		}
	};

	descargarExcel = () => {
		const token = headersAuth()["user-token"];
		window.open(
			`${config.url}/state-account/excel/${this.state.formBusqueda.ano}/${this.state.formBusqueda.mes}?user-token=${token}`,
		);
	};

	eliminarTransferencia = (value) => {
		if (window.confirm("Desea eliminar la referencia " + value + " ?")) {
			axios
				.delete(`${config.url}/state-account/${value}`, {
					headers: headersAuth(),
				})
				.then((value) => {
					this.cargarInfo(this.state.page);
				})
				.catch((error) => {
					window.alert("Ha ocurrido un error al eliminar la transferencia");
				});
		}
	};

	cargarReferencias = async () => {
		try {
			const response = await axios.get(
				`${config.url}/state-account/reference/all`,
				{
					headers: headersAuth(),
				},
			);

			const data = response.data.data;
			const references = data.map((value) => value.reference);

			this.setState({
				references,
			});
		} catch (error) {
			console.log(error.response);
		}
	};

	BuscarReferencia = (event) => {

		
		axios
			.get(`${config.url}/state-account/${event}`, { headers: headersAuth() })
			.then((response) => {
				console.log(response.data.data)
				const  { verified, id } = response.data.data
				
				verified === "si"
					? this.redirigirVisualizar(id)
					: this.redirigirVerificar(id);
					
			});
	};
	redirigirVerificar = (event) => {
		this.props.history.push(`/dashboard/estado/verificar/${event}`);
	};
	redirigirVisualizar = (event) => {
		this.props.history.push(`/dashboard/estado/visualizar/${event}`);
	};

	render() {
		const trTable =
			"hover:bg-gray-200 transition-all  duration-300 ease border-b-2 border-gray-300 hover:border-gray-400";
		return (
			<React.Fragment>
				<div className="my-6 grid grid-cols-1 ">
					<div className="w-full  bg-gray-100  p-3 rounded-lg shadow-lg ">
						<div className="flex">
							<h2 className="capitalize text-lg font-semibold w-7/12">
								Listar Transferencias
							</h2>
							<div className="w-5/12 text-right">
								<select
									value={this.state.formBusqueda.mes}
									name="mes"
									onChange={this.handleInputChange}
									className="text-center bg-transparent border-0 focus:outline-none appearance-none cursor-pointer"
								>
									<option value={0}>Enero</option>
									<option value={1}>Febrero</option>
									<option value={2}>Marzo</option>
									<option value={3}>Abril</option>
									<option value={4}>Mayo</option>
									<option value={5}>Junio</option>
									<option value={6}>Julio</option>
									<option value={7}>Agosto</option>
									<option value={8}>Septiembre</option>
									<option value={9}>Octubre</option>
									<option value={10}>Noviembre</option>
									<option value={11}>Diciembre</option>
								</select>
								<select
									value={this.state.formBusqueda.ano}
									onChange={this.handleInputChange}
									name="ano"
									className="text-center bg-transparent border-0 focus:outline-none appearance-none cursor-pointer"
								>
									<option value="2020">2020</option>
									<option value="2021">2021</option>
									<option value="2022">2022</option>
								</select>
							</div>
						</div>

						<div className="w-full my-4">
							<div>
								<AutocompleteInput
									items={this.state.references}
									BuscarReferencia={this.BuscarReferencia}
								/>
							</div>
							<div className="text-right mt-4 w-full">
								<button
									type="button"
									onClick={() => {
										this.descargarExcel();
									}}
									className=" capitalize text-center bg-green-400 hover:bg-green-500 transition-all rounded mx-1 px-3  p-2 text-md text-white focus:outline-none"
								>
									<i className="fas fa-file-excel"></i>
								</button>
							</div>
						</div>

						<div className="w-full  overflow-auto tablaPropia">
							<table className="w-full border-collapse text-center table-auto rounded-lg  ">
								<thead>
									<tr className="text-md font-semibold border-b border-gray-300">
										<th
											style={{
												minWidth: "150px",
											}}
											className=" p-2 "
										>
											Fecha
										</th>
										<th
											style={{
												minWidth: "150px",
											}}
											className=" p-2 "
										>
											Referencia
										</th>
										<th
											style={{
												minWidth: "150px",
											}}
											className=" p-2 "
										>
											Monto
										</th>
										<th
											style={{
												minWidth: "100px",
											}}
											className=" p-2 "
										>
											Movimiento
										</th>
										<th
											style={{
												minWidth: "100px",
											}}
											className=" p-2 "
										>
											Comisión
										</th>
										<th
											style={{
												minWidth: "200px",
											}}
											className=" p-2 "
										>
											Acciones
										</th>
									</tr>
								</thead>
								<tbody className="text-xs sm:text-sm md:text-md">
									{this.state.data.map((value) => (
										<tr
											key={value.id}
											id={value.id + "-attrId"}
											className={
												value.verified === "no"
													? trTable
													: trTable + " bg-gray-200"
											}
										>
											<td data-titulo="fecha" className="p-2">
												{value.date}
											</td>
											<td data-titulo="referencia" className="p-2">
												{value.reference}
											</td>
											<NumberFormat
												value={value.mount}
												displayType={"text"}
												thousandSeparator={true}
												prefix={"Bs. "}
												renderText={(textMount) => (
													<td data-titulo="monto" className="p-2">
														{textMount}
													</td>
												)}
											/>

											<td data-titulo="movimiento" className="p-2">
												{value.sign === "+" ? "Entrada" : "Salida"}
											</td>
											<td data-titulo="comision" className="p-2">
												{value.commission}
											</td>
											<td className="p-2 acciones">
												<button
													type="button"
													className=" capitalize text-center bg-red-400 hover:bg-red-500 transition-all rounded mx-1 px-3  p-2 text-md text-white focus:outline-none"
													onClick={() => {
														this.eliminarTransferencia(value.reference);
													}}
												>
													<i className="fas fa-trash"></i>
												</button>
												<button
													type="button"
													className=" capitalize text-center bg-blue-400 hover:bg-blue-500 transition-all rounded mx-1 px-3  p-2 text-md text-white focus:outline-none"
												>
													<i className="fas fa-pen"></i>
												</button>
												<button
													type="button"
													className=" capitalize text-center bg-green-400 hover:bg-green-500 transition-all rounded mx-1 px-3  p-2 text-md text-white focus:outline-none"
													onClick={() => {
														if (value.verified === "no") {
															this.redirigirVerificar(value.reference);
														}
														if (value.verified === "si") {
															this.redirigirVisualizar(value.id);
														}
													}}
												>
													{value.verified === "no" ? (
														<i className="fas fa-check"></i>
													) : (
														<i className="fas fa-search"></i>
													)}
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						<Paginacion
							page={this.state.page}
							pasarPagina={this.cargarInfo}
							totalPages={this.state.totalPages}
						/>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default ListarEstadoCuenta;
