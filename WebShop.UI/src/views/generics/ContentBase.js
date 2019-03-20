import React from 'react';
import DocumentTitle from 'react-document-title';
import withStyles from '@material-ui/core/styles/withStyles';
import cn from 'classnames';
import {grey} from '@material-ui/core/colors';
import {APP_TITLE} from '../../configs/configs.json'
import TopBar from "../../components/TopBar";

const styles = () => ({
	page: {
		height: '100%',
	},
	content: ({
		height: 'calc(100vh - 64px)',
		overflow: 'auto',
		backgroundColor: grey[200],
	}),
});


const ContentBase = ({title = APP_TITLE, additional, classes, children}) => (
	<DocumentTitle title={title}>
		<div className={cn(classes.page)}>
			<TopBar title={title} additional={additional}/>
			<div className={classes.content}>
				{children}
			</div>
		</div>
	</DocumentTitle>
);

export default withStyles(styles)(ContentBase);
export {
	ContentBase
};
