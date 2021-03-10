import React from "react";

export default class AutocompleteInput extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			sugerencias: [],
			text: "",
		};
	}

	onTextChanged = (e) => {
		const value = e.target.value;
		const { items } = this.props;
		let suggestions = [];
		if (value.length > 0) {
			const regex = new RegExp(`^${value}`, "i");
			suggestions = items.sort().filter((v) => regex.test(v));
		}

		this.setState({
			sugerencias: suggestions,
			text: value,
		});
	};

	sugerenciaSeleccionada = (value) => {
		this.setState({
			text: value,
			sugerencias: [],
		});

		setTimeout(() => {
			this.props.BuscarReferencia(this.state.text);
		}, 50);
	};

	capturarDatos = (event) => {
		if (event.code === "Enter" || event.code === "NumpadEnter") {
			this.props.BuscarReferencia(this.state.text);
		}
	};

	render() {
		return (
			<div className="w-full border border-gray-200 shadow-md bg-white text-md text-gray-700 rounded-lg relative">
				<input
					type="text"
					onChange={this.onTextChanged}
					onKeyPress={this.capturarDatos}
					autoComplete="off"
					value={this.state.text}
					className=" p-2  border-0 focus:outline-none w-full rounded-lg"
				/>
				{this.state.sugerencias.length > 0 && (
					<ul
						className="text-left border-t border-gray-200 w-full absolute bg-white  top-9 shadow-lg rounded-b-lg"
						style={{
							maxHeight: "320px",
							overflow: "auto",
						}}
					>
						{this.state.sugerencias.map((item, index) => (
							<li
								className="p-2 cursor-pointer hover:underline hover:bg-gray-100"
								key={index}
								onClick={() => this.sugerenciaSeleccionada(item)}
							>
								{item}
							</li>
						))}
					</ul>
				)}
			</div>
		);
	}
}
