import React from 'react';
import {compose, withHandlers, withState} from 'recompose';

const CollapseDrawer = React.createContext({});

const collapsible = Component => props => (
	<CollapseDrawer.Consumer>
		{data =>
			<Component {...props} {...data} />
		}
	</CollapseDrawer.Consumer>
);

const enhance = compose(
	withState('collapsed', 'setCollapsed', true),
	withHandlers({
		toggleCollapse: ({collapsed, setCollapsed}) =>
			() => setCollapsed(!collapsed),
	})
);

const CollapseProvider = enhance(({collapsed, toggleCollapse, children}) => (
	<CollapseDrawer.Provider value={{collapsed, toggleCollapse}} children={children}/>
));

export {
	collapsible,
	CollapseProvider,
};
