import "react-app-polyfill/ie11";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { NotifyProvider, notifyService, useNotify } from "../src";


function Example() {
  const { notifications, success, info, error, clear } = useNotify();

  return <section>
    <article>
      <button onClick={() => success({ message: "This is a success notification", title: "Congrats!", ttl: 2000 })}>Add Success</button>
      <button onClick={() => info({ message: "This is an info notification", ttl: 10000 })}>Add Info</button>
      <button onClick={() => error("This is an error notification")}>Add Error</button>
    </article>
    <article>
      <ul style={{ fontSize: 20 }}>
        {notifications.map(note =>
          <li key={note.id}>
            <h3>{note.title}</h3>
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
