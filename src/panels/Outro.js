
import React, { Fragment, useEffect } from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import ScoreStore from '../stores/score-store';

import './Outro.css';
import bg from '../img/intro-bg.jpg';
import logo from '../img/logo-white.png';

const axios = require('axios');

const Outro = ({ id, route, fetchedUser, go, bridge, activePanel }) => {

	useEffect(() => {
		activePanel === 'outro' && axios.post('https://cherkizovo.fun/api/store', {
			user_id: fetchedUser.id,
			name: fetchedUser.first_name,
			avatar: fetchedUser.photo_200,
			score: ScoreStore.getPoints()
		})
			.then(function (response) {
				// console.log(response);
			})
			.catch(function (error) {
				// console.log(error);
			});
	}, [activePanel])

	const replay = () => {
		bridge.send("VKWebAppShare");
	}

	const pad = (num) => {
		return ('000000000' + num).substr(-6).split('');
	}
	return (
		<Panel id={id}>
			{fetchedUser &&
				<Fragment>
					<div style={{ maxHeight: "100vh", overflow: "hidden" }}>
						<Div className="Portrait">
							<div>
								<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enableBackground="new 0 0 1000 1000" xmlSpace="preserve">
									<g><path d="M669,753.9c-53.2,39.9-115.5,59.8-179.2,58.9c-8.4-0.1-78.5-11.8-84.5-13.8c-2.9-1-58-25.8-58.3-26c-25.6-15-49-33.8-69.6-55.7c-0.3-0.3-21.7-25.9-22.9-27.6c-41.9-55.9-72.8-137.2-72.8-214.3H255l-122.5-196L10,475.5h73.5c0,90.5,33.5,185,78.4,254.4c0.6,1,46.6,59.9,47.3,60.7c26.9,28.8,57.4,53,90.5,72.5c0.9,0.5,56.6,27.3,65.4,30.5c4.2,1.5,28.1,8.9,36,10.9c5.3,1.3,50.1,9.4,52.8,9.7c13.5,1.4,26.9,2.4,40.3,2.4c81.9,0,161.7-26.8,230.3-78c21.8-16.4,27.1-48.6,11.8-72C720.9,743.2,690.8,737.5,669,753.9 M331,246.1c53.2-39.9,115.5-59.8,179.2-58.9c8.4,0.1,78.5,11.8,84.5,13.8c2.9,1,58,25.8,58.4,26c25.6,15,49,33.8,69.6,55.7c0.3,0.3,21.7,25.9,22.9,27.6c41.8,55.9,72.8,137.2,72.8,214.3H745l122.5,196l122.5-196h-73.5c0-90.5-33.5-185-78.4-254.4c-0.5-1-46.5-59.9-47.3-60.7c-26.9-28.8-57.4-53-90.5-72.5c-0.9-0.5-56.6-27.3-65.4-30.5c-4.2-1.5-28.1-8.9-36-10.9c-5.3-1.3-50.2-9.4-52.8-9.7c-13.5-1.4-26.9-2.4-40.3-2.4c-81.9,0-161.7,26.8-230.3,78c-21.8,16.4-27.1,48.6-11.8,72C279.1,256.8,309.2,262.5,331,246.1" /></g>
								</svg>
							</div>
							<h3>Поверните устройство чтоб продолжить игру!</h3>
						</Div>
						<Div className='Outro'>
							<div style={{ backgroundImage: 'url(' + bg + ')' }}>
								<Div style={{
									color: "#ffffff",
									marginBottom: "10%",
									maxWidth: "80%"
								}}>
									<h2>Новый год с</h2>
									<h2><img src={logo} alt="" style={{ width: "12rem" }} /></h2>
									<h3>Миссия: <br />“Накрой праздничный стол с&nbsp;Черкизово!”</h3>
									<h4>ВАШ СЧЁТ:</h4>
									<p className={`numbers`}>
										{pad(ScoreStore.getPoints()).map((item, index) => (
											<span key={index}>{item}</span>
										))}
									</p>
									<p>&nbsp;</p>
									<p>
										<button className={`btn-red`} onClick={() => go(route)}>Сыграть еще раз</button>
										<br /><br /><button className={`btn-blue`} onClick={() => replay()}>Рассказать друзьям</button>
									</p>
								</Div>
							</div>
						</Div>
					</div>
				</Fragment>
			}
		</Panel>
	)
}
export default Outro;