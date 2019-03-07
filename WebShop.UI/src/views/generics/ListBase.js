import React from 'react';
import MenuBurger from 'src/img/menu-burger.svg';
import MenuGrid from 'src/img/menu-grid.svg';
import PropTypes from 'prop-types';
import ContentBase from './ContentBase';

const listTypes = {
	row: 'tile',
	tile: 'row',
};

const DefaultMenuBtn = ({type, size, ...props}) => {
	let Btn = null;
	switch (type) {
		case 'tile':
			Btn = MenuGrid;
			break;
		case 'row':
		default:
			Btn = MenuBurger;
	}
	return <Btn width={size} height={size} {...props}/>;
};
DefaultMenuBtn.defaultProps = {
	type: 'row',
	size: 30,
};

const ListBase = ({title, listType, switchType, MenuBtn = DefaultMenuBtn, children}) => (
	<ContentBase title={title} additional={() =>
		<MenuBtn type={listType} onClick={switchType} size={40} style={{display: 'none'}}/>
	}>
		{children}
	</ContentBase>
);
ListBase.propTypes = {
	title: PropTypes.string.isRequired,
	listType: PropTypes.string.isRequired,
	switchType: PropTypes.func
};
ListBase.defaultProps = {
	listTypes: 'tile',
};

export {listTypes, DefaultMenuBtn, ListBase};
