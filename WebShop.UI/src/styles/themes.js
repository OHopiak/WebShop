import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import {blue, pink} from '@material-ui/core/colors';


const headerWidth = 255;
const headerWidthCollapsed = 55;

const theme = createMuiTheme({
	palette: {
		// type: 'dark',
		type: 'light',
		primary: blue,
		secondary: pink,
		// text: {
		// 	primary: '#3e5f79'
		// },
		customBlue: {
			light: '#b4d7f1',
			main: '#5682a3',
			dark: '#3e5f79',
			darker: '#2f475f',
		},
		customGrey: {
			main: '#e7ebf0',
			light: '#edf1f6',
		},
		background: {
			// default: '#e7ebf0',
			// paper: '#edf1f6'
		}
	},
	typography: {
		useNextVariants: true,
	},
	vars: {
		headerWidth: headerWidth,
		headerWidthCollapsed: headerWidthCollapsed,
		bodyWidth: `calc(100vw - ${headerWidth}px)`,
		bodyWidthFull: `calc(100vw - ${headerWidthCollapsed}px)`,

		contentHeight: 'calc(100vh - 64px)',

		navSmallerWidth: 56,
		navSmallWidth: 72,
		navBigWidth: 255,
	}
});

export default theme;
