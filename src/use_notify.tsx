import React, { createContext, useContext, useEffect, useState } from "react";

import { Notify, NotifyList, notifyService, NotifySettings } from "./notify_service";

// @ts-ignore
const NotificationContext = createContext<UseNotify>();

type State = {
  notifications: Notify[];
}

type NotifyProviderProps = Partial<NotifySettings> & { [key: string]: unknown };

function NotifyProvider({ ttl, ...props }: NotifyProviderProps) {
  const [state, setState] = useState<State>({ notifications: [] });

  useEffect(() => {
    if (ttl) notifyService.setOptions({ ttl });

    notifyService.messageList$.subscribe((messages: NotifyList) => {
      const notifications = messages ? Object.values(messages) : [];
      setState({ notifications });
    });

    return () => {
      notifyService.messageList$.unsubscribe();
    };
  }, []);

  return <NotificationContext.Provider value={{
    notifications: state.notifications,
    clear: (id?: number) => notifyService.clear(id),
    success: (message) => notifyService.success(message),
    info: (message) => notifyService.info(message),
    error: (message) => notifyService.error(message),
  }} {...props} />;
}

export type NotifyMessage = {
  message: string;
  title?: string;
};

type UseNotify = {
  notifications: Notify[];
  clear(id?: number): void;
  success(message: string | NotifyMessage): void;
  info(message: string | NotifyMessage): void;
  error(message: string | NotifyMessage): void;
};

const useNotify = () => useContext<UseNotify>(NotificationContext);

export { NotifyProvider, useNotify };
