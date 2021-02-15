import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { NotificationProvider, notifyService, useNotify } from "../src";

notifyService.setOptions({
  ttl: 6000,
})

function Example() {
  const notify = useNotify();

  return <section>
    <article>
      <pre><code>{JSON.stringify(notify.notifications, null, 2)}</code></pre>
    </article>
    <article>
      <button onClick={() => notify.success(`success at: ${Date.now()}`)}>Add Success</button>
      <button onClick={() => notify.info(`info at: ${Date.now()}`)}>Add Info</button>
      <button onClick={() => notify.error(`error at: ${Date.now()}`)}>Add Error</button>
    </article>
  </section>
}

function App() {
  return <NotificationProvider>
    <Example />
  </NotificationProvider>;
}

ReactDOM.render(<App />, document.getElementById('root'));
