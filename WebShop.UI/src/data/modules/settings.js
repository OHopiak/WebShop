// Reducer
const prefix = 'SETTINGS:';

const UPDATE = prefix + 'UPDATE';

const startState = {
	adminMode: false,
};

const reducer = (state = startState, action) => {
	if (action.type === UPDATE) {
		return {
			...state,
			...action.payload,
		};
	} else {
		return state;
	}
};

// Actions
const updateSettings = (settings) => ({
	type: UPDATE,
	payload: settings,
});

// Selectors
const selectAdminMode = store => store.settings.adminMode;

// Exports
export default reducer;
export {
	updateSettings,

	selectAdminMode,
};
