import React from 'react';
import {ContentBase} from './generics';

const NotFound = ({match}) => (
	<ContentBase title={'404'}>
		<h2>Page <code>{match.path}</code> is not found</h2>
	</ContentBase>
);

export default NotFound;
