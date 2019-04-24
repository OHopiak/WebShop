import React from 'react';

import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {ContentBase} from '../../views/generics';
import {ItemCreateEdit} from '../../components/items';
import {createItem, editItem, getItem, selectItemById} from '../../data/modules/items';
import {getCategories, selectCategoryList} from '../../data/modules/categories';
import {getUrl} from '../../configs/routes';

const setupStore = connect((store, {match}) => ({
	item: selectItemById(store)(+match.params.id),
	categories: selectCategoryList(store),
}), (dispatch, {match}) => ({
	getItem: () => {
		// const filter = {item: match.params.id};
		dispatch(getItem(match.params.id));
		// dispatch(getUsersFiltered(filter));
	},
	createItem: data => dispatch(createItem(data)),
	editItem: data => dispatch(editItem(data)),
	getCategories: () => dispatch(getCategories()),
}));

@setupStore
class ItemCreateEditView extends React.PureComponent {
	static propTypes = {
		item: PropTypes.object,
		match: PropTypes.object.isRequired,
		getItem: PropTypes.func.isRequired,
		createItem: PropTypes.func.isRequired,
		editItem: PropTypes.func.isRequired,
		getCategories: PropTypes.func.isRequired,
		history: PropTypes.object.isRequired,
	};

	componentWillMount() {
		const {match, getItem, categories, getCategories} = this.props;
		const id = match.params.id;
		if (id) getItem();
		if (!categories) getCategories();
	}

	handleSubmit = data => {
		const {item, createItem, editItem, history} = this.props;
		if (item)
			editItem({id: item.id, ...data});
		else
			createItem(data);

		const {location} = history;
		location.pathname = getUrl('items');
		history.push(location);
	};

	render() {
		const {item, categories} = this.props;
		const title = item ? `Edit ${item.name}` : 'Create Item';
		return (
			<ContentBase title={title}>
				<ItemCreateEdit item={item}
								handleSubmit={this.handleSubmit}
								categories={categories}/>
			</ContentBase>
		);
	}
}

export default ItemCreateEditView;
