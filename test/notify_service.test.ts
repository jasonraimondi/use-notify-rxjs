import { NotifyService, NotifyType } from "../src";
import { advanceBy } from "jest-date-mock";

jest.useFakeTimers();

describe(NotifyService, () => {
  let notifyService: NotifyService;

  beforeEach(() => {
    notifyService = new NotifyService();
  });

  it("initializes with no notifications", () => {
    expect(notifyService.messageList$.value).toEqual({});
  });

  it("allows duplicate notifications by default", () => {
    const message = "I am info";
    const title = "This is my title";

    notifyService.info({ message, title });
    advanceBy(100);
    notifyService.info({ message, title });
    advanceBy(100);
    notifyService.success(message);
    advanceBy(100);
    notifyService.success(message);

    expect(Object.keys(notifyService.messageList$.value)).toHaveLength(4);
    const [one, _, three] = Object.values(notifyService.messageList$.value);
    expect(one.title).toBe(title)
    expect(three.title).toBeUndefined();
  });

  it("setting suppressDuplicates blocks duplicate notifications ", () => {
    const message = "I am info";
    const title = "This is my title";

    notifyService.setOptions({ suppressDuplicates: true });

    notifyService.info({ message, title });
    advanceBy(100);
    notifyService.info({ message, title });
    advanceBy(100);
    notifyService.success(message);
    advanceBy(100);
    notifyService.success(message);

    expect(Object.keys(notifyService.messageList$.value)).toHaveLength(2);
    const [one, two] = Object.values(notifyService.messageList$.value);
    expect(one.title).toBe(title)
    expect(two.title).toBeUndefined();
  });

  it("sends multiple notifications in ascending order", () => {
    const message = "I am info";
    const title = "This is my title";

    notifyService.info({ message, title });
    advanceBy(100); // advance time 100ms
    notifyService.success(message);
    advanceBy(100); // advance time 100ms
    notifyService.error(message);


    const notifyList = Object.values(notifyService.messageList$.value);
    expect(notifyList).toHaveLength(3);
    const [infoNotify, successNotify, errorNotify] = notifyList;
    expect(infoNotify.type).toEqual(NotifyType.Info.toString());
    expect(infoNotify.isSuccess).toEqual(false);
    expect(infoNotify.isInfo).toEqual(true);
    expect(infoNotify.isError).toEqual(false);
    expect(infoNotify.message).toEqual(message);
    expect(infoNotify.title).toEqual(title);

    expect(successNotify.type).toEqual(NotifyType.Success.toString());
    expect(successNotify.isSuccess).toEqual(true);
    expect(successNotify.isInfo).toEqual(false);
    expect(successNotify.isError).toEqual(false);
    expect(successNotify.message).toEqual(message);
    expect(successNotify.title).toBeUndefined();

    expect(errorNotify.type).toEqual(NotifyType.Error.toString());
    expect(errorNotify.isSuccess).toEqual(false);
    expect(errorNotify.isInfo).toEqual(false);
    expect(errorNotify.isError).toEqual(true);
    expect(errorNotify.message).toEqual(message);
    expect(errorNotify.title).toBeUndefined();

    jest.advanceTimersByTime(10000);
    expect(Object.keys(notifyService.messageList$.value)).toHaveLength(0);
  });
});
