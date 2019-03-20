import React from 'react';

import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {ContentBase} from 'src/views/generics';
import {ItemCreateEdit} from "src/components/items";
import {createItem, editItem, getItem, selectItemById} from "src/data/modules/items";
import {getCategories, selectCategoryList} from "../../data/modules/categories";

const setupStore = connect((store, {match}) => ({
	item: selectItemById(store)(match.params.id),
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
		// getItem: PropTypes.func.isRequired,
		match: PropTypes.object.isRequired,
	};

	componentWillMount() {
		const {match, getItem, categories, getCategories} = this.props;
		const id = match.params.id;
		if (!!id) getItem();
		if (!categories) getCategories();
	}

	handleSubmit = data => {
		const {item, createItem, editItem} = this.props;
		if (item)
			editItem({id: item.id, ...data});
		else
			createItem(data);
	};

	render() {
		const {item, categories} = this.props;
		const title = item ? `Edit ${item.name}` : "Create Item";
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
