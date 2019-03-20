import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {deleteCategory, getCategories, selectCategoryList} from "src/data/modules/categories";
import {ListBase} from 'src/views/generics';
import {CategoryList} from 'src/components/categories';
import qs from "query-string";

const setupStore = connect((store) => ({
	categories: selectCategoryList(store),
}), (dispatch) => ({
	getCategories: () => dispatch(getCategories()),
	deleteCategory: id => dispatch(deleteCategory(id)),
}));

class CategoriesListView extends React.PureComponent {
	static propTypes = {
		categories: PropTypes.array,
		getCategories: PropTypes.func.isRequired,
		deleteCategory: PropTypes.func.isRequired,
	};

	componentWillMount() {
		const {categories, getCategories, history} = this.props;
		const {search} = qs.parse(history.location.search);
		const filter = search && {search};

		if (!categories)
			getCategories();
	}

	render() {
		let {categories, deleteCategory, history} = this.props;
		const {search} = qs.parse(history.location.search);
		if (search && categories) categories = categories.filter(i =>
			i.name.toLowerCase().includes(search.toLowerCase())
		);

		return (
			<ListBase title={'Categories'}>
				<CategoryList categories={categories} deleteCategory={deleteCategory}/>
			</ListBase>
		);
	}
}

export default setupStore(CategoriesListView);
export {
	CategoriesListView
};
