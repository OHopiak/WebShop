import {Link} from 'react-router-dom';
import {IconButton, MenuItem} from '@material-ui/core';
import React from 'react';

const TopMenuItem = ({url, name, onMobileClose, mobile = false, children}) => {
	return (
		<Link to={url} key={`link-${name}`}>
			{mobile &&
			<MenuItem onClick={onMobileClose}>
				<IconButton color="inherit">
					{children}
				</IconButton>
				<p>{name}</p>
			</MenuItem>
			||
			<IconButton color="inherit">
				{children}
			</IconButton>
			}
		</Link>
	);
};

export default TopMenuItem;
