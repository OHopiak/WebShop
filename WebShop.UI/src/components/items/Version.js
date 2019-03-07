import React from 'react';
import {connect} from 'react-redux';
import {selectVersionById} from 'src/data/modules/versions';
import Paper from '@material-ui/core/Paper/Paper';
import {Item} from '../utils/GridHelpers';

const setupStore = connect((store) => ({
	getVersion: selectVersionById(store),
}));


const Version = ({id, version}) => {
	return (
		<div className='version'>
			{version &&
			<React.Fragment>
				{version.version}

				{version.deployments &&
				<span style={{float: 'right'}}>deployments: {version.deployments.length}</span>
				}
				{/*<pre>{JSON.stringify(version, 2, 2)}</pre>*/}
			</React.Fragment>
			}
		</div>
	);
};

const VersionBlock = ({versions, getVersion, classes}) => (
	<Item>
		<Paper className={classes.paper + ' ' + classes.versions}>
			Versions: <br/>
			{versions && versions.map(id => (
				<Version id={id} key={id} version={getVersion(id)}/>
			))}
		</Paper>
	</Item>
);

export default setupStore(VersionBlock);
export {
	Version,
	VersionBlock,
};
