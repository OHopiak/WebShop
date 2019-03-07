import {apiEndpoint} from './api';

// Reducer
const {reducer, actions} = apiEndpoint('DEPLOY', '/deploy');

// Actions
const getDeployments = actions.getAll;
const getDeploymentsFiltered = actions.getFiltered;
const getDeployment = actions.getById;

// Selectors
const selectDeploymentsSet = (state) => state.deploy.set;
const selectDeploymentsList = (state) => state.deploy.list;
const selectDeploymentById = (state, id) => state.deploy.set[id];

// Exports
export default reducer;
export {
	getDeployments,
	getDeploymentsFiltered,
	getDeployment,

	selectDeploymentsSet,
	selectDeploymentsList,
	selectDeploymentById,
};
