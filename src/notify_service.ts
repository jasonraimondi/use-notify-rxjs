import { BehaviorSubject } from 'rxjs';

export enum NotifyType {
  Error ='error',
  Info = 'info',
  Success = 'success',
}

export interface Notify {
  id: number;
  message: string;
  type: NotifyType;
  isSuccess: boolean;
  isInfo: boolean;
  isError: boolean;
}

export type NotifyList = Record<number, Notify>;

export type NotifySettings = {
  ttl: number;
};

export class NotifyService {
  private settings: NotifySettings = { ttl: 4500 };

  private readonly CLEAR_STATE = {};

  public readonly messageList$ = new BehaviorSubject<NotifyList>(this.CLEAR_STATE);

  setOptions(customSettings: Partial<NotifySettings>) {
    this.settings = { ...this.settings, ...customSettings, }
  }

  success(message: string, ttl?: number) {
    this.flash(message, NotifyType.Success, ttl);
  }

  info(message: string, ttl?: number) {
    this.flash(message, NotifyType.Info, ttl);
  }

  error(message: string, ttl?: number) {
    this.flash(message, NotifyType.Error, ttl);
  }

  clear(id?: number) {
    if (id) {
      this.remove(id);
    } else {
      this.messageList$.next(this.CLEAR_STATE);
    }
  }

  private remove(id: number): void {
    const existing = this.messageList$.value;
    if (existing.hasOwnProperty(id)) {
      delete existing[id];
      this.messageList$.next(existing);
    }
  }

  private flash(message: string, type: NotifyType, ttl?: number): void {
    ttl = ttl ?? this.settings.ttl;
    const id = Date.now();
    this.addMessageToList({
      id,
      message,
      type,
      isSuccess: type === NotifyType.Success,
      isInfo: type === NotifyType.Info,
      isError: type === NotifyType.Error,
    });
    setTimeout(() => this.remove(id), ttl);
  }

  private addMessageToList(message: Notify): void {
    const messageList = {
      ...this.messageList$.value,
      [message.id]: message,
    };
    this.messageList$.next(messageList);
  }
}

export const notifyService = new NotifyService();
