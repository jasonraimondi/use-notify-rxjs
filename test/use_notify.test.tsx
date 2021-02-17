import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { NotifyProvider } from "../src";

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<NotifyProvider />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
