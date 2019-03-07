import React from 'react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
	root: {
		display: 'block',
		width: '100%',
		backgroundColor: '#f1f1f1'
	},
	header: {
		backgroundColor: theme.palette.customBlue.dark,
		color: 'white',
		textAlign: 'center',
		fontSize: 36,
		padding: '50px 0',
		height: 200,
	},
	title: {
		color: theme.palette.customBlue.main,
		fontWeight: 'bold',
		textAlign: 'center'
	},
	bottom: {
		display: 'flex',
		justifyContent: 'center',
	},
	wrapper: {
		width: '34%',
		marginTop: 20,
		padding: 20,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	form: {
		margin: 0,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
	},
	remember: {
		justifyContent: 'left'
	}
});

const Login = ({onSubmit, onInputChange, classes}) => (
	<div className={classes.root}>
		<div className={classes.header}>
			<h1>Codegram</h1>
		</div>
		<div className={classes.bottom}>
			<Paper className={classes.wrapper}>
				<form className={classes.form} onSubmit={onSubmit}>
					<Typography variant="h5" className={classes.title}>Log In</Typography>
					<TextField name="username" label="Username" onChange={onInputChange('username')}/>
					<TextField type="password" name="password" label="Password"
							   onChange={onInputChange('password')}/>
					<div className={classes.remember}>
						<InputLabel>Remember me</InputLabel>
						<Checkbox name="remember" onChange={onInputChange('remember')}/>
					</div>
					<Button type="submit" variant="contained" color="primary">Log In</Button>
				</form>
			</Paper>
		</div>
	</div>
);

export default withStyles(styles)(Login);
export {
	Login
};
