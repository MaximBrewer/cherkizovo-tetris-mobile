import React, { Fragment, useEffect, useState } from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import { Left, Right, Rotate, Drop, Sound } from '../Icons'
import Tetris from '../components/tetris';
import AppActions from '../actions/app-actions';
import PieceStore from '../stores/piece-store';
import Pusher from 'pusher-js';
import AppConstants from '../constants/app-constants';
import GameStore from '../stores/game-store'
import BoardStore from '../stores/board-store'
import ScoreStore from '../stores/score-store';
import { Scrollbars } from 'react-custom-scrollbars-with-mobile';

import './Game.css';

import bg from '../img/game-bg.jpg';
import logo from '../img/logo-white.png';
import canavsBg from '../img/canvas-bg.png';

const axios = require('axios');

Pusher.logToConsole = true;

const pusher = new Pusher('527099ad7df4062c0694', {
	cluster: 'eu'
});

const channel = pusher.subscribe('cherkizovo');

const { events } = AppConstants;

const Game = ({ id, go, route, fetchedUser, activePanel }) => {

	function number_format(number, decimals, dec_point, separator) {
		number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
		var n = !isFinite(+number) ? 0 : +number,
			prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
			sep = (typeof separator === 'undefined') ? ',' : separator,
			dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
			s = '',
			toFixedFix = function (n, prec) {
				var k = Math.pow(10, prec);
				return '' + (Math.round(n * k) / k)
					.toFixed(prec);
			};
		// Фиксим баг в IE parseFloat(0.55).toFixed(0) = 0;
		s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
			.split('.');
		if (s[0].length > 3) {
			s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
		}
		if ((s[1] || '')
			.length < prec) {
			s[1] = s[1] || '';
			s[1] += new Array(prec - s[1].length + 1)
				.join('0');
		}
		return s.join(dec);
	}

	function renderView({ style, ...props }) {
		const viewStyle = {
			paddingRight: 14
		};
		return (
			<div
				className="box"
				style={{ ...style, ...viewStyle }}
				{...props} />
		);
	}

	function renderThumbHorizontal({ style, ...props }) {
		return (
			<div />
		);
	}

	function renderTrackHorizontal({ style, ...props }) {
		return (
			<div />
		);
	}

	function renderTrackVertical({ style, ...props }) {
		const trackStyle = {
			width: "4px",
			padding: "0px",
			borderRadius: "2px",
			backgroundColor: "#ffffff",
			position: "absolute",
			right: 0,
			bottom: 0,
			top: 0
		};
		return (
			<div
				style={{ ...style, ...trackStyle }}
				{...props} />
		);
	}

	function renderThumbVertical({ style, ...props }) {
		const thumbStyle = {
			width: "4px",
			height: "10px",
			borderRadius: "2px",
			backgroundColor: "rgba(33, 80, 245, 0.47)",
		};
		return (
			<div
				style={{ ...style, ...thumbStyle }}
				{...props} />
		);
	}

	const pad = (num) => {
		return ('000000000' + num).substr(-6).split('');
	}

	const moveLeft = (e) => {
		e.preventDefault();
		AppActions.moveLeft()
	}
	const moveRight = (e) => {
		e.preventDefault();
		AppActions.moveRight()

	}
	const rotate = (e) => {
		e.preventDefault();
		AppActions.flipClockwise()
	}
	const drop = (e) => {
		e.preventDefault();
		AppActions.hardDrop()
	}

	PieceStore.on(events.PLAYER_LOST, () => {
		go(route);
	});

	const [scores, setScores] = useState([]);
	const [paused, setPaused] = useState(false);

	const switchSound = () => {
		window.audioMusic.paused ? window.audioMusic.play() : window.audioMusic.pause();
		setPaused(window.audioMusic.paused)
	}

	useEffect(() => {
		axios.get('https://cherkizovo.fun/api/scores')
			.then(function (response) {
				setScores(response.data)
			})
			.catch(function (error) {
				// console.log(error);
			});
		setPaused(window.audioMusic.paused)
	}, [])

	useEffect(() => {
		if (activePanel === 'game') {
			GameStore.forceStart()
			window.audioMusic.play()
		} else {
			window.audioMusic.pause()
		}
		setPaused(window.audioMusic.paused)
	}, [activePanel])

	BoardStore.on(events.LINE_CLEARED, (additionalLines) => {
		window.woop();
	});


	return (
		<Panel id={id}>
			{fetchedUser &&
				<Fragment>
					<Div className="Portrait">
						<div>
							<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enableBackground="new 0 0 1000 1000" xmlSpace="preserve">
								<g><path d="M669,753.9c-53.2,39.9-115.5,59.8-179.2,58.9c-8.4-0.1-78.5-11.8-84.5-13.8c-2.9-1-58-25.8-58.3-26c-25.6-15-49-33.8-69.6-55.7c-0.3-0.3-21.7-25.9-22.9-27.6c-41.9-55.9-72.8-137.2-72.8-214.3H255l-122.5-196L10,475.5h73.5c0,90.5,33.5,185,78.4,254.4c0.6,1,46.6,59.9,47.3,60.7c26.9,28.8,57.4,53,90.5,72.5c0.9,0.5,56.6,27.3,65.4,30.5c4.2,1.5,28.1,8.9,36,10.9c5.3,1.3,50.1,9.4,52.8,9.7c13.5,1.4,26.9,2.4,40.3,2.4c81.9,0,161.7-26.8,230.3-78c21.8-16.4,27.1-48.6,11.8-72C720.9,743.2,690.8,737.5,669,753.9 M331,246.1c53.2-39.9,115.5-59.8,179.2-58.9c8.4,0.1,78.5,11.8,84.5,13.8c2.9,1,58,25.8,58.4,26c25.6,15,49,33.8,69.6,55.7c0.3,0.3,21.7,25.9,22.9,27.6c41.8,55.9,72.8,137.2,72.8,214.3H745l122.5,196l122.5-196h-73.5c0-90.5-33.5-185-78.4-254.4c-0.5-1-46.5-59.9-47.3-60.7c-26.9-28.8-57.4-53-90.5-72.5c-0.9-0.5-56.6-27.3-65.4-30.5c-4.2-1.5-28.1-8.9-36-10.9c-5.3-1.3-50.2-9.4-52.8-9.7c-13.5-1.4-26.9-2.4-40.3-2.4c-81.9,0-161.7,26.8-230.3,78c-21.8,16.4-27.1,48.6-11.8,72C279.1,256.8,309.2,262.5,331,246.1" /></g>
							</svg>
						</div>
						<h3>Поверните устройство чтоб продолжить игру!</h3>
					</Div>
					<Div className='Game' style={{ textAlign: "center", backgroundImage: 'url(' + bg + ')', color: "#ffffff" }} >
						<Div>
							<div><img src={logo} alt="" style={{ width: "10rem", maxWidth: "50vw", display: "block", margin: "0 auto .5rem" }} /></div>
							<h5>Миссия: “Накрой праздничный стол”</h5>
							{/* <p>Набери больше всех баллов и&nbsp;получи крутые призы!</p> */}
						</Div>
						<Tetris>
							{({ HeldPiece, Gameboard, PieceQueue, points, linesCleared }) => {
								return (
									<Div>
										<Div>
											<Div className={`score`} style={{ marginBottom: ".5rem" }}>
												<h5>ВАШ СЧЁТ:</h5>
												<div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
													<p className={`numbers`}>
														{pad(ScoreStore.getPoints()).map((item, index) => (
															<span key={index}>{item}</span>
														))}
													</p>
													<div className={`control-button sound ${paused ? 'paused' : ''}`} onClick={switchSound}>
														<div><Sound style={{ display: "block", width: "100%" }} /></div>
													</div>
												</div>
											</Div>
											<div style={{
												display: "flex",
												justifyContent: "center"
											}}>
												<div style={{
													backgroundPosition: "center",
													backgroundSize: "contain",
													backgroundImage: 'url(' + canavsBg + ')',
													marginBottom: "2rem"
												}}>
													{/* <HeldPiece /> */}
													<Gameboard />
													{/* <PieceQueue /> */}
												</div>
											</div>
											<Div style={{
												background: "#AA2223",
												border: "2px solid #FFFFFF",
												boxSizing: "border-box",
												boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
												borderRadius: "1.5rem",
												padding: "0.5rem 0.7rem",
												maxWidth: "18rem",
												margin: "0 auto 1rem"
											}}>
												<Div className={`control`} style={{ display: "flex", justifyContent: "space-between" }}>
													<div className={`control-button`} onClick={moveLeft}>
														<div><Left style={{ display: "block", width: "100%" }} /></div>
													</div>
													<div className={`control-button`} onClick={rotate}>
														<div><Rotate style={{ display: "block", width: "100%" }} /></div>
													</div>
													<div className={`control-button`} onClick={drop}>
														<div><Drop style={{ display: "block", width: "100%" }} /></div>
													</div>
													<div className={`control-button`} onClick={moveRight}>
														<div><Right style={{ display: "block", width: "100%" }} /></div>
													</div>
												</Div>
											</Div>
											<h5>Лучшие игроки</h5>
											<Div className={`scores`}>
												<Scrollbars style={{ height: 128 }}
													renderView={renderView}
													renderThumbHorizontal={renderThumbHorizontal}
													renderThumbVertical={renderThumbVertical}
													renderTrackHorizontal={renderTrackHorizontal}
													renderTrackVertical={renderTrackVertical}
													mobile={true}
												>
													<div style={{ paddingRight: "10px" }}>
														<ol>
															{scores.map((item, index) => (
																<li>{item.name}: <strong>{number_format(item.score, 0, '.', ' ')}</strong></li>
															))}
														</ol>
													</div>
												</Scrollbars>
											</Div>
										</Div>
									</Div>
								);
							}}
						</Tetris>
					</Div>
				</Fragment>
			}
		</Panel >
	)
}

export default Game;
