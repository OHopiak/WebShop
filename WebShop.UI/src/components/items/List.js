import React from 'react';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import {getUrl} from '../../configs/routes';
import Typography from '@material-ui/core/Typography/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

const styles = theme => ({
	items: {
		height: theme.vars.contentHeight,
		overflow: 'auto',
		padding: 5,
	},
	media: {
		height: 140,
	},
});

const ItemListItem = ({itemType, className, item, classes}) => {
	const {id, name, description, created, updated} = item;
	return (
		<Grid item xs={12} sm={6} md={4} lg={3} className={classes.itemBox}>
			<Card className={classes.item}>
				<Link to={getUrl('items.details', {id})}>
					<CardActionArea>
						<CardMedia
							className={classes.media}
							// image=""
							title={name}
						/>
						<CardContent>
							<Typography gutterBottom variant="h5" component="h2">
								{name}
							</Typography>
							<Typography component="p">
								{description}
							</Typography>
						</CardContent>
					</CardActionArea>
				</Link>
				<CardActions>
					<Link to={getUrl('items.edit', {id})}>
						<Button size="small" color="primary" variant="contained">
							Edit
						</Button>
					</Link>
					<Button size="small" color="secondary" variant="contained">
						Delete
					</Button>
				</CardActions>
			</Card>
		</Grid>
	);
};

const ItemList = ({items, classes}) => (
	<div className={classes.items}>
		<Link to={getUrl('items.create')}>
			<Fab color="primary" aria-label="Add" className={classes.fab}>
				<AddIcon/>
			</Fab>
		</Link>
		<Grid container>
			{items && items.map(item => (
				<ItemListItem
					key={item.id}
					item={item}
					classes={classes}
				/>
			))}
		</Grid>
	</div>
);

export default withStyles(styles)(ItemList);
export {
	ItemList,
	// ItemImage,
	ItemListItem,
};
