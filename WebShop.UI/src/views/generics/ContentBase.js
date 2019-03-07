import React from 'react';
import Typography from '@material-ui/core/Typography/Typography';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import AppBar from '@material-ui/core/AppBar/AppBar';
import DocumentTitle from 'react-document-title';
import IconButton from '@material-ui/core/IconButton/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {collapsible} from 'src/utils/CollapseDrawer';
import withStyles from '@material-ui/core/styles/withStyles';
import cn from 'classnames';
import {grey} from '@material-ui/core/colors';

const styles = theme => ({
	menuBtn: {
		marginLeft: -12,
		marginRight: 20
	},
	menuBtnNotCollapsed: {
		[theme.breakpoints.down('md')]: {
			display: 'none',
		}
	},
	page: {
		height: '100%',
	},
	content: ({
		height: 'calc(100vh - 64px)',
		overflow: 'auto',
		backgroundColor: grey[200],
	}),
	title: {
		flexGrow: 1
	},
	heading: {
		width: '100vw',
		[theme.breakpoints.up('sm')]: {
			width: theme.vars.bodyWidth,
		},
		transition: theme.transitions.create(['width', 'margin-left'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	headingCollapsed: {
		position: 'relative',
		width: '100vw',
		[theme.breakpoints.up('sm')]: {
			marginLeft: -theme.vars.navSmallWidth,
		},
		zIndex: 1201,
		transition: theme.transitions.create(['width', 'margin-left'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	}
});

const MenuBtn = ({collapsed, toggleCollapse, classes}) => (
	<IconButton
		className={cn(classes.menuBtn, {[classes.menuBtnNotCollapsed]: !collapsed})}
		color="inherit" aria-label="Menu"
		onClick={toggleCollapse}>
		<MenuIcon/>
	</IconButton>
);

const ContentBase = ({collapsed, toggleCollapse, title = 'Codegram', additional: Additional, classes, children}) => (
	<DocumentTitle title={title}>
		<div className={cn(classes.page)}>
			<AppBar position="static"
					className={cn(classes.heading, {[classes.headingCollapsed]: collapsed})}>
				<Toolbar>
					<MenuBtn collapsed={collapsed} toggleCollapse={toggleCollapse} classes={classes}/>
					<Typography variant="h5" color="inherit" className={classes.title}>
						{title}
					</Typography>
					{Additional && <Additional/>}
				</Toolbar>
			</AppBar>
			<div className={classes.content}>
				{children}
			</div>
		</div>
	</DocumentTitle>
);

export default collapsible(withStyles(styles)(ContentBase));
export {
	ContentBase
};
