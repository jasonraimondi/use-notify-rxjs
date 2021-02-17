import "react-app-polyfill/ie11";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { NotifyProvider, notifyService, useNotify } from "../src";


function Example() {
  const { notifications, success, info, error, clear } = useNotify();

  return <section>
    <article>
      <button onClick={() => success("This is a success notification")}>Add Success</button>
      <button onClick={() => info("This is an info notification")}>Add Info</button>
      <button onClick={() => error("This is an error notification")}>Add Error</button>
    </article>
    <article>
      <ul style={{ fontSize: 20 }}>
        {notifications.map(note =>
          <li key={note.id}>
            {note.message} <span onClick={() => clear(note.id)}>&times;</span>
          </li>
        )}
      </ul>
      <pre><code>{JSON.stringify(notifications, null, 2)}</code></pre>
    </article>
  </section>;
}

function App() {
  return <NotifyProvider>
    <Example/>
  </NotifyProvider>;
}

// optional: setting custom notification ttl
notifyService.setOptions({
  ttl: 4500, // default value is 4500ms
});

ReactDOM.render(<App/>, document.getElementById("root"));
