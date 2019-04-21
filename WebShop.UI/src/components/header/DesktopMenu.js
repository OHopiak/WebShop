import React from "react";

const DesktopMenu = ({classes, children}) => (
	<>
		{React.Children.map(children, child => (
			<div className={classes.sectionDesktop}>
				{child}
			</div>
		))}
	</>
);

export default DesktopMenu;