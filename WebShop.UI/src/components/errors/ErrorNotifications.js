import React from 'react';
import {connect} from 'react-redux';
import {resolveError} from 'src/data/modules/errors';
import Snackbar from '@material-ui/core/Snackbar/index';
import IconButton from '@material-ui/core/IconButton/index';
import CloseIcon from '@material-ui/icons/Close';

const setupStore = connect((store) => ({
	errors: store.errors.list,
}), (dispatch) => ({
	resolveError: (id) => dispatch(resolveError(id)),
}));

const ErrorMessage = ({message, status, details}) => (
	<span><b>{message} {status}</b>{details && ` - ${details}`}</span>
);

const ErrorNotification = ({error, onClose}) => {
	const {id, message, resolved, status, details} = error;
	return (
		<Snackbar
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'right',
			}}
			open={!resolved}
			autoHideDuration={6000}
			onClose={onClose(id)}
			ContentProps={{
				'aria-describedby': 'message-id',
			}}
			message={<ErrorMessage message={message} status={status} details={details}/>}
			action={[
				<IconButton
					key="close"
					aria-label="Close"
					color="inherit"
					// className={classes.close}
					onClick={onClose(id)}
				>
					<CloseIcon/>
				</IconButton>,
			]}
		/>
	);
};

const ErrorNotifications = ({errors, resolveError}) => {
	const handleClose = id => (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		resolveError(id);
	};
	return (errors && errors.length) && (
		<>
			{errors.map(error => (
				<ErrorNotification key={error.id} error={error} onClose={handleClose}/>
			))}
		</>);
};

export default setupStore(ErrorNotifications);
