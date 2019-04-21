import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import cn from 'classnames';
import {grey} from '@material-ui/core/colors';
import {APP_TITLE} from '../../configs/configs.json'
import {HeaderTitle} from "../../components/header/Header";

const styles = () => ({
	page: {
		height: '100vh',
		paddingTop: 64,
	},
	content: ({
		height: '100%',
		overflow: 'auto',
		backgroundColor: grey[200],
	}),
});


const ContentBase = ({title = APP_TITLE, additional, classes, children}) => (
	<HeaderTitle title={title}>
		<div className={cn(classes.page)}>
			<div className={classes.content}>
				{children}
			</div>
		</div>
	</HeaderTitle>
);

export default withStyles(styles)(ContentBase);
export {
	ContentBase
};
