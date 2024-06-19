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
  cb: () => void,
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
   * The container element for spy.
   * @default null
   */
  useRoot?: boolean
  /**
   * The children element.
   */
  children?: ReactNode;
  /**
   * The header element.
   */
  header?: ReactNode;
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
    container: null,
  };

  private rootRef: React.RefObject<HTMLDivElement> = React.createRef();
  private scrolledEvent: any | null = null;

  get spyElements() {
    return document.querySelectorAll(`[data-spy-id]`) as NodeListOf<HTMLElement>;
  }

  get container() {
    const { useRoot } = this.props;
    if (!useRoot) return document.querySelector('html') as HTMLElement;
    return this.rootRef.current;
  }

  get scrollContainer() {
    const { useRoot } = this.props;
    if (!useRoot) return window;
    return this.rootRef.current;
  }

  constructor(props: ReactScrollspyNavProps) {
    super(props);
    const { id } = props;
    const activeIndex = Storage.get(id!);
    this.state = { activeIndex };
  }

  initEvents = () => {
    this.scrolledEvent?.destroy();
    this.scrolledEvent = ScrolledEvent.on(this.handleScroll, { element: this.scrollContainer! });
  };

  componentDidUpdate(prevProps: Readonly<ReactScrollspyNavProps>) {
    if (prevProps.useRoot !== this.props.useRoot) {
      this.initEvents();
    }
  }

  componentDidMount() {
    this.initEvents();
  }

  componentWillUnmount() {
    this.scrolledEvent?.destroy();
  }

  handleScroll = () => {
    const { id, offset } = this.props;
    const elNav = this.container!.querySelector(`.${CLASS_NAME}__nav`);
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
    const navElement = this.container!.querySelector(`.${CLASS_NAME}__nav`);
    const elementRect = element.getBoundingClientRect();
    const navRect = navElement!.getBoundingClientRect();
    const topOfElement = this.container!.scrollTop + elementRect.top - navRect.bottom - offset!;
    this.container!.scrollTo({ top: topOfElement, behavior: 'smooth' });
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
    const {
      className,
      header,
      children,
      items,
      template,
      navClassName,
      offset,
      useRoot,
      ...rest
    } =
      this.props;
    return (
      <div
        ref={this.rootRef}
        data-component={CLASS_NAME}
        className={cx(CLASS_NAME, className)}
        {...rest}>
        {header}
        <nav className={cx(navClassName, `${CLASS_NAME}__nav`)}>
          <ReactList items={items} template={this.handleTemplate} />
        </nav>
        {children}
      </div>
    );
  }
}
