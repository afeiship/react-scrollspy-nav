const throttle = (fn: Function, wait: number = 100) => {
  let timeout = 0;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(context, args);
    }, wait);
  };
};

export interface ScrolledEventOptions {
  interval?: number;
  element?: HTMLElement | Window;
}

export interface Destroyable {
  destroy(): void;
}

const defaultOptions: ScrolledEventOptions = {
  interval: 20,
  element: window,
};

class ScrolledEvent {
  static on(inCallback: (event: Event) => void, inOptions?: ScrolledEventOptions): Destroyable {
    const { element, interval } = { ...defaultOptions, ...inOptions };
    const handleScroll = throttle(inCallback, interval);
    element?.addEventListener('scroll', handleScroll);
    return {
      destroy() {
        element?.removeEventListener('scroll', handleScroll);
      },
    };
  }
}

export default ScrolledEvent;
