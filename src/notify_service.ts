import { BehaviorSubject } from 'rxjs';

export enum NotificationType {
  Error ='error',
  Info = 'info',
  Success = 'success',
}

export interface Notification {
  id: number;
  message: string;
  type: NotificationType;
  isSuccess: boolean;
  isInfo: boolean;
  isError: boolean;
}

export type NotificationList = Record<number, Notification>;

export type NotifySettings = {
  ttl: number;
};

export class NotifyService {
  public readonly messageList$ = new BehaviorSubject<NotificationList>({});

  private settings: NotifySettings = { ttl: 2750 };

  setOptions(customSettings: Partial<NotifySettings>) {
    this.settings = { ...this.settings, ...customSettings, }
  }

  success(message: string, ttl?: number) {
    this.flash(message, NotificationType.Success, ttl);
  }

  info(message: string, ttl?: number) {
    this.flash(message, NotificationType.Info, ttl);
  }

  error(message: string, ttl?: number) {
    this.flash(message, NotificationType.Error, ttl);
  }

  remove(id: number): void {
    const existing = this.messageList$.value;
    delete existing[id];
    this.messageList$.next(existing);
  }

  private flash(message: string, type: NotificationType, ttl?: number): void {
    ttl = ttl ?? this.settings.ttl;
    const id = Date.now();
    this.addMessageToList({
      id,
      message,
      type,
      isSuccess: type === NotificationType.Success,
      isInfo: type === NotificationType.Info,
      isError: type === NotificationType.Error,
    });
    setTimeout(() => this.remove(id), ttl);
  }

  private addMessageToList(message: Notification): void {
    const messageList = {
      ...this.messageList$.value,
      [message.id]: message,
    };
    this.messageList$.next(messageList);
  }
}

export const notifyService = new NotifyService();
