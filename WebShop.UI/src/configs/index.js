import {apiUrls} from './urls';
import {Cookies} from 'react-cookie';
import routes from './routes';

let cookies = new Cookies();

export {
	routes,
	apiUrls,
	cookies,
};
