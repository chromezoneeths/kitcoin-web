import lkc from 'libkitcoin';
window.lkc = lkc;
let loading = false;
const secret = {
	get() {
		return localStorage.getItem('secret');
	},
	set(tgt) {
		localStorage.setItem('secret', tgt);
	}
};
const path = localStorage.getItem('overrideURL') || `${window.location.protocol === 'https:' ? 'wss://' : 'ws://'}${window.location.host}/oauth`; // Oauth is the only path guaranteed to be forwarded to kitcoin.
(async () => {
	lkc.prepare(path, secret, () => {
		window.logged_in = true;
		lkc.secret().then(sec => localStorage.secret = sec);
	}, true);

	// Update the number
	setTimeout(updateCounts, 1000);
	async function updateCounts() {
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

	toggleLoading(true);

	$('#toggle-ring-button').on('click', () => toggleLoading());
})();

function toggleLoading(target) {
	loading = target || !loading;
	console.log(`${loading ? 'Starting' : 'Stopping'} loading`);

	if (loading) {
		$('#loading-ring').removeClass('returning').addClass('rotating');
	} else {
		$('#loading-ring').removeClass('rotating').addClass('returning');
	}
}
