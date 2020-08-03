import React from 'react';

const Sidepanel = ({ actionTypes }) => {
	return (
		<div className='side-panel'>
			<div className='side-panel__title'> Actions </div>
			<div className='action-types'>
				{actionTypes.map((actionType, index) => (
					<div className='action-type' key={index}>
						{actionType}
					</div>
				))}
			</div>
		</div>
	);
};

export default Sidepanel;
