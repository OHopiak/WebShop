import React from 'react';
import Debug from '../utils/Debug';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = () => ({
	itemBox: {
		padding: 12
	},
});

const UserItem = ({user, classes}) => {
	const {id, url, first_name, last_name, username, email, groups, projects, is_superuser, is_staff, is_active} = user;
	return (
		<Paper>
			<Debug data={user}/>
		</Paper>
	);
};

const UsersList = ({users, classes}) => (
	<Grid container>
		{users && users.map(user => (
			<Grid item xs={12} className={classes.itemBox} key={user.id}>
				<UserItem user={user} classes={classes}/>
			</Grid>
		))}
	</Grid>
);

export default withStyles(styles)(UsersList);
export {
	UsersList,
	UserItem,
};
