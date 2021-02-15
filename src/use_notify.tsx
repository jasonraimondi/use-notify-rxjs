import React, { createContext, useContext, useEffect, useState } from "react";

import { NotificationList, notifyService } from "./notify_service";

// @ts-ignore
const NotificationContext = createContext<UseNotify>();

type State = {
  notifications: NotificationList;
}

function NotificationProvider(props: any) {
  const [state, setState] = useState<State>({ notifications: {} })

  useEffect(() => {
    notifyService.messageList$.subscribe((messages) => {
      setState({ notifications: Object.values(messages) });
    });

    return () => {
      notifyService.messageList$.unsubscribe();
    }
  }, [])

  return <NotificationContext.Provider value={{
    notifications: state.notifications,
    success: (message: string) => notifyService.success(message),
    info: (message: string) => notifyService.info(message),
    error: (message: string) => notifyService.error(message),
  }} {...props} />;
}

type UseNotify = {
  notifications: Notification[];
  success(message: string): void;
  info(message: string): void;
  error(message: string): void;
};

const useNotify = () => useContext<UseNotify>(NotificationContext);

export { NotificationProvider, useNotify };
