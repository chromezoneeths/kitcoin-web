# kitcoin-web
Source code for Kitcoin's frontend

## How to deploy
* Run `npm install`
* Run `npm run-script build`
* The root directory of your webserver should point towards `./build`, with at least `/oauthinfo` proxied to your kitcoin instance.

## How to develop
* Run `docker-compose up --build`
* Visit `http://127.0.0.1:8000` in your web browser. Errors will appear, this is not a bug.
* Use your browser's debugger to write to `window.localStorage.overrideURL`. This should be the URL of your local Kitcoin instance; probably `ws://127.0.0.1:9876`.
* Refresh the page, and it should prompt you to log in. Your pop-up blocker might complain, though.
