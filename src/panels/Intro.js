
import React, { Fragment } from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Div from '@vkontakte/vkui/dist/components/Div/Div';

import './Intro.css';
import bg from '../img/intro-bg.jpg';
import logo from '../img/logo-white.png';
import galkin from '../img/galkin.png';

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
									<h3>Миссия: <br />“Накрой праздничный стол с&nbsp;Черкизово!”</h3>
									<p><b>Набери больше всех баллов <br />и&nbsp;получи крутые призы!</b></p>
									<div style={{ position: "relative" }}>
										<div style={{
											background: "#AA2223",
											border: "2px solid #FFFFFF",
											borderRadius: "3px",
											transform: "rotate(-5.95deg)",
											maxWidth: "16rem",
											width: "60%",
											position: "relative"
										}}>Попробуй набрать больше баллов,<br />чем Максим Галкин</div>
										<img src={galkin} alt="Максим Галкин" style={{ maxWidth: "20rem", width: "70%", position: "relative", zIndex: 1 }} />
									</div>
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