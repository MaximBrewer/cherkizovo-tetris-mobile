
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
					<Div className='Intro' style={{ paddingTop: "216%", position: "relative" }} >
						<div style={{ textAlign: "center", backgroundImage: 'url(' + bg + ')', height: "100%", width: "100%", position: "absolute", top: 0, left: 0, justifyContent: "center", alignItems: "center", display: "flex" }}>
							<Div style={{ minHeight: "70%", color: "#ffffff" }}>
								<h2>Новый год с</h2>
								<h2><img src={logo} alt="" style={{ width: "12rem" }} /></h2>
								<h3>Миссия: <br /> накрой праздничный стол с&nbsp;Черкизово!</h3>
								<p>Набери больше всех баллов и&nbsp;получи крутые призы!</p>
								<p>&nbsp;</p>
								<p><button className={`btn-red`} onClick={() => go(route)}>Играть</button></p>
							</Div>
						</div>
					</Div>
				</Fragment>
			}
		</Panel >
	)
}
export default Intro;