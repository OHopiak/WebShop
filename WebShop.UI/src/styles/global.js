import withStyles from '@material-ui/core/es/styles/withStyles';

const globalStyles = {
	'@global': {
		'*': {
			margin: 0,
		},
		html: {
			height: '100%',
		},
		body: {
			height: '100%',
		},
		'#app': {
			height: '100%',
			// display: 'flex',
		},
		a: {
			'&, &:hover, &:visited, &:active': {
				textDecoration: 'none',
				color: 'inherit',
			},
		},
	}
};

const GlobalStyles = withStyles(globalStyles)(() => '');

export default GlobalStyles;
