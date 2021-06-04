const Enzyme = require('enzyme');
const EnzymeAdapter = require('enzyme-adapter-react-16');
const { JSDOM } = require('jsdom');

// Setup enzyme's react adapter
Enzyme.configure({ adapter: new EnzymeAdapter() });


