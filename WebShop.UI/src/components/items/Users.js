import React from 'react';
import connect from 'react-redux/es/connect/connect';
import {selectUserById} from 'src/data/modules/users';
import Paper from '@material-ui/core/Paper/Paper';
import {Item} from '../utils/GridHelpers';

const setupStore = connect((store) => ({
	getUser: (id) => selectUserById(store, id),
}));


const User = ({id, user}) => (
	user && <div>
		{user.first_name} {user.last_name}
	</div> || ''
);

const Author = setupStore(({id, getUser, classes}) => (
	<Item>
		<Paper className={classes.paper + ' ' + classes.author}>
			Author:
			<User id={id} user={getUser(id)}/>
		</Paper>
	</Item>
));

const Collaborators = setupStore(({users, getUser, classes}) => (
	<Item sm={6}>
		<Paper className={classes.paper + ' ' + classes.collaborators}>
			Collaborators:
			{users && users.map(id =>
				<User id={id} user={getUser(id)} key={id}/>
			)}
		</Paper>
	</Item>
));


export {
	Author,
	Collaborators,
	User,
};
