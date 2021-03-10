import React from "react";

class Paginacion extends React.Component {
	modelPagina = (page) => {
		const { pasarPagina } = this.props;
		pasarPagina(page);
	};

	render() {
		const { page } = this.props;
		return (
			<div className="flex justify-center  my-4">
				<button
					type="button"
					className="capitalize text-center bg-gradient-to-b from-green-900 hover:to-green-500 to-green-600 transition-all rounded-full mx-1 h-10 w-10 text-xs sm:text-sm md:text-md text-white focus:outline-none"
					onClick={(event) => {
						event.preventDefault();
						return this.modelPagina(1);
					}}
					disabled={page < 0}
				>
					<i className="fas fa-angle-double-left"></i>
				</button>
				<button
					type="button"
					className="capitalize text-center bg-gradient-to-b from-green-900 hover:to-green-500 to-green-600 transition-all rounded-full mx-1 h-10 w-10 text-xs sm:text-sm md:text-md text-white focus:outline-none"
					onClick={(event) => {
						event.preventDefault();
						return this.modelPagina(page - 1);
					}}
					disabled={page < 0}
				>
					<i className="fas fa-angle-left"></i>
				</button>
				<button
					type="button"
					className="capitalize text-center bg-gradient-to-b from-green-900 hover:to-green-500 to-green-600 transition-all rounded-full mx-1  h-10 w-10 text-xs sm:text-sm md:text-md text-white focus:outline-none"
				>
					{page}
				</button>

				<button
					type="button"
					className="capitalize text-center bg-gradient-to-b from-green-900 hover:to-green-500 to-green-600 transition-all rounded-full mx-1 h-10 w-10 text-xs sm:text-sm md:text-md text-white focus:outline-none "
					onClick={(event) => {
						event.preventDefault();
						return this.modelPagina(page + 1);
					}}
					disabled={page >= this.props.totalPages}
				>
					<i className="fas fa-angle-left rotate-180 transform "></i>
				</button>
				<button
					type="button"
					className="capitalize text-center bg-gradient-to-b from-green-900 hover:to-green-500 to-green-600 transition-all rounded-full mx-1 h-10 w-10 text-xs sm:text-sm md:text-md text-white focus:outline-none "
					disabled={page >= this.props.totalPages}
					onClick={(event) => {
						event.preventDefault();
						return this.modelPagina(this.props.totalPages);
					}}
				>
					<i className="fas fa-angle-double-left rotate-180 transform "></i>
				</button>
			</div>
		);
	}
}

export default Paginacion;
