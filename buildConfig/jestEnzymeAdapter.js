const Enzyme = require('enzyme');
const EnzymeAdapter = require('enzyme-adapter-react-16');
const { JSDOM } = require('jsdom');
require('jest-fetch-mock').enableMocks()

// Setup enzyme's react adapter
Enzyme.configure({ adapter: new EnzymeAdapter() });


const jsdom = new JSDOM('<!doctype html><html><body><canvas #myCanvas width="500" height="300"></canvas></body></html>', {
    url: 'http://localhost/',
  });
const { window } = jsdom;

function copyProps(src, target) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target),
  });
}
jest.mock('react-chartjs-2', () => ({
    Line: () => null
  }));

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
global.requestAnimationFrame = function (callback) {
  return setTimeout(callback, 0);
};
global.cancelAnimationFrame = function (id) {
  clearTimeout(id);
};
copyProps(window, global);