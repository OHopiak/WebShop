import React from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Debug from '../utils/Debug';
import {Row} from '../utils/GridHelpers';

const styles = theme => ({
	root: {
		backgroundColor: '#f2f5f7',
		padding: '5px',
	},
	paper: {
		padding: theme.spacing.unit * 2,
		textAlign: 'center',
		color: theme.palette.text.secondary,
		margin: theme.spacing.unit / 2 + 1
	},
	info: {
		height: '410px',
		textAlign: 'left',
	},
	author: {
		height: '100px',
	},
	versions: {
		textAlign: 'left',
		height: '300px',
	},
	collaborators: {
		height: '300px',
	},
	links: {
		height: '300px',
	},
});

const CategoryDetails = ({category, classes}) => {
	return (
		<Grid container className={classes.root}>
			<Row>
				<Debug data={category} comment={'# For debugging purposes:'}/>
			</Row>
		</Grid>
	);
};

export default withStyles(styles)(CategoryDetails);
