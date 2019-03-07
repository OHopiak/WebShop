import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
	footer: {
		display: 'none',
		textAlign: 'right',
		fontSize: '12px',
		paddingRight: '10px',
		[theme.breakpoints.up('sm')]: {
			position: 'absolute',
			bottom: 0,
			left: theme.vars.headerWidth,
			width: theme.vars.bodyWidth,
			clear: 'both',
		},
	},
	credits: {},
});

const Footer = ({name, classes}) => (
	<div className={classes.footer}>
		<p className={classes.credits}>© {name}</p>
	</div>
);

export default withStyles(styles)(Footer);
export {
	Footer
};
