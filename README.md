# `useNotify`

Simple, design-free toast notifications with a single peer dependency: `rxjs`.

## Usage

```jsx
import { useNotify } from 'use-notify-rxjs';

function Demo() {
  const notify = useNotify();

  return (
  <>
    <div>
      <button onClick={() => notify.success("This is a success notification")}>Add Success</button>
      <button onClick={() => notify.info("This is an info notification")}>Add Info</button>
      <button onClick={() => notify.error("This is an error notification")}>Add Error</button>
    </div>
    <ul>
      {notify.notifications.map(note =>
        <li key={note.id} className={note.type}>
          <span>{note.message}</span> 
          <span onClick={() => clear(note.id)}>&times;</span>
        </li>
      )}
    </ul>
  </>
  );
}
```

```jsx
function App() {
  return <NotifyProvider>
    <Demo />
  </NotifyProvider>;
}

ReactDOM.render(<App/>, document.getElementById("root"));
```

## Reference

```ts
const { notifications, success, info, error, clear } = useNotify();
```
- **`notifications`**_`: Notification[]`_ - list of notifications
- **`success`**_`: (message: string) => void`_ - send success alert
- **`info`**_`: (message: string) => void`_ - send info alert
- **`error`**_`: (message: string) => void`_ - send error alert
- **`clear`**_`: (id?: number) => void`_ - clear single or all alerts

```jsx
<NotifyProvider ttl={4500}>
  <Demo />
</NotifyProvider>
```

- **`ttl`**_`: number (optional, default: 4500)`_ - number of ms the notification should be kept alive
