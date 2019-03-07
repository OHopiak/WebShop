import React from 'react';
import Grid from '@material-ui/core/Grid/Grid';

const Item = ({xs = 12, sm = 12, container = false, children}) => (
	<Grid item xs={xs} sm={sm}>
		{container &&
		<Grid container>
			{children}
		</Grid>
		|| children
		}
	</Grid>
);
const Row = ({xs = 12, sm = 12, children}) => (
	<Item item xs={xs} sm={sm} container>
		{children}
	</Item>
);
const SplitColumn = ({xs = 12, sm = 6, children, ...props}) => (
	<Item xs={xs} sm={sm} container>
		{children}
	</Item>
);

export {
	Item,
	Row,
	SplitColumn,
};
