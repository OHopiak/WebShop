import React from 'react';
import {ListBase, listTypes} from './generics';

class Messages extends React.PureComponent {
	state = {
		listType: 'tile'
	};
	switchListType = () => {
		this.setState({
			listType: listTypes[this.state.listType]
		});
	};

	render() {
		const listClass = 'messages';
		return (
			<ListBase title={'Messages'} listClass={listClass} switchType={this.switchListType}
					  listType={this.state.listType}>
				<div>Messages</div>
			</ListBase>
		);
	}
}

export default Messages;
