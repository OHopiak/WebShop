import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {ContentBase} from 'src/views/generics';
import {getCategory, selectCategoryById} from 'src/data/modules/categories';
import {CategoryDetails} from 'src/components/categories';

const setupStore = connect((store, {match}) => ({
	category: selectCategoryById(store)(match.params.id),
}), (dispatch, {match}) => ({
	getCategory: () => {
		dispatch(getCategory(match.params.id));
	},
}));

@setupStore
class CategoriesDetailsView extends React.PureComponent {
	static propTypes = {
		category: PropTypes.object,
		getCategory: PropTypes.func.isRequired,
		match: PropTypes.object.isRequired,
	};

	componentWillMount() {
		this.props.getCategory();
	}

	render() {
		const {category} = this.props;
		return category && (
			<ContentBase title={category.name}>
				<CategoryDetails category={category}/>
			</ContentBase>
		) || <div>Loading...</div>;
	}
}

export default CategoriesDetailsView;
