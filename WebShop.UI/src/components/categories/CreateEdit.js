import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import {Button} from "@material-ui/core";

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
class CategoryCreateEdit extends React.Component {
	constructor(props) {
		super(props);
		const {category = {}} = this.props;
		this.state = {
			name: category.name || '',
			description: category.description || '',
		};
	}

	handleChange = name => event => {
		this.setState({[name]: event.target.value});
	};

	handleSubmit = e => {
		e.preventDefault();
		console.log(e);
		const data = this.state;
		if (this.validate(data))
			this.props.handleSubmit(data);
		else {
			console.error("Failed to process the form:");
			console.error(data);
		}
	};

	validate = data => {
		const {name, description} = data;
		return !!name;
	};

	render() {
		const {classes} = this.props;
		const {name, description} = this.state;
		return (
			<Paper className={classes.container}>
				<form className={classes.form} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
					<TextField
						label="Name"
						value={name}
						className={classes.textField}
						fullWidth
						required
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
					<Button variant='contained' color='primary' onClick={this.handleSubmit}
							className={classes.submitBtn}>Create</Button>
				</form>
			</Paper>
		);
	}
}

export default CategoryCreateEdit;
