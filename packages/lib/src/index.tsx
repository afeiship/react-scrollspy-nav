import cx from 'classnames';
import React, { ReactNode, Component, HTMLAttributes } from 'react';
import ScrolledEvent, { EventResponse } from '@jswork/scrolled-event';
import { ReactHarmonyEvents } from '@jswork/harmony-events';
import type { EventMittNamespace } from '@jswork/event-mitt';

const CLASS_NAME = 'react-scrollspy-nav';

export type ReactScrollspyNavProps = {
  /**
   * The unique id for component.
   */
  name?: string;
  /**
   * The scroll behavior.
   */
  behavior?: 'auto' | 'smooth' | 'instant';
  /**
   * Whether disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * The spy selector for spying.
   */
  spySelector?: string;
  /**
   * The extended className for component.
   * @default ''
   */
  className?: string;
  /**
   * The container element for spy.
   */
  containerElement?: HTMLElement | Window | null;
  /**
   * The nav element.
   * @param navRef
   */
  nav?: (navRef: React.RefObject<HTMLElement>, options: any) => ReactNode;
  /**
   * The children element.
   */
  children?: ReactNode;
  /**
   * The offset for scroll spy.
   * @default 0
   */
  offset?: number;
} & HTMLAttributes<HTMLDivElement>;

interface ReactScrollspyNavState {
  activeIndex: number;
}

export default class ReactScrollspyNav extends Component<
  ReactScrollspyNavProps,
  ReactScrollspyNavState
> {
  static displayName = CLASS_NAME;
  static version = '__VERSION__';
  static event: EventMittNamespace.EventMitt;
  static events = ['anchor'];
  static defaultProps = {
    name: '@',
    spySelector: '[data-spy-id]',
    offset: 0,
    behavior: 'smooth',
  };

  private rootRef: React.RefObject<HTMLDivElement> = React.createRef();
  private navRef: React.RefObject<HTMLDivElement> = React.createRef();
  private scrolledEvent: EventResponse | null = null;
  private harmonyEvents: ReactHarmonyEvents | null = null;

  get root() {
    return this.rootRef.current;
  }

  get containerPaddingTop() {
    if (!this.scrolledEvent!.target) return 0;
    return parseInt(window.getComputedStyle(this.scrolledEvent!.target)?.paddingTop) || 0;
  }

  get navTop() {
    if (!this.navRef.current) return 0;
    return parseInt(window.getComputedStyle(this.navRef.current!)?.top) || 0;
  }

  get spyElements() {
    const { spySelector } = this.props;
    return this.root?.querySelectorAll(spySelector!) as NodeListOf<HTMLElement>;
  }

  get container() {
    const { containerElement } = this.props;
    if (!containerElement) return window;
    return this.props.containerElement;
  }

  constructor(props: ReactScrollspyNavProps) {
    super(props);
    this.state = { activeIndex: 0 };
  }

  initEvents = () => {
    const { containerElement } = this.props;
    if (!containerElement) return;
    const element = this.container as HTMLElement;
    this.destroyEvents();
    this.scrolledEvent = ScrolledEvent.on(this.handleScroll, { element });
    this.harmonyEvents = ReactHarmonyEvents.create(this);
  };

  destroyEvents = () => {
    this.scrolledEvent?.destroy();
    this.harmonyEvents?.destroy();
  };

  componentDidMount() {
    this.initEvents();
  }

  componentDidUpdate(prevProps: Readonly<ReactScrollspyNavProps>) {
    const { containerElement } = this.props;
    if (containerElement !== prevProps.containerElement) {
      this.initEvents();
    }
  }

  componentWillUnmount() {
    this.destroyEvents();
  }

  handleScroll = () => {
    const { offset, disabled, spySelector } = this.props;
    const elNav = this.navRef.current;
    const elItems = this.root!.querySelectorAll(spySelector!);
    if (disabled) return;
    if (!elNav || !elItems) return;

    const bound = elNav.getBoundingClientRect();
    const items = Array.from(elItems).map((el) => {
      const elBound = el.getBoundingClientRect();
      return Math.abs(elBound.top - bound.top - offset!);
    });

    const min = Math.min(...items);
    const activeIndex = items.indexOf(min);
    this.setState({ activeIndex });
  };

  scrollTo = (element?: HTMLElement) => {
    if (!element) return;
    const { offset, disabled, behavior } = this.props;
    if (disabled) return;
    const styleTop = this.navTop + this.containerPaddingTop;
    const navOffset = styleTop + offset!;
    element.style.scrollMarginTop = navOffset + 'px';
    element.scrollIntoView({ behavior });
  };

  // ------- public methods for harmony events -------
  anchor(index: number) {
    this.setState({ activeIndex: index });
    this.scrollTo(this.spyElements[index]);
  }

  render() {
    const {
      className,
      name,
      behavior,
      disabled,
      nav,
      children,
      offset,
      containerElement,
      spySelector,
      ...rest
    } = this.props;

    const { activeIndex } = this.state;

    return (
      <section
        ref={this.rootRef}
        data-name={name}
        data-component={CLASS_NAME}
        className={cx(CLASS_NAME, className)}
        {...rest}>
        {nav && nav(this.navRef, { activeIndex })}
        {children}
      </section>
    );
  }
}
