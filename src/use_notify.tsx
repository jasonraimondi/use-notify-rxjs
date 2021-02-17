import React, { createContext, useContext, useEffect, useState } from "react";

import { Notify, NotifyList, notifyService } from "./notify_service";

// @ts-ignore
const NotificationContext = createContext<UseNotify>();

type State = {
  notifications: NotifyList;
}

function NotifyProvider(props: any) {
  const [state, setState] = useState<State>({ notifications: [] })

  useEffect(() => {
    notifyService.messageList$.subscribe((messages) => {
      const notifications = messages ? Object.values(messages) : [];
      console.log({ messages, notifications })
      setState({ notifications });
    });

    return () => {
      notifyService.messageList$.unsubscribe();
    }
  }, [])

  return <NotificationContext.Provider value={{
    notifications: state.notifications,
    clear: (id?: number) => notifyService.clear(id),
    success: (message: string) => notifyService.success(message),
    info: (message: string) => notifyService.info(message),
    error: (message: string) => notifyService.error(message),
  }} {...props} />;
}

type UseNotify = {
  notifications: Notify[];
  clear(id?: number): void;
  success(message: string): void;
  info(message: string): void;
  error(message: string): void;
};

const useNotify = () => useContext<UseNotify>(NotificationContext);

export { NotifyProvider, useNotify };
