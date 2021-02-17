# `useNotify`

Simple, design-free toast notifications.

## Usage

```jsx
import { useNotify } from 'use-notify-rxjs';

const Demo = () => {
  const notify = useNotify();

  return (
      <ul>
        {notify.notifications.map(note =>
          <li key={note.id}>
            <span>{note.message}</span> 
            <span onClick={() => clear(note.id)}>&times;</span>
          </li>
        )}
      </ul>
  );
};
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
