import cx from 'classnames';
import React, { ReactNode, Component, HTMLAttributes } from 'react';

const throttle = (func, wait) => {
  let timeout;
  return function () {
    const context = null;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
};

const CLASS_NAME = 'react-scrollspy-nav';

export type ReactScrollspyNavProps = {
  /**
   * The extended className for component.
   * @default ''
   */
  className?: string;
  /**
   * The className for nav element.
   * @default ''
   */
  navClassName?: string;
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
    items: [],
    offset: 0,
  };

  constructor(props: ReactScrollspyNavProps) {
    super(props);
    this.state = { activeIndex: 0 };
    this.handleScroll = throttle(this.handleScroll, 10);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
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

  private scrollTo(element: HTMLElement) {
    const { offset } = this.props;
    const navElement = document.querySelector(`.${CLASS_NAME}__nav`);
    const topOfElement =
      window.scrollY + element.getBoundingClientRect().top - navElement!.clientHeight - offset!;
    window.scrollTo({ top: topOfElement, behavior: 'smooth' });
  }

  render() {
    const { className, children, items, navClassName, offset, ...rest } = this.props;
    return (
      <div data-component={CLASS_NAME} className={cx(CLASS_NAME, className)} {...rest}>
        <ul className={cx(navClassName, `${CLASS_NAME}__nav`)}>
          {items.map((item, index) => {
            return (
              <li
                className={cx(`${CLASS_NAME}__item`, {
                  'text-red-500': index === this.state.activeIndex,
                })}
                key={index}
                onClick={() => this.scrollTo(document.getElementById(item.value)!)}>
                <a>{item.label}</a>
              </li>
            );
          })}
        </ul>
        {children}
      </div>
    );
  }
}
