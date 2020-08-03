import React, { useState, useEffect } from 'react';
import './styles.css';
import Sidepanel from './components/Sidepanel';

const DevTools = ({ store, children }) => {
	const [actionTypes, setActionTypes] = useState([]);
	const [show, setShow] = useState(false);

	useEffect(() => {
		const listener = info => {
			console.log('info:', info);
			setActionTypes(x => [...x, info.actionType]);
		};
		store.subscribe(listener);
	}, []);

	return (
		<>
			<button className='toggle-xedux-devtools' onClick={() => setShow(!show)}>
				Toggle
			</button>
			{show ? (
				<div className='xedux-devtools'>
					<Sidepanel actionTypes={actionTypes} />
					<div className='app-panel'> {children} </div>
					<div className='bottom-panel'> </div>{' '}
				</div>
			) : (
				children
			)}
		</>
	);
};

export default DevTools;
