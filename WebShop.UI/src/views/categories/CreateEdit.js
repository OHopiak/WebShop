import React from 'react';

import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {ContentBase} from 'src/views/generics';
import {CategoryCreateEdit} from 'src/components/categories';
import {createCategory, editCategory, getCategory, selectCategoryById} from '../../data/modules/categories';

const setupStore = connect((store, {match}) => ({
	category: selectCategoryById(store)(match.params.id),
}), (dispatch, {match}) => ({
	getCategory: () => {
		dispatch(getCategory(match.params.id));
	},
	createCategory: data => dispatch(createCategory(data)),
	editCategory: data => dispatch(editCategory(data)),
}));

@setupStore
class CategoriesCreateEditView extends React.PureComponent {
	static propTypes = {
		category: PropTypes.object,
		getCategory: PropTypes.func.isRequired,
		match: PropTypes.object.isRequired,
	};

	componentWillMount() {
		const {match, getCategory} = this.props;
		const id = match.params.id;
		if (id) getCategory();
	}

	handleSubmit = data => {
		const {category, createCategory, editCategory} = this.props;
		if (category)
			editCategory({id: category.id, ...data});
		else
			createCategory(data);
	};

	render() {
		const {category} = this.props;
		const title = category ? `Edit ${category.name}` : 'Create Category';
		return (
			<ContentBase title={title}>
				<CategoryCreateEdit category={category} handleSubmit={this.handleSubmit}/>
			</ContentBase>
		);
	}
}

export default CategoriesCreateEditView;
