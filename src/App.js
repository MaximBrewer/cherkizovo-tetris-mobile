import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import Snackbar from '@vkontakte/vkui/dist/components/Snackbar/Snackbar';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import Icon24Error from '@vkontakte/icons/dist/24/error';

import '@vkontakte/vkui/dist/vkui.css';

import Game from './panels/Game';
import Intro from './panels/Intro';
import Outro from './panels/Outro';
import './App.css';

const ROUTES = {
	GAME: 'game',
	INTRO: 'intro',
	OUTRO: 'outro',
};

const STORAGE_KEYS = {
	STATE: 'state',
	STATUS: 'viewStatus',
};

const App = () => {
	const [activePanel, setActivePanel] = useState(ROUTES.INTRO);
	const [fetchedUser, setUser] = useState(null);
	const [fetchedState, setFetchedState] = useState(null);
	const [snackbar, setSnackbar] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);


	useEffect(() => {
		if (bridge.supports("VKWebAppResizeWindow")) {
			bridge.send("VKWebAppResizeWindow", { "width": 800, "height": 568 });
		}
		bridge.subscribe(({ detail: { type, data } }) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			const sheetState = await bridge.send('VKWebAppStorageGet', { keys: [STORAGE_KEYS.STATE, STORAGE_KEYS.STATUS] });
			if (Array.isArray(sheetState.keys)) {
				const data = {};
				sheetState.keys.forEach(({ key, value }) => {
					try {
						data[key] = value ? JSON.parse(value) : {};
						switch (key) {
							case STORAGE_KEYS.STATE:
								setFetchedState(data[STORAGE_KEYS.STATE]);
								break;
							case STORAGE_KEYS.STATUS:
								break;
							default:
								break;
						}
					} catch (error) {
						setSnackbar(<Snackbar
							layout='vertical'
							onClose={() => setSnackbar(null)}
							before={<Avatar size={24} style={{ backgroundColor: 'var(--dynamic_red)' }}><Icon24Error fill='#fff' width={14} height={14} /></Avatar>}
							duration={900}
						>
							Проблема с получением данных из Storage
						</Snackbar>
						);
						setFetchedState({});
					}
				});

			} else {
				setFetchedState({});
			}
			setUser(user);
			setPopout(null);
		}
		fetchData();
	}, []);

	const go = panel => {
		setActivePanel(panel);
	};

	return (
		<View activePanel={activePanel} popout={popout}>
			<Intro
				id={ROUTES.INTRO}
				fetchedUser={fetchedUser}
				fetchedState={fetchedState}
				go={go}
				route={ROUTES.GAME}
				snackbarError={snackbar}
			/>
			<Game
				id={ROUTES.GAME}
				fetchedUser={fetchedUser}
				fetchedState={fetchedState}
				go={go}
				activePanel={activePanel}
				route={ROUTES.OUTRO}
				snackbarError={snackbar}
			/>
			<Outro
				id={ROUTES.OUTRO}
				bridge={bridge}
				fetchedUser={fetchedUser}
				fetchedState={fetchedState}
				activePanel={activePanel}
				go={go}
				route={ROUTES.INTRO}
				snackbarError={snackbar}
			/>
		</View>
	);
}

export default App;