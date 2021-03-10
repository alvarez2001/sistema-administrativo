const config = {
	url: "https://sistema-administrativo.herokuapp.com/api",
};

const headersAuth = () => ({
	"user-token": tokenSessionStorage(),
});

const tokenSessionStorage = () => {
	const token = sessionStorage.getItem("user-token");
	return token;
};

module.exports = {
	config,
	headersAuth,
};
