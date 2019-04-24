const toQueryParams = (obj) =>
	Object.keys(obj)
		.map(key => `${key}=${encodeURIComponent(obj[key])}`)
		.join('&');

const normalize = target => target.reduce((map, obj) => {
	map[obj.id] = obj;
	return map;
}, {});


export {
	toQueryParams,
	normalize,
};
