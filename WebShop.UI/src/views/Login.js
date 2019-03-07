import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {login, setToken} from 'src/data/actions';
import {cookies} from 'src/configs';
import Login from '../components/Login';

const setupStore = connect((store) => ({
	loggedIn: store.auth.loggedIn
}), (dispatch) => ({
	getToken: body => dispatch(login(body)),
	setToken: token => dispatch(setToken(token)),
}));


class LoginView extends React.PureComponent {
	/**
	 * Gets username and password from the form for which this event is triggered
	 * @param event form submitted
	 */
	state = {};

	onSubmit = (event) => {
		event.preventDefault();
		this.props.getToken(this.state);
	};

	componentWillMount() {
		const {loggedIn, setToken} = this.props;
		if (!loggedIn) {
			const token = cookies.get('TOKEN');
			if (token) setToken(token);
		}
	}

	handleInputChange = name => event => {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;

		this.setState(() => ({
			[name]: value
		}));
	};


	render() {
		const {loggedIn, location} = this.props;
		if (loggedIn) {
			const params = new URLSearchParams(location.search);
			let next = params.get('next');
			if (!next) next = '/';
			return <Redirect to={next}/>;
		} else return <Login onSubmit={this.onSubmit} onInputChange={this.handleInputChange}/>;
	}
}

export default setupStore(LoginView);
export {
	LoginView
};
