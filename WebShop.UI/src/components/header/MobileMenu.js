import React from 'react';
import {Menu} from '@material-ui/core';

const MobileMenu = ({anchorEl, open, onClose, onMobileClose, children}) => {
	const childrenWithProps = React.Children.map(children, child =>
		React.cloneElement(child, {onMobileClose, mobile: true})
	);
	return (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{vertical: 'top', horizontal: 'right'}}
			transformOrigin={{vertical: 'top', horizontal: 'right'}}
			open={open}
			onClose={onClose}
		>
			{childrenWithProps}
		</Menu>
	);
};

export default MobileMenu;
