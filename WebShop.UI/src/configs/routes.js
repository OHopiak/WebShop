import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import CodeIcon from '@material-ui/icons/Code';
import MessageIcon from '@material-ui/icons/Message';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import FaceIcon from '@material-ui/icons/Face';
import {Footer, Header, Home, Login, Logout, Messages, NotFound} from 'src/components';
import {ItemsCreateEditView, ItemsDetailsView, ItemsListView} from 'src/views/items';
import UsersListView from 'src/views/users/List';

const routes = {
	urls: {
		home: {
			exact: true,
			path: '/',
			name: 'Home',
			component: Home,
			icon: <HomeIcon/>,
		},
		items: {
			path: '/items',
			name: 'Items',
			exact: true,
			component: ItemsListView,
			icon: <CodeIcon/>,
			routes: {
				create: {
					path: '/create',
					name: 'Create Item',
					exact: true,
					enableCustomUrls: true,
					component: ItemsCreateEditView,
				},
				edit: {
					path: '/:id/edit',
					name: 'Edit Item',
					exact: true,
					enableCustomUrls: true,
					component: ItemsCreateEditView,
				},
				details: {
					path: '/:id',
					name: 'Item Details',
					exact: true,
					enableCustomUrls: true,
					component: ItemsDetailsView,
				},
			}
		},
		users: {
			path: '/users',
			name: 'Users',
			exact: true,
			component: UsersListView,
			icon: <FaceIcon/>,
		},
		messages: {
			path: '/messages',
			name: 'Messages',
			component: Messages,
			icon: <MessageIcon/>,
			modifiers: ['loginRequired'],
		},
		logout: {
			path: '/logout',
			name: 'Logout',
			component: Logout,
			icon: <LogoutIcon/>,
			modifiers: ['showOnLoggedIn'],
		}
	},
	Login: Login,
	Header: Header,
	Footer: Footer,
	NotFound: NotFound,
};

/**
 * Gets the url using name of the route
 * @param name route name, pattern: (namespace\.)*route
 * @param keys parameters for the url
 * @returns {string} URL or the route with the current name <br/>
 * by default returns ''<br/>
 * on error returns '' or url of valid namespace
 */
const getUrl = (name = '', keys = {}) => {
	name = `${name}`;
	const names = name.split('.');
	let url = '';
	let searchPath = routes.urls;
	let route = null;
	let fail = false;
	names.forEach(name => {
		if (fail) return;
		route = searchPath[name];
		if (!route) {
			fail = true;
		} else {
			url += route.path;
			searchPath = route.routes;
		}
	});
	const vars = url.match(/:\w+/g);
	if (vars) vars.forEach(match => {
		const input = keys[match.substr(1)];
		if (input) url = url.replace(match, input);
	});

	return url;
};

export default routes;
export {
	getUrl
};
