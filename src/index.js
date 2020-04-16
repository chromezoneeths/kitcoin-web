const lkc = require('libkitcoin');
window.lkc = lkc;
let secret = {
	get () { return localStorage.getItem('secret'); },
	set (tgt) { localStorage.setItem('secret', tgt); }
};
let path = localStorage.getItem("overrideURL") || `${window.location.protocol === "https:" ? 'wss://' : 'ws://'}${window.location.hostname}/oauthinfo`; // oauthinfo is the only path guaranteed to be forwarded to kitcoin
(async () => {
	lkc.prepare(path, secret, () => {
		window.logged_in = true;
		lkc.secret().then(sec => localStorage.secret = sec);
	}, true);
})();