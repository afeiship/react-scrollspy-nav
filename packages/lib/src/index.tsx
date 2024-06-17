// import noop from '@jswork/noop';
import cx from 'classnames';
import React, { ReactNode, Component, HTMLAttributes } from 'react';
// import { flushSync } from 'react-dom';

// import ReactList, {TemplateArgs} from '@jswork/react-list';

const CLASS_NAME = 'react-scrollspy-nav';
// const uuid = () => Math.random().toString(36).substring(2, 9);
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
   * The template function for rendering items.
   * @param args
   */
  // template?: (args: TemplateArgs) => ReactNode;
  /**
   * The reverse flag for navigation and children.
   */
  reverse?: boolean;
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
    offset: 10,
  };

  private ticking = false;
  state = { activeIndex: 0 };

  constructor(props: ReactScrollspyNavProps) {
    super(props);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        const elNav = document.querySelector(`.${CLASS_NAME}__nav`);
        const elItems = document.querySelectorAll(`[data-spy-id]`);
        if (!elNav || !elItems) return;
        const bound = elNav.scrollTop;
        const items = Array.from(elItems).map((el) => {
          return Math.abs(el.getBoundingClientRect().top - bound);
        });
        const min = Math.min(...items);
        const activeIndex = items.indexOf(min);
        console.log('activeIndex:', activeIndex);
        // Can't call setState on a component that is not yet mounted.
        // This is a no-op, but it might indicate a bug in your application.
        // Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the react-scrollspy-nav component.
        this.setState({ activeIndex });
        this.ticking = false;
      });
      this.ticking = true;
    }
  };

  private scrollTo(element: HTMLElement) {
    const topOfElement = window.scrollY + element.getBoundingClientRect().top - 60;
    window.scrollTo({ top: topOfElement, behavior: 'smooth' });
  }

  render() {
    const { className, children, items, navClassName, reverse, ...rest } = this.props;
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
