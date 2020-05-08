import * as helpers from './helpers.js';

$(async () => {
	$('#login-prompt').modal('hide');
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
			const response = await fetch('/api/check', {
				headers: {
					Authorization: localStorage.secret
				}
			});
			const txt = await response.text();
			// Console.log(txt);
			if (txt === 'bad-session') {
				throw new Error('bad-session');
			} else {
				console.log(JSON.parse(txt));
			}
		} else {
			console.log('We don\'t have a secret, logging in with Google instead');
			throw new Error('no-secret');
		}
	} catch (_) {
		console.log(`Secret login failed with ${_}`);
		console.log(_);
		await helpers.connect('api');
		console.log('Logging in with Google');
		await helpers.send({
			action: 'google'
		});
		const google = await helpers.receive('login');
		$('#login-anchor').attr('href', google.url);
		$('#login-prompt').modal({closable: false}).modal('show');
		window.userInfo = await helpers.receive('ready');
		await helpers.send({action: 'secret'});
		const {secret} = await helpers.receive('secret');
		localStorage.setItem('secret', secret);
		$('#login-prompt').modal('hide');
	}

	console.log('let\'s get going');
});
