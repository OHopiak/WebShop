import React from 'react';

import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getItem} from 'src/data/actions';
import {selectItemById} from 'src/data/modules/items';
import {getUsersFiltered} from 'src/data/modules/users';
import {ContentBase} from 'src/views/generics';
import {ItemDetails} from 'src/components/items';

const setupStore = connect((store, {match}) => ({
	item: selectItemById(store)(match.params.id),
}), (dispatch, {match}) => ({
	getItem: () => {
		const filter = {item: match.params.id};
		dispatch(getItem(match.params.id));
		dispatch(getUsersFiltered(filter));
	},
}));

@setupStore
class ItemDetailsView extends React.PureComponent {
	static propTypes = {
		item: PropTypes.object,
		getItem: PropTypes.func.isRequired,
		match: PropTypes.object.isRequired,
	};

	componentWillMount() {
		this.props.getItem();
	}

	render() {
		const {item} = this.props;
		return item && (
			<ContentBase title={item.name}>
				<ItemDetails item={item}/>
			</ContentBase>
		) || <div>Loading...</div>;
	}
}

export default ItemDetailsView;
