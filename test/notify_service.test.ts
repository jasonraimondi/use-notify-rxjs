import { NotifyService } from "../src";

describe(NotifyService, () => {
  it('initializes with no notifications', () => {
    const notifyService = new NotifyService();
    const foo = notifyService.messageList$.getValue();
    expect(foo).toEqual({});
  });

  it('can send info notification', () => {
    const notifyService = new NotifyService();
    const message = "I am info";

    notifyService.info(message);
    const notificationList = notifyService.messageList$.getValue();

    const [first] = Object.values(notificationList);
    expect(first.isSuccess).toEqual(false);
    expect(first.isInfo).toEqual(true);
    expect(first.isError).toEqual(false);
    expect(first.message).toEqual(message);
  });
});
