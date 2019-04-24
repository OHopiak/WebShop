import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import {Button} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
	container: {
		margin: 4 * theme.spacing.unit,
		maxWidth: 400,
		paddingBottom: theme.spacing.unit
	},
	form: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
	},
	submitBtn: {}
});

@withStyles(styles)
class ItemCreateEdit extends React.Component {

	constructor(props) {
		super(props);
		const {item = {}} = this.props;
		this.state = this.initState(item);
	}

	componentWillReceiveProps(nextProps, nextContext) {
		const {item = {}} = nextProps;
		this.setState(() => this.initState(item));
	}

	initState = item => ({
		name: item.name || '',
		description: item.description || '',
		price: item.price || '',
		category: item.category || 0,
	});

	handleChange = name => event => {
		const {value} = event.target;
		this.setState({[name]: value});
	};

	handleSubmit = e => {
		e.preventDefault();
		const data = this.state;
		if (this.validate(data)) {
			this.props.handleSubmit(data);
		} else {
			console.error('Failed to process the form:');
			console.error(data);
		}
	};

	validate = data => {
		const {name, description, price} = data;

		// WARNING: a crazy workaround, stopped working after the recent accidental deletion of the backend folder
		if (data.category === 0) data.category = null;

		return !!name && !!description && !isNaN(price) && price > 0;
	};

	render() {
		const {item, classes, categories} = this.props;
		const {name, description, price, category} = this.state;

		console.log('In component:');
		console.log(item);
		return (
			<Paper className={classes.container}>
				<form className={classes.form} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
					<TextField
						label="Name"
						value={name}
						className={classes.textField}
						fullWidth
						onChange={this.handleChange('name')}
						margin="normal"
					/>
					<TextField
						label="Description"
						value={description}
						className={classes.textField}
						multiline
						fullWidth
						onChange={this.handleChange('description')}
						margin="normal"
					/>
					<TextField
						select
						label="Category"
						fullWidth
						className={classes.textField}
						value={category}
						onChange={this.handleChange('category')}
						// InputProps={{
						// 	startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
						// }}
					>
						{categories && categories.map(category => (
							<MenuItem key={category.id} value={category.id}>
								{category.name}
							</MenuItem>
						))}
						<MenuItem key={0} value={0}>
							Other
						</MenuItem>
					</TextField>

					<TextField
						label="Price"
						value={price}
						className={classes.textField}
						type='number'
						fullWidth
						onChange={this.handleChange('price')}
						margin="normal"
					/>

					<Button variant='contained' color='primary' onClick={this.handleSubmit}
							className={classes.submitBtn}>{!item ? 'Create' : 'Edit'}</Button>
				</form>
			</Paper>
		);
	}
}

export default ItemCreateEdit;
