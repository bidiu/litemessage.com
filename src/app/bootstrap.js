import './bootstrap/rxjsOperators';

// load polyfills
import 'core-js/fn/array/includes';
import 'core-js/fn/object/values';
import 'core-js/fn/object/entries';
import 'whatwg-fetch';
import 'promise-polyfill/src/polyfill';

// load some libraries
import ElementQueries from 'css-element-queries/src/ElementQueries';
import AOS from 'aos';
import 'aos/dist/aos.css';

// initialize libraries
ElementQueries.listen();
AOS.init({
  once: true,
  duration: 300
});
