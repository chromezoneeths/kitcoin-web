import * as helpers from './helpers.js';

const url = localStorage.getItem('overrideURL') || `${window.location.protocol === 'https:' ? 'wss://' : 'ws://'}${window.location.host}/api`;

$(async () => {
	console.log('let\'s get goin');
	await helpers.connect(url);
	try {
		if (localStorage.secret.length > 30) {
			await helpers.send({
				action: 'secret',
				secret: localStorage.getItem('secret')
			});
			const {result} = await helpers.receive('secret');
			if (result) {
				console.log('Successfully logged in with secret');
			} else {
				console.log('Failed to log in with secret');
				throw new Error('bad secret');
			}

			await helpers.receive('ready');
		} else {
			throw new Error('no secret');
		}
	} catch (_) {
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
