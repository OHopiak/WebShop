import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Layout} from 'src/layout';
import store from 'src/data/store';
import routes from 'src/configs/routes';
import {GlobalStyles, theme} from 'src/styles';

const App = () => (
	<Provider store={store}>
		<MuiThemeProvider theme={theme}>
			<GlobalStyles/>
			<CssBaseline/>
			<Router>
				<Layout {...routes}/>
			</Router>
		</MuiThemeProvider>
	</Provider>
);

export default App;
