const toQueryParams = (obj) =>
	Object.keys(obj)
		.map(key => `${key}=${encodeURIComponent(obj[key])}`)
		.join('&');

export {
	toQueryParams
};
