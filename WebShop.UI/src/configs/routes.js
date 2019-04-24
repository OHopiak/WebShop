import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import AppsIcon from '@material-ui/icons/Apps';
import MessageIcon from '@material-ui/icons/Message';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import FaceIcon from '@material-ui/icons/Face';
import {Footer, Home, Login, Logout, Messages, NotFound} from 'src/components';
import {ItemsCreateEditView, ItemsDetailsView, ItemsListView} from 'src/views/items';
import UsersListView from 'src/views/users/List';
import {CategoriesCreateEditView, CategoriesDetailsView, CategoriesListView} from '../views/categories';

const routes = {
	urls: {
		home: {
			exact: true,
			path: '/',
			name: 'Home',
			component: Home,
			icon: HomeIcon,
		},
		items: {
			path: '/items',
			name: 'Items',
			exact: true,
			component: ItemsListView,
			icon: AppsIcon,
// icon: ShoppingCartIcon,
			routes: {
				create: {
					path: '/create',
					name: 'Create Item',
					exact: true,
					enableCustomUrls: true,
					component: ItemsCreateEditView,
					modifiers: ['loginRequired'],
				},
				edit: {
					path: '/:id/edit',
					name: 'Edit Item',
					exact: true,
					enableCustomUrls: true,
					component: ItemsCreateEditView,
					modifiers: ['loginRequired'],
				},
				details: {
					path: '/:id',
					name: 'Item Details',
					exact: true,
					enableCustomUrls: true,
					component: ItemsDetailsView,
				},
			},
			modifiers: ['loginRequired'], //TODO: remove
		},
		categories: {
			path: '/categories',
			name: 'Categories',
			exact: true,
			component: CategoriesListView,
			routes: {
				create: {
					path: '/create',
					name: 'Create Category',
					exact: true,
					enableCustomUrls: true,
					component: CategoriesCreateEditView,
				},
				edit: {
					path: '/:id/edit',
					name: 'Edit Category',
					exact: true,
					enableCustomUrls: true,
					component: CategoriesCreateEditView,
				},
				details: {
					path: '/:id',
					name: 'Category Details',
					exact: true,
					enableCustomUrls: true,
					component: CategoriesDetailsView,
				},
			},
			modifiers: ['hideTopMenu'],
		},
		users: {
			path: '/users',
			name: 'Users',
			exact: true,
			component: UsersListView,
			icon: FaceIcon,
		},
		messages: {
			path: '/messages',
			name: 'Messages',
			component: Messages,
			icon: MessageIcon,
			modifiers: ['loginRequired'],
		},
		logout: {
			path: '/logout',
			name: 'Logout',
			component: Logout,
			icon: LogoutIcon,
			modifiers: ['showOnLoggedIn'],
		}
	},
	Login: Login,
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
