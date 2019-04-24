// Reducer
const prefix = 'ERRORS:';

const ADD = prefix + 'ADD';
const RESOLVE = prefix + 'RESOLVE';

const startState = {
	counter: 0,
	list: [],
};

const reducer = (state = startState, action) => {
	switch (action.type) {
		case ADD:
			return {
				...state,
				counter: state.counter + 1,
				list: [
					...state.list,
					{
						...action.payload,
						resolved: false,
						id: state.counter,
					}
				],
			};
		case RESOLVE: {
			const id = action.payload.id;
			return {
				...state,
				list: state.list.map(err =>
					err.id === id
						? {...err, resolved: true}
						: err
				),
			};
		}
		default:
			return state;
	}
};

// Actions
const addError = (error) => ({
	type: ADD,
	payload: error,
});

const resolveError = (id) => ({
	type: RESOLVE,
	payload: {id},
});


// Selectors


// Exports
export default reducer;
export {
	addError,
	resolveError,
};
