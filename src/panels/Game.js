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
import './Game.css';
import bg from '../img/game-bg.jpg';
import canavsBg from '../img/canvas-bg.png';
import ScoreStore from '../stores/score-store';
import { Scrollbars } from 'react-custom-scrollbars-with-mobile';

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

	const switchSound = () => {
		window.audioMusic.volume == 1 ? window.audioMusic.volume = 0 : window.audioMusic.volume = 1;
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

	useEffect(() => {
		axios.get('https://cherkizovo.fun/api/scores')
			.then(function (response) {
				setScores(response.data)
			})
			.catch(function (error) {
				// console.log(error);
			});
	}, [])

	useEffect(() => {
		activePanel === 'game' && GameStore.forceStart()
		window.audioMusic.play()
	}, [activePanel])

	BoardStore.on(events.LINE_CLEARED, (additionalLines) => {
		window.woop();
	});


	return (
		<Panel id={id}>
			{fetchedUser &&
				<Fragment>
					<Div className='Game' style={{ textAlign: "center", backgroundImage: 'url(' + bg + ')', color: "#ffffff" }} >
						<Div style={{ paddingLeft: "1rem" }}>
							<h4>Миссия: <br /> накрой праздничный стол с Черкизово!</h4>
							<p>Набери больше всех баллов и&nbsp;получи крутые призы!</p>
						</Div>
						<Tetris>
							{({ HeldPiece, Gameboard, PieceQueue, points, linesCleared }) => {
								return (
									<Div style={{ display: "flex", justifyContent: "center" }}>
										<Div style={{ width: "32%", justifyContent: "center" }}>1</Div>
										<Div style={{ width: "38%", justifyContent: "center" }}>
											<div style={{
												backgroundPosition: "center",
												backgroundSize: "contain",
												backgroundImage: 'url(' + canavsBg + ')'
											}}>
												<div>
													{/* <HeldPiece /> */}
													<Gameboard />
													{/* <PieceQueue /> */}
												</div>
											</div>
										</Div>
										<Div style={{ width: "30%", justifyContent: "center", padding: "0 1rem 0 2rem" }}>
											<Div className={`score`}>
												<p>Ваш счет:</p>
												<p className={`numbers`}>
													{pad(ScoreStore.getPoints()).map((item, index) => (
														<span key={index}>{item}</span>
													))}
												</p>
											</Div>
											<p>Лучшие игроки</p>
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
											<Div style={{
												background: "#AA2223",
												border: "2px solid #FFFFFF",
												boxSizing: "border-box",
												boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
												borderRadius: "1.5rem",
												padding: "0.5rem 0.7rem",
												marginBottom: "0.5rem"
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
											<Div style={{
												display: "flex",
												justifyContent: "center",
												alignItems: "center"
											}}>
												<div className={`control-button sound`} onClick={switchSound}>
													<div><Sound style={{ display: "block", width: "100%" }} /></div>
												</div>
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
