import fs from 'fs';
import React from 'react';
import config from 'universal-config';
import VariableList from './components/VariableList.jsx';
import { setupServer, writeFile } from '../../shared/utils';

const PORT = config.get('PORT') || 3000;

const serverVars = React.createElement(VariableList);
const serverVariables = React.renderToStaticMarkup(serverVars);
const JS = fs.readFileSync(`${__dirname}/dist/main.js`).toString();
const CSS = fs.readFileSync(`${__dirname}/../../shared/assets/css/styles.css`)
  .toString();
const HTML = fs.readFileSync(`${__dirname}/index.html`)
  .toString()
  .replace('%{serverVariables}', serverVariables);

var app = setupServer(HTML, JS, CSS);

app.listen(PORT, () => console.log('Server started on port', PORT));
