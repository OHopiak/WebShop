import React from 'react';
import Paper from '@material-ui/core/Paper/Paper';
import Grid from '@material-ui/core/Grid/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Debug from '../utils/Debug';
import {Item, Row} from '../utils/GridHelpers';

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

const Info = ({language, classes}) => (
	<Item sm={6}>
		<Paper className={classes.paper + ' ' + classes.info}>
			Language: {language}
		</Paper>
	</Item>
);

const Links = ({classes}) => (
	<Item sm={6}>
		<Paper className={classes.paper + ' ' + classes.links}>
			Links:
		</Paper>
	</Item>
);

const ItemDetails = ({item, classes}) => {
	const {author, language, versions, users} = item || {};
	return (
		<Grid container className={classes.root}>
			<Row>
				<Debug data={item} comment={'# For debugging purposes:'}/>
			</Row>
			{/*
			<Row>
				<Info language={language} classes={classes}/>
				<SplitColumn>
					<Author id={author} classes={classes}/>
					<VersionBlock versions={versions && versions.reverse()} classes={classes}/>
				</SplitColumn>
			</Row>
			<Row>
				<Links classes={classes}/>
				<Collaborators users={users} classes={classes}/>
			</Row>
*/}
		</Grid>
	);
};

export default withStyles(styles)(ItemDetails);
