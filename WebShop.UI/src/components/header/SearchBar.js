import React from 'react';
import {withRouter} from 'react-router-dom';
import * as qs from 'query-string/index';
import {InputBase} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import {fade} from '@material-ui/core/styles/colorManipulator';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginRight: theme.spacing.unit * 2,
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing.unit * 3,
			width: 'auto',
		},
	},
	searchIcon: {
		width: theme.spacing.unit * 9,
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
		width: '100%',
	},
	inputInput: {
		paddingTop: theme.spacing.unit,
		paddingRight: theme.spacing.unit,
		paddingBottom: theme.spacing.unit,
		paddingLeft: theme.spacing.unit * 10,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: 200,
		},
	},
});

@withStyles(styles)
@withRouter
class SearchBar extends React.Component {
	state = {
		search: '',
	};

	handleChange = e => {
		const {value} = e.target;
		this.setState({search: value});
	};

	handleSubmit = () => {
		const {search} = this.state;
		const {history} = this.props;
		const {location} = history;
		location.search = search ? qs.stringify({search}) : '';
		history.push(location);
		this.setState({search: ''});
	};

	handleEnter = e => {
		if (e.key === 'Enter') this.handleSubmit();
	};

	render() {
		const {classes} = this.props;
		const {search} = this.state;
		return (
			<div className={classes.search}>
				<div className={classes.searchIcon}>
					<SearchIcon/>
				</div>
				<InputBase
					value={search}
					placeholder="Search…"
					onChange={this.handleChange}
					onKeyUp={this.handleEnter}
					classes={{
						root: classes.inputRoot,
						input: classes.inputInput,
					}}
				/>
			</div>
		);
	}
}

export default SearchBar;
