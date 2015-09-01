import React from 'react';
import config from 'universal-config';

export default class VariableList extends React.Component {
  renderChildren() {
    var listItems = Object.keys(config._store).map(key => {
      var value = config._store[key];

      if (typeof value === 'object') {
        value = JSON.stringify(value);
      }

      return (
        <li key={key}><strong>{key}: </strong>{value}</li>
      );
    });

    return listItems;
  }

  render() {
    return (
      <div className="variable-list">
        <h3 className="variable-list__heading">
          {config._env} Variables
        </h3>
        <ul>
          {this.renderChildren()}
        </ul>
      </div>
    );
  }
}
