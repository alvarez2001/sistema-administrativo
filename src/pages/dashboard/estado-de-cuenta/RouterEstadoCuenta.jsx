import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import CrearEstadoCuenta from "./crear-estado-cuenta/CrearEstadoCuenta";
import ListarEstadoCuenta from "./listar-estado-cuenta/ListarEstadoCuenta";
import VerEstadoCuenta from "./ver-estado-cuenta/VerEstadoCuenta";
import VerificarTransferencia from "./verificar-transferencia/VerificarTransferencia";

class RouterEstadoCuenta extends Component {
	render() {
		const path = this.props.estado.match.url;
		const basename = this.props.basename;

		return (
			<Switch>
				<Route
					path={`${path}${basename}/crear`}
					exact
					component={CrearEstadoCuenta}
				/>

				<Route
					path={`${path}${basename}/listar`}
					exact
					component={ListarEstadoCuenta}
				/>
				<Route
					path={`${path}${basename}/verificar/:referencia`}
					exact
					component={VerificarTransferencia}
				/>

				<Route
					path={`${path}${basename}/visualizar/:referencia`}
					exact
					component={VerEstadoCuenta}
				/>
			</Switch>
		);
	}
}

export default RouterEstadoCuenta;
