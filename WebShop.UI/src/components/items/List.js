import React from 'react';
import * as PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import {getUrl} from 'src/configs/routes';
import AddIcon from '@material-ui/icons/Add';
import {
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Fab,
	Grid,
	Typography
} from '@material-ui/core';
import {ShowOnAdminMode} from '../decorators/showOnLoginStatus';

const styles = theme => ({
	root: {
		padding: 10,
	},
	items: {
		overflow: 'auto',
		padding: 5,
	},
	item: {},
	media: {
		height: 140,
	},
	createButton: {
		position: 'fixed',
		bottom: theme.spacing.unit * 2,
		right: theme.spacing.unit * 2,
		zIndex: 1,
	},
	cardContent: {
		display: 'flex',
		paddingTop: theme.spacing.unit,
		'&:last-child': {
			paddingBottom: 0,
		}
	},
	name: {
		flex: 1,
	},
	price: {},
});

const ItemListItem = ({item, deleteItem, classes}) => {
	const {id, name, price} = item;
	return (
		<Grid item xs={12} sm={6} md={4} lg={3} className={classes.root}>
			<Card className={classes.item}>
				<CardActionArea>
					<Link to={getUrl('items.details', {id})}>
						<CardMedia
							className={classes.media}
							image="https://material-ui.com/static/images/cards/contemplative-reptile.jpg"
							title={name}
						/>
						<CardContent className={classes.cardContent}>
							<Typography gutterBottom variant="h6" component="h2" className={classes.name}>
								{name}
							</Typography>
							<Typography gutterBottom variant="h5" component="h2" className={classes.price}>
								{price.toFixed(2)}
							</Typography>
						</CardContent>
					</Link>
				</CardActionArea>
				<ShowOnAdminMode>
					<CardActions>
						<Link to={getUrl('items.edit', {id})}>
							<Button size="small" color="primary" variant="contained">
								Edit
							</Button>
						</Link>
						<Button size="small" color="secondary" variant="contained" onClick={deleteItem}>
							Delete
						</Button>
					</CardActions>
				</ShowOnAdminMode>
			</Card>
		</Grid>
	);
};

ItemListItem.propTypes = {
	item: PropTypes.object.isRequired,
	deleteItem: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
};

const ItemList = ({items, deleteItem, classes}) => (
	<div className={classes.items}>
		<ShowOnAdminMode>
			<Link to={getUrl('items.create')}>
				<Fab color="primary" aria-label="Add" className={classes.createButton}>
					<AddIcon/>
				</Fab>
			</Link>
		</ShowOnAdminMode>
		<Grid container>
			{items && items.map(item => (
				<ItemListItem
					key={item.id}
					item={item}
					classes={classes}
					deleteItem={() => deleteItem(item.id)}
				/>
			))}
		</Grid>
	</div>
);
ItemList.propTypes = {
	items: PropTypes.array,
	deleteItem: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(ItemList);
export {
	ItemList,
	ItemListItem,
};
