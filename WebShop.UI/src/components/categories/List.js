import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import {getUrl} from 'src/configs/routes';
import AddIcon from '@material-ui/icons/Add';
import {Button, Card, CardActionArea, CardActions, CardContent, Fab, Grid, Typography} from '@material-ui/core';

const styles = theme => ({
	root: {
		padding: 10,
	},
	categories: {
		height: theme.vars.contentHeight,
		overflow: 'auto',
		padding: 5,
	},
	category: {
		// height: '100%',
	},
	media: {
		height: 140,
	},
	createButton: {
		position: 'absolute',
		bottom: theme.spacing.unit * 2,
		right: theme.spacing.unit * 2,
		zIndex: 1,
	},
	cardContent: {
		paddingTop: theme.spacing.unit,
		"&:last-child": {
			paddingBottom: 0,
		}
	},
});

const CategoryListCategory = ({category, deleteCategory, classes}) => {
	const {id, name} = category;
	return (
		<Grid item xs={12} sm={6} md={4} lg={3} className={classes.root}>
			<Card className={classes.category}>
				<CardActionArea>
					<Link to={getUrl('categories.details', {id})}>
						<CardContent className={classes.cardContent}>
							<Typography gutterBottom variant="h5" component="h2">
								{name}
							</Typography>
						</CardContent>
					</Link>
				</CardActionArea>
				<CardActions>
					<Link to={getUrl('categories.edit', {id})}>
						<Button size="small" color="primary" variant="contained">
							Edit
						</Button>
					</Link>
					<Button size="small" color="secondary" variant="contained" onClick={deleteCategory}>
						Delete
					</Button>
				</CardActions>
			</Card>
		</Grid>
	);
};
CategoryListCategory.propTypes = {
	category: PropTypes.object.isRequired,
	deleteCategory: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
};

const CategoryList = ({categories, deleteCategory, classes}) => (
	<div className={classes.categories}>
		<Link to={getUrl('categories.create')}>
			<Fab color="primary" aria-label="Add" className={classes.createButton}>
				<AddIcon/>
			</Fab>
		</Link>
		<Grid container>
			{categories && categories.map(category => (
				<CategoryListCategory
					key={category.id}
					category={category}
					classes={classes}
					deleteCategory={() => deleteCategory(category.id)}
				/>
			))}
		</Grid>
	</div>
);
CategoryList.propTypes = {
	categories: PropTypes.array,
	deleteCategory: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(CategoryList);
export {
	CategoryList,
	CategoryListCategory,
};
