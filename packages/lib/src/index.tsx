import cx from 'classnames';
import React, { ReactNode, Component, HTMLAttributes } from 'react';
import ScrolledEvent, { Destroyable } from './scrolled-event';

const CLASS_NAME = 'react-scrollspy-nav';

export type ReactScrollspyNavProps = {
  /**
   * The extended className for component.
   * @default ''
   */
  className?: string;
  /**
   * The className for active element.
   * @default 'is-active'
   */
  activeClassName?: string;
  /**
   * The className for nav element.
   * @default ''
   */
  navClassName?: string;
  /**
   * The className for nav item element.
   * @default ''
   */
  navItemClassName?: string;
  /**
   * The scroll container element.
   * @default window
   */
  container?: HTMLElement | Window;
  /**
   * The children element.
   */
  children?: ReactNode;
  /**
   * The items of spy navigation.
   */
  items: any[];
  /**
   * The offset for scroll spy.
   * @default 0
   */
  offset?: number;
} & HTMLAttributes<HTMLDivElement>;

export default class ReactScrollspyNav extends Component<ReactScrollspyNavProps, any> {
  static displayName = CLASS_NAME;
  static version = '__VERSION__';
  static defaultProps = {
    activeClassName: 'is-active',
    items: [],
    offset: 0,
    container: window,
  };

  private rootRef: React.RefObject<HTMLDivElement> = React.createRef();
  private scrolledEvent: Destroyable | null = null;

  get spyElements() {
    return document.querySelectorAll(`[data-spy-id]`) as NodeListOf<HTMLElement>;
  }

  constructor(props: ReactScrollspyNavProps) {
    super(props);
    this.state = { activeIndex: 0 };
  }

  componentDidMount() {
    const { container } = this.props;
    this.scrolledEvent = ScrolledEvent.on(this.handleScroll, { interval: 20, element: container });
  }

  componentWillUnmount() {
    this.scrolledEvent?.destroy();
  }

  handleScroll = () => {
    const { offset } = this.props;
    const elNav = document.querySelector(`.${CLASS_NAME}__nav`);
    const elItems = document.querySelectorAll(`[data-spy-id]`);
    if (!elNav || !elItems) return;
    const bound = elNav.scrollTop;
    const items = Array.from(elItems).map((el) => {
      return Math.abs(el.getBoundingClientRect().top - bound - offset!);
    });
    const min = Math.min(...items);
    const activeIndex = items.indexOf(min);
    this.setState({ activeIndex });
  };

  private scrollTo(element?: HTMLElement) {
    if (!element) return;
    const { offset } = this.props;
    const navElement = document.querySelector(`.${CLASS_NAME}__nav`);
    const topOfElement =
      window.scrollY + element.getBoundingClientRect().top - navElement!.clientHeight - offset!;
    window.scrollTo({ top: topOfElement, behavior: 'smooth' });
  }

  render() {
    const {
      className,
      children,
      items,
      activeClassName,
      navClassName,
      navItemClassName,
      offset,
      ...rest
    } = this.props;
    return (
      <div
        ref={this.rootRef}
        data-component={CLASS_NAME}
        className={cx(CLASS_NAME, className)}
        {...rest}>
        <ul className={cx(navClassName, `${CLASS_NAME}__nav`)}>
          {items.map((item, index) => {
            return (
              <li
                className={cx(`${CLASS_NAME}__item`, navItemClassName, {
                  [activeClassName!]: index === this.state.activeIndex,
                })}
                key={index}
                onClick={() => {
                  const els = this.spyElements;
                  return this.scrollTo(els[index]);
                }}>
                {item.label}
              </li>
            );
          })}
        </ul>
        {children}
      </div>
    );
  }
}
