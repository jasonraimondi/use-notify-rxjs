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

  it("sends multiple notifications in ascending order", () => {
    const message = "I am info";


    notifyService.info(message);
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

    expect(successNotify.type).toEqual(NotifyType.Success.toString());
    expect(successNotify.isSuccess).toEqual(true);
    expect(successNotify.isInfo).toEqual(false);
    expect(successNotify.isError).toEqual(false);
    expect(successNotify.message).toEqual(message);

    expect(errorNotify.type).toEqual(NotifyType.Error.toString());
    expect(errorNotify.isSuccess).toEqual(false);
    expect(errorNotify.isInfo).toEqual(false);
    expect(errorNotify.isError).toEqual(true);
    expect(errorNotify.message).toEqual(message);

    jest.advanceTimersByTime(10000);
    expect(Object.keys(notifyService.messageList$.value)).toHaveLength(0);
  });
});
