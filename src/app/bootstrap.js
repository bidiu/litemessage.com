import './bootstrap/rxjsOperators';

// load polyfills
import 'core-js/fn/array/includes';
import 'core-js/fn/object/values';
import 'core-js/fn/object/entries';
import 'whatwg-fetch';
import 'promise-polyfill/src/polyfill';
import ElementQueries from 'css-element-queries/src/ElementQueries';
ElementQueries.listen();
