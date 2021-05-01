# `useNotify`

[![CI](https://github.com/jasonraimondi/use-notify-rxjs/workflows/CI/badge.svg)](https://github.com/jasonraimondi/use-notify-rxjs)

Simple, design-free toast notifications with a single peer dependency: `rxjs`.

## Installation

```bash
npm install --save use-notify-rxjs
```

## Usage

```jsx
import { useNotify } from 'use-notify-rxjs';

function Demo() {
  const notify = useNotify();

  return (
  <>
    <div>
      <button onClick={() => notify.success({ message: "This is a success notification", title: "Congrats!", ttl: 2000 })}>Add Success</button>
      <button onClick={() => notify.info({ message: "This is an info notification", ttl: 10000 })}>Add Info</button>
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
  return <NotifyProvider supressDuplicates>
    <Demo />
  </NotifyProvider>;
}

ReactDOM.render(<App/>, document.getElementById("root"));
```

## Reference

```ts
const { notifications, success, info, error, clear } = useNotify();
```

- **`notifications`**_`: Notify[]`_ - list of notifications
- **`success`**_`: (message: string | NofityMessage) => void`_ - send success alert
- **`info`**_`: (message: string | NofityMessage) => void`_ - send info alert
- **`error`**_`: (message: string | NofityMessage) => void`_ - send error alert
- **`clear`**_`: (id?: number) => void`_ - clear single or all alerts

```ts
type Notify = {
  id: number;
  message: string;
  title?: string;
  type: NotifyType;
  isSuccess: boolean;
  isInfo: boolean;
  isError: boolean;
  ttl: number;
}

type NotifyMessage = {
  message: string;
  title?: string;
  ttl?: number; // override global ttl for individual message
}

enum NotifyType {
  Error = "error",
  Info = "info",
  Success = "success",
}
```

Provider Options:

```jsx
<NotifyProvider ttl={4500} supressDuplicates={true}>
  <Demo />
</NotifyProvider>
```

- **`ttl`**_`: number (optional, default: 4500)`_ - number of ms the notification should be kept alive
- **`supressDuplicates`**_`: boolean (optional, default: false)`_ - supress duplicate notifications by tracking notify history
