import React from 'react';

import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {ContentBase} from 'src/views/generics';
import ItemCreateEdit from "../../components/items/CreateEdit";
import {createItem, editItem, getItem, selectItemById} from "../../data/modules/items";

const setupStore = connect((store, {match}) => ({
	item: selectItemById(store)(match.params.id),
}), (dispatch, {match}) => ({
	getItem: () => {
		// const filter = {item: match.params.id};
		dispatch(getItem(match.params.id));
		// dispatch(getUsersFiltered(filter));
	},
	createItem: data => dispatch(createItem(data)),
	editItem: data => dispatch(editItem(data)),
}));

@setupStore
class ItemCreateEditView extends React.PureComponent {
	static propTypes = {
		item: PropTypes.object,
		// getItem: PropTypes.func.isRequired,
		match: PropTypes.object.isRequired,
	};

	componentWillMount() {
		const {match, getItem} = this.props;
		const id = match.params.id;
		if (!!id) getItem();
	}

	handleSubmit = data => {
		const {item, createItem, editItem} = this.props;
		if (item)
			editItem({id: item.id, ...data});
		else
			createItem(data);
	};

	render() {
		const {item} = this.props;
		const title = item ? `Edit ${item.name}` : "Create Item";
		return (
			<ContentBase title={title}>
				<ItemCreateEdit item={item} handleSubmit={this.handleSubmit}/>
			</ContentBase>
		);
	}
}

export default ItemCreateEditView;
