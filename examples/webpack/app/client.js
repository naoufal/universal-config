import React from 'react';
import config from 'universal-config';
import VariableList from './components/VariableList.jsx';

window.onload = () => {
  let clientVars = React.createElement(VariableList);
  React.render(clientVars, document.getElementById('client-variables'));

  console.log(`Looking for this? ${window.location.href}js/main.js`);
}
