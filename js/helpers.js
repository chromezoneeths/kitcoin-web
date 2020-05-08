let ws;

export async function connect(url) {
	return new Promise((resolve, reject) => {
		const loc = window.location;
		let	NewUri;
		if (loc.protocol === 'https:') {
			NewUri = 'wss:';
		} else {
			NewUri = 'ws:';
		}

		NewUri += '//' + loc.host;
		NewUri += loc.pathname + url;
		ws = new WebSocket(NewUri);
		ws.addEventListener('open', resolve, {once: true});
		ws.addEventListener('error', reject, {once: true});
	});
}

export async function receive(action) {
	return new Promise(resolve => {
		function helper(event) {
			const message = JSON.parse(event.data);
			if (message.action === action) {
				resolve(message);
			} else {
				ws.addEventListener('message', helper, {once: true});
			}
		}

		ws.addEventListener('message', helper, {once: true});
	});
}

export async function send(message) {
	ws.send(JSON.stringify(message));
}
