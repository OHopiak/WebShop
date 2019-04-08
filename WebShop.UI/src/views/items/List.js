import React from 'react';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import * as qs from 'query-string'

import {getItems, getUsers} from 'src/data/actions';
import {ContentBase} from 'src/views/generics';
import {ItemList} from 'src/components/items';
import {deleteItem, selectItemList} from "src/data/modules/items";

const setupStore = connect((store) => ({
	items: selectItemList(store),
}), (dispatch) => ({
	getItems: (filter) => dispatch(getItems(filter)),
	deleteItem: id => dispatch(deleteItem(id)),
	getUsers: () => dispatch(getUsers()),
}));

class ItemsListView extends React.PureComponent {
	static propTypes = {
		items: PropTypes.array,
		getItems: PropTypes.func.isRequired,
		deleteItem: PropTypes.func.isRequired,
		getUsers: PropTypes.func.isRequired,
	};

	componentWillMount() {
		const {items, getItems, history} = this.props;
		const {search} = qs.parse(history.location.search);
		const filter = search && {search};
		if (!items) getItems(filter);
	}

	render() {
		let {items, deleteItem, history} = this.props;
		const {search} = qs.parse(history.location.search);
		if (search && items) items = items.filter(i =>
			i.name.toLowerCase().includes(search.toLowerCase())
		);
		return (
			<ContentBase title={'Items'}>
				<ItemList items={items} deleteItem={deleteItem}/>
			</ContentBase>
		);
	}
}

export default setupStore(ItemsListView);
export {
	ItemsListView
};
