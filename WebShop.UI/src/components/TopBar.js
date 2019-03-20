import React from "react";
import cn from "classnames";
import {Link} from "react-router-dom";
import {AppBar, IconButton, Menu, MenuItem, Toolbar, Typography} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import {ShowOnLoggedIn, ShowOnLoggedOff} from "./decorators/showOnLoginStatus";
import {collapsible} from "../utils/CollapseDrawer";
import routes from "../configs/routes";
import SearchBar from "./SearchBar";

const styles = theme => ({
	menuBtn: {
		marginLeft: -12,
		marginRight: 20,
		display: 'none',
	},
	title: {
		// flexGrow: 1
	},
	heading: {
		position: 'relative',
		width: '100vw',
		transition: theme.transitions.create(['width', 'margin-left'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	headingCollapsed: {},
	grow: {
		flexGrow: 1,
	},
	sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'flex',
		},
	},
	sectionMobile: {
		display: 'flex',
		[theme.breakpoints.up('sm')]: {
			display: 'none',
		},
	},
});

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


const TopMenuItem = ({url, name}) => {
	const {path, icon: Icon} = url;
	return (
		<Link to={path} key={`link-${name}`}>
			<IconButton color="inherit">
				<Icon/>
			</IconButton>
		</Link>
	)
};

@collapsible
@withStyles(styles)
class TopBar extends React.Component {
	state = {
		mobileMoreAnchorEl: null,
	};

	handleProfileMenuOpen = event => {
		this.setState({anchorEl: event.currentTarget});
	};

	handleMenuClose = () => {
		this.setState({anchorEl: null});
		this.handleMobileMenuClose();
	};

	handleMobileMenuOpen = event => {
		this.setState({mobileMoreAnchorEl: event.currentTarget});
	};

	handleMobileMenuClose = () => {
		this.setState({mobileMoreAnchorEl: null});
	};

	render() {
		const {mobileMoreAnchorEl} = this.state;
		const {title, classes, collapsed, toggleCollapse, additional: Additional} = this.props;
		const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
		const renderMobileMenu = (
			<Menu
				anchorEl={mobileMoreAnchorEl}
				anchorOrigin={{vertical: 'top', horizontal: 'right'}}
				transformOrigin={{vertical: 'top', horizontal: 'right'}}
				open={isMobileMenuOpen}
				onClose={this.handleMenuClose}
			>
				{Object.entries(routes.urls).map(([urlName, url]) => {
					const {path, icon: Icon, name} = url;
					return (
						<ModifierWrapper key={urlName} modifiers={url.modifiers}>
							<Link to={path} key={`link-${urlName}`}>
								<MenuItem onClick={this.handleMobileMenuClose}>
									<IconButton color="inherit">
										<Icon/>
									</IconButton>
									<p>{name}</p>
								</MenuItem>
							</Link>
						</ModifierWrapper>
					)
				})}
			</Menu>
		);
		return (
			<>
				<AppBar position="static"
						className={cn(classes.heading, {[classes.headingCollapsed]: collapsed})}>
					<Toolbar>
						<IconButton
							className={cn(classes.menuBtn, {[classes.menuBtnNotCollapsed]: !collapsed})}
							color="inherit" aria-label="Menu"
							onClick={toggleCollapse}>
							<MenuIcon/>
						</IconButton>
						<Typography variant="h5" color="inherit" className={classes.title}>
							{title}
						</Typography>
						<SearchBar/>
						<div className={classes.grow}/>
						{Additional && <Additional/>}
						<div className={classes.sectionDesktop}>
							{Object.entries(routes.urls).map(([name, url]) => (
								<ModifierWrapper key={name} modifiers={url.modifiers}>
									<TopMenuItem url={url} name={name}/>
								</ModifierWrapper>
							))}
						</div>
						<div className={classes.sectionMobile}>
							<IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
								<MoreIcon/>
							</IconButton>
						</div>
					</Toolbar>
				</AppBar>
				{renderMobileMenu}
			</>
		)
	}
}

export default TopBar;