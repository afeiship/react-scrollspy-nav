import cx from 'classnames';
import React, { ReactNode, Component, HTMLAttributes } from 'react';
import ReactList, { TemplateArgs } from '@jswork/react-list';
import ScrolledEvent from '@jswork/scrolled-event';

const CLASS_NAME = 'react-scrollspy-nav';
const Storage = {
  getKey: (id: string) => [CLASS_NAME, id].filter(Boolean).join(':'),
  set: (id: string, value: number) => {
    const key = Storage.getKey(id);
    localStorage.setItem(key, value.toString());
  },
  get: (id: string) => {
    const key = Storage.getKey(id);
    return parseInt(localStorage.getItem(key) as string) || 0;
  },
};

export type ScrollspyTemplate = (
  args: Partial<TemplateArgs> & { active: boolean },
  cb: () => void
) => ReactNode;

export type ReactScrollspyNavProps = {
  id?: string;
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
   * The template function for rendering each item.
   */
  template: ScrollspyTemplate;
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
  static defaultProps = {
    id: '@',
    offset: 0,
    container: window,
  };

  private rootRef: React.RefObject<HTMLDivElement> = React.createRef();
  private scrolledEvent: any | null = null;

  get spyElements() {
    return document.querySelectorAll(`[data-spy-id]`) as NodeListOf<HTMLElement>;
  }

  constructor(props: ReactScrollspyNavProps) {
    super(props);
    const { id } = props;
    const activeIndex = Storage.get(id!);
    this.state = { activeIndex };
  }

  componentDidMount() {
    const { container } = this.props;
    this.scrolledEvent = ScrolledEvent.on(this.handleScroll, { element: container });
  }

  componentWillUnmount() {
    this.scrolledEvent?.destroy();
  }

  handleScroll = () => {
    const { id, offset } = this.props;
    const elNav = document.querySelector(`.${CLASS_NAME}__nav`);
    const elItems = document.querySelectorAll(`[data-spy-id]`);
    if (!elNav || !elItems) return;
    const bound = elNav.scrollTop;
    const items = Array.from(elItems).map((el) => {
      const elBound = el.getBoundingClientRect();
      return Math.abs(elBound.top - bound - offset!);
    });
    const min = Math.min(...items);
    const activeIndex = items.indexOf(min);
    this.setState({ activeIndex });
    Storage.set(id!, activeIndex);
  };

  scrollTo(element?: HTMLElement) {
    if (!element) return;
    const { offset } = this.props;
    const navElement = document.querySelector(`.${CLASS_NAME}__nav`);
    const elementRect = element.getBoundingClientRect();
    const topOfElement = window.scrollY + elementRect.top - navElement!.clientHeight - offset!;
    window.scrollTo({ top: topOfElement, behavior: 'smooth' });
  }

  handleTemplate = ({ item, index }) => {
    const { template } = this.props;
    const { activeIndex } = this.state;
    const active = index === activeIndex;
    const cb = () => {
      this.setState({ activeIndex: index });
      this.scrollTo(this.spyElements[index]);
    };
    return template({ item, index, active }, cb);
  };

  render() {
    const { className, children, items, template, navClassName, offset, container, ...rest } =
      this.props;
    return (
      <div
        ref={this.rootRef}
        data-component={CLASS_NAME}
        className={cx(CLASS_NAME, className)}
        {...rest}>
        <nav className={cx(navClassName, `${CLASS_NAME}__nav`)}>
          <ReactList items={items} template={this.handleTemplate} />
        </nav>
        {children}
      </div>
    );
  }
}
