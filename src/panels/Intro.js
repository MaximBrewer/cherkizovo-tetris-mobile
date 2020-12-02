
import React, { Fragment } from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Div from '@vkontakte/vkui/dist/components/Div/Div';

import './Intro.css';
import bg from '../img/intro-bg.jpg';
import logo from '../img/logo-white.png';

const Intro = ({ id, go, route, fetchedUser }) => {
	return (
		<Panel id={id}>
			{fetchedUser &&
				<Fragment>
					<div style={{ maxHeight: "100vh", overflow: "hidden" }}>
						<Div className='Intro'>
							<div style={{ backgroundImage: 'url(' + bg + ')' }}>
								<Div style={{
									color: "#ffffff",
									marginBottom: "10%", 
									maxWidth: "80%"
								}}>
									<h2>Новый год с</h2>
									<h2><img src={logo} alt="" style={{ width: "12rem" }} /></h2>
									<h3>Миссия: <br /> накрой праздничный стол с&nbsp;Черкизово!</h3>
									<p>Набери больше всех баллов и&nbsp;получи крутые призы!</p>
									<p>&nbsp;</p>
									<p><button className={`btn-red`} onClick={() => go(route)}>Играть</button></p>
								</Div>
							</div>
						</Div>
					</div>
				</Fragment>
			}
		</Panel >
	)
}
export default Intro;