import React from 'react';
import {Link} from 'react-router-dom';
import cn from 'classnames';
import Drawer from '@material-ui/core/Drawer/Drawer';
import Divider from '@material-ui/core/Divider/Divider';
import List from '@material-ui/core/List/List';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import withStyles from '@material-ui/core/styles/withStyles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Typography from '@material-ui/core/Typography/Typography';
import {collapsible} from 'src/utils/CollapseDrawer';
import withWidth, {isWidthUp} from '@material-ui/core/withWidth';
import {compose} from 'recompose';
import {ShowOnLoggedIn, ShowOnLoggedOff} from './decorators/showOnLoginStatus';
import {APP_TITLE} from '../configs/configs.json'

const drawerWidth = 255;
const styles = theme => ({
	drawer: {
		height: '100%',
	},
	drawerPaper: {
		position: 'relative',
		whiteSpace: 'nowrap',
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar,
	},
	drawerCollapse: {
		// display: 'none',
	},
	drawerPaperClose: {
		overflowX: 'hidden',
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		width: theme.spacing.unit * 7,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing.unit * 9,
		},
	},
	hidden: {
		display: 'none',
	},
});

const MenuItem = ({url, name}) => (
	<Link to={url.path} key={`link-${name}`}>
		<ListItem button>
			{/*<ListItemIcon children={url.icon}/>*/}
			<ListItemText primary={url.name}/>
		</ListItem>
	</Link>
);

const ModifierWrapper = ({modifiers, children}) => {
	let result = children;
	if (modifiers) {
		if (modifiers.includes('showOnLoggedIn')) {
			result = <ShowOnLoggedIn children={children}/>;
		} else if (modifiers.includes('showOnLoggedOff')) {
			result = <ShowOnLoggedOff children={children}/>;
		}
	}
	return result;
};

// TODO: fix this mess, was done just to work
const Header = ({urls, classes, collapsed, toggleCollapse, width}) => (
	<Drawer
		variant={isWidthUp('sm', width) ? 'permanent' : 'temporary'}
		anchor='left'
		open={isWidthUp('sm', width) ? true : !collapsed}
		onClose={isWidthUp('sm', width) ? toggleCollapse : () => ''}
		onClick={!isWidthUp('sm', width) ? toggleCollapse : () => ''}
		classes={{
			paper: cn(classes.drawerPaper, collapsed && classes.drawerPaperClose),
		}}
		className={classes.drawer}
	>
		<div className={classes.drawerHeader}>
			<Typography variant='h4' className={cn({[classes.hidden]: collapsed})}>{APP_TITLE}</Typography>
			<IconButton onClick={toggleCollapse} className={classes.drawerCollapse}>
				<ChevronLeftIcon/>
			</IconButton>
		</div>
		<Divider/>
		<List>
			{Object.entries(urls).map(([name, url]) => (
				<ModifierWrapper key={name} modifiers={url.modifiers}>
					<MenuItem url={url} name={name}/>
				</ModifierWrapper>
			))}
		</List>
	</Drawer>
);

const enhance = compose(
	collapsible,
	withStyles(styles),
	withWidth(),
);

export default enhance(Header);
export {
	Header
};
