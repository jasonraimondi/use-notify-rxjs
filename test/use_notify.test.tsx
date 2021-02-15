import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { NotificationProvider } from "../src";

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<NotificationProvider />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
