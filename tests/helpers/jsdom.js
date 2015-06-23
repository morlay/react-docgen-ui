import { jsdom } from 'jsdom';

global.document = jsdom('<html><body></body></html>');
global.window = global.document.parentWindow;
global.navigator = window.navigator || {};
