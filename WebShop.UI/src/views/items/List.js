import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {getItems, getUsers} from 'src/data/actions';
import {ListBase, listTypes} from 'src/views/generics';
import {ItemList} from 'src/components/items';
import {selectItemList} from "src/data/modules/items";

const setupStore = connect((store) => ({
	items: selectItemList(store),
}), (dispatch) => ({
	getItems: () => dispatch(getItems()),
	getUsers: () => dispatch(getUsers()),
}));

class ItemsListView extends React.PureComponent {
	static propTypes = {
		items: PropTypes.array,
	};

	state = {
		listType: 'tile'
	};

	switchListType = () => {
		this.setState({
			listType: listTypes[this.state.listType]
		});
	};

	componentWillMount() {
		if (!this.props.items)
			this.props.getItems();
	}

	render() {
		return (
			<ListBase title={'Items'}
					  switchType={this.switchListType}
					  listType={this.state.listType}>
				<ItemList
					listType={this.state.listType}
					items={this.props.items}
				/>
			</ListBase>
		);
	}
}

export default setupStore(ItemsListView);
export {
	ItemsListView
};
