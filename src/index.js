const lkc = require('libkitcoin');
window.lkc = lkc;
let loading = 0;
const secret = {
	get () {
		return localStorage.getItem('secret');
	},
	set (tgt) {
		localStorage.setItem('secret', tgt);
	}
};
const path = localStorage.getItem('overrideURL') || `${window.location.protocol === 'https:' ? 'wss://' : 'ws://'}${window.location.host}/oauth`; // Oauth is the only path guaranteed to be forwarded to kitcoin.
(async () => {
	startLoading()
	lkc.prepare(path, secret, () => {
		window.logged_in = true;
		stopLoading()
		lkc.secret().then(sec => localStorage.secret = sec);
	}, true);

	// Update the number
	setTimeout(updateCounts, 1000);
	async function updateCounts () {
		if (window.logged_in) {
			console.log('Trying to update kitcoin count...');
			const balance = await lkc.balance();
			$('#coin-count').html(balance);
			setTimeout(updateCounts, 60000);
		} else {
			console.log('Couldn\'t update since we\'re not logged in yet');
			setTimeout(updateCounts, 10);
		}
	}
})();

function startLoading () {
	loading++;
	console.log(`Now waiting for ${loading} tasks...`);
	if (loading === 1) {
		$("#loading-ring").addClass('rotating');
		$("#loading-ring").css("animation-duration", `${5 / loading}s`);
	} else {
		$("#loading-ring").unbind('animationiteration');
		$("#loading-ring").one('animationiteration', (e) => {
			$(e.target).removeClass('rotating');
			var elm = e.target;
			var elm2 = elm.cloneNode(true);
			elm.parentNode.replaceChild(elm2, elm);
			$(elm2).css("animation-duration", `${5 / loading}s`);
			$(elm2).addClass('rotating')
		});
	}
}

function stopLoading () {
	loading--;
	console.log(`Now waiting for ${loading} tasks...`);
	if (loading <= 0) {
		$("#loading-ring").unbind('animationiteration');
		$("#loading-ring").one('animationiteration', () => {
			$("#loading-ring").removeClass('rotating');
		});
	} else {
		$("#loading-ring").unbind('animationiteration');
		$("#loading-ring").one('animationiteration', (e) => {
			$(e.target).removeClass('rotating');
			var elm = e.target;
			var elm2 = elm.cloneNode(true);
			elm.parentNode.replaceChild(elm2, elm);
			$(elm2).css("animation-duration", `${5 / loading}s`);
			$(elm2).addClass('rotating')
		});
	}
}
