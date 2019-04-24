import React from 'react';
import DocumentTitle from 'react-document-title';
import * as PropTypes from 'prop-types';
import {APP_TITLE} from '../../configs/configs.json';
import TopBar from './TopBar';

const HeaderContext = React.createContext({});

class WithHeader extends React.Component {
	static propTypes = {
		children: PropTypes.node.isRequired,
	};

	state = {
		title: APP_TITLE,
	};
	setTitle = title => this.setState(() => ({title}));

	render() {
		const {children} = this.props;
		const {title} = this.state;
		const value = {
			title,
			setTitle: this.setTitle,
		};
		return (
			<DocumentTitle title={title}>
				<>
					<TopBar title={title}/>
					<HeaderContext.Provider value={value} children={React.Children.only(children)}/>
				</>
			</DocumentTitle>
		);
	}
}

const withTitle = Component => props => (
	<HeaderContext.Consumer>
		{({title: oldTitle, setTitle}) =>
			<Component {...props} {...{oldTitle, setTitle}}/>
		}
	</HeaderContext.Consumer>
);

@withTitle
class HeaderTitle extends React.Component {
	static propTypes = {
		title: PropTypes.string,
		// oldTitle: PropTypes.string,
		// setTitle: PropTypes.func,
	};

	componentDidMount() {
		const {title, oldTitle, setTitle} = this.props;
		if (setTitle && !!title && oldTitle !== title)
			setTitle(title);
	}

	render() {
		const {children} = this.props;
		return children;
	}
}

export {
	WithHeader,
	HeaderTitle,
};
