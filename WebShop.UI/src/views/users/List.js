import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {getUsers} from 'src/data/actions';
import UsersList from 'src/components/users/List';
import ContentBase from '../generics/ContentBase';

const setupStore = connect((store) => ({
	users: store.users.list,
}), (dispatch) => ({
	getUsers: () => dispatch(getUsers()),
}));

class UsersListView extends React.PureComponent {
	static propTypes = {
		users: PropTypes.array,
		getUsers: PropTypes.func.isRequired,
	};

	componentWillMount() {
		const {users, getUsers} = this.props;
		if (!users) {
			getUsers();
		}
	}

	render() {
		return (
			<ContentBase title={'Users'}>
				<UsersList users={this.props.users}/>
			</ContentBase>
		);
	}
}

export default setupStore(UsersListView);
export {
	UsersListView
};
