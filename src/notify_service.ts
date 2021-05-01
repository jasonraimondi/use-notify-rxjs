import { BehaviorSubject } from "rxjs";
import { NotifyMessage } from "./use_notify";

export enum NotifyType {
  Error = "error",
  Info = "info",
  Success = "success",
}

export type Notify = {
  id: number;
  message: string;
  title?: string;
  type: NotifyType;
  isSuccess: boolean;
  isInfo: boolean;
  isError: boolean;
  ttl: number;
}

export type NotifyList = Record<number, Notify>;

export type NotifySettings = {
  ttl: number;
  suppressDuplicates: boolean;
};

export class NotifyService {
  private settings: NotifySettings = { ttl: 4500, suppressDuplicates: false };

  private history: Record<string, string> = {};

  private readonly CLEAR_STATE = {};

  public readonly messageList$ = new BehaviorSubject<NotifyList>(this.CLEAR_STATE);

  setOptions(customSettings: Partial<NotifySettings>) {
    this.settings = { ...this.settings, ...customSettings };
  }

  success(message: string | NotifyMessage) {
    this.flash(message, NotifyType.Success);
  }

  info(message: string | NotifyMessage) {
    this.flash(message, NotifyType.Info);
  }

  error(message: string | NotifyMessage) {
    this.flash(message, NotifyType.Error);
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

  private trackHistory({id, ...notify }: Notify): { isDuplicate: boolean } {
    const historyValues =  Object.values(this.history);
    const historyKeys =  Object.keys(this.history);
    const match = JSON.stringify(notify);
    const isDuplicate = historyValues.includes(match);

    if (!isDuplicate) {
      this.history[id] = match;
      setTimeout(() => void delete this.history[id], notify.ttl)
    }

    if (historyKeys.length >= 5) {
      const toDelete = historyKeys.shift();
      if (typeof toDelete === "string" && this.history.hasOwnProperty(toDelete)) {
        delete this.history[toDelete];
      }
    }

    return { isDuplicate }
  }

  private flash(message: string | NotifyMessage, type: NotifyType = NotifyType.Info): void {
    const id = Date.now();
    let title: string | undefined;
    let ttl = this.settings.ttl;

    if (typeof message !== "string") {
      title = message.title;
      ttl = message.ttl ?? ttl;
      message = message.message;
    }

    const notify = {
      id,
      message,
      title,
      type,
      ttl,
      isSuccess: type === NotifyType.Success,
      isInfo: type === NotifyType.Info,
      isError: type === NotifyType.Error,
    };

    let shouldAlert = true;

    if (this.settings.suppressDuplicates) {
      const { isDuplicate } = this.trackHistory(notify);
      shouldAlert = !isDuplicate;
    }

    if (shouldAlert) this.addMessageToList(notify);

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
