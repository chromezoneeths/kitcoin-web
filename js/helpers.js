let ws;

export async function connect(url) {
	return new Promise((resolve, reject) => {
		ws = new WebSocket(url);
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
