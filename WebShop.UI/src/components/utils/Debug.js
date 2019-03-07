import React from 'react';

const Debug = ({data, comment, hidden = false}) => (
	<pre style={hidden ? {display: 'none'} : {}}>
		{comment &&
		<React.Fragment><br/>{comment}<br/></React.Fragment>}
		{JSON.stringify(data, 2, 2)}
	</pre>
);

export default Debug;
