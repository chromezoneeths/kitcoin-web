import * as helpers from './helpers.js';

const wsURL = localStorage.getItem('WSOverrideURL') || `${window.location.protocol === 'https:' ? 'wss://' : 'ws://'}${window.location.host}/api`;
const httpURL = localStorage.getItem('HTTPOverrideURL') || `${window.location.protocol}${window.location.host}/api`;

$(async () => {
	console.log('let\'s get goin');
	try {
		if (localStorage.secret.length > 30) {
			// Await helpers.send({
			// 	action: 'secret',
			// 	secret: localStorage.getItem('secret')
			// });
			// const {result} = await helpers.receive('secret');
			// if (result) {
			// 	console.log('Successfully logged in with secret');
			// } else {
			// 	console.log('Failed to log in with secret');
			// 	throw new Error('bad secret');
			// }

			// await helpers.receive('ready');
			const response = await fetch(`${httpURL}/check`, {
				headers: {
					Authorization: `Bearer ${localStorage.secret}`
				}
			});
			if (await response.text() === 'bad-secret') {
				console.log('Our secret is bad, logging in with Google instead.');
				throw new Error('bad-secret');
			} else {
				console.log(await response.json());
			}
		} else {
			throw new Error('no-secret');
		}
	} catch (_) {
		await helpers.connect(wsURL);
		console.log('Logging in with Google');
		await helpers.send({
			action: 'google'
		});
		const google = await helpers.receive('login');
		$('#login-anchor').attr('href', google.url);
		$('#login-prompt').modal({closable: false}).modal('show');
		await helpers.receive('ready');
		$('#login-prompt').modal('hide');
		await helpers.send({action: 'secret'});
		const {secret} = await helpers.receive('secret');
		localStorage.setItem('secret', secret);
	}
});
