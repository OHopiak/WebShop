import React from "react";
import cn from "classnames";
import {Link} from "react-router-dom";
import {AppBar, IconButton, Toolbar, Typography} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import {ShowOnLoggedIn} from "../decorators/showOnLoginStatus";
import {collapsible} from "../../utils/CollapseDrawer";
import {getUrl} from "../../configs/routes";
import SearchBar from "../SearchBar";
import HomeIcon from '@material-ui/icons/Home';
import AppsIcon from '@material-ui/icons/Apps';
import MessageIcon from '@material-ui/icons/Message';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import FaceIcon from '@material-ui/icons/Face';
import FormControlLabel from "@material-ui/core/FormControlLabel/index";
import Switch from "@material-ui/core/Switch/index";
import TopMenuItem from "./TopMenuItem";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import {connect} from "react-redux";
import {selectAdminMode, updateSettings} from "../../data/modules/settings";

const setupStore = connect((store) => ({
	isAdminMode: selectAdminMode(store),
}), (dispatch) => ({
	toggleAdminMode: (adminMode) => dispatch(updateSettings({adminMode: !adminMode})),
}));


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
		position: 'fixed',
		top: 0,
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

@collapsible
@withStyles(styles)
@setupStore
class TopBar extends React.Component {
	state = {
		mobileMoreAnchorEl: null,
		isAdmin: false,
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
		const {title, classes, collapsed, toggleCollapse, children, isAdminMode, toggleAdminMode} = this.props;
		const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

		const renderMenu = [
			<TopMenuItem url={getUrl('home')} name={"Home"} key={"home"}>
				<HomeIcon/>
			</TopMenuItem>,
			<TopMenuItem url={getUrl('items')} name={"Items"} key={"items"}>
				<AppsIcon/>
			</TopMenuItem>,
			<TopMenuItem url={getUrl('users')} name={"Users"} key={"users"}>
				<FaceIcon/>
			</TopMenuItem>,
			<TopMenuItem url={getUrl('messages')} name={"Messages"} key={"messages"}>
				<MessageIcon/>
			</TopMenuItem>,
			<ShowOnLoggedIn key={'adminToggle'}>
				<FormControlLabel control={
					<Switch
						checked={isAdminMode}
						onChange={() => toggleAdminMode(isAdminMode)}
						value={isAdminMode}
					/>
				}
								  label="Admin Mode"
				/>
			</ShowOnLoggedIn>,
			<ShowOnLoggedIn key={"logout"}>
				<TopMenuItem url={getUrl('logout')} name={"Logout"}>
					<LogoutIcon/>
				</TopMenuItem>
			</ShowOnLoggedIn>,
		];
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
						<Link to={getUrl('home')}>
							<Typography variant="h5" color="inherit" className={classes.title}>
								{title}
							</Typography>
						</Link>
						<SearchBar/>
						<div className={classes.grow}/>
						{children}
						<DesktopMenu classes={classes}>
							{renderMenu}
						</DesktopMenu>
						<div className={classes.sectionMobile}>
							<IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
								<MoreIcon/>
							</IconButton>
						</div>
					</Toolbar>
				</AppBar>
				<MobileMenu
					anchorEl={mobileMoreAnchorEl}
					open={isMobileMenuOpen}
					onClose={this.handleMenuClose}
					onMobileClose={this.handleMobileMenuClose}
				>
					{renderMenu}
				</MobileMenu>
			</>
		)
	}
}

export default TopBar;