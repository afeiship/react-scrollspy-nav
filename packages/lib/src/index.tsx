// import noop from '@jswork/noop';
import cx from 'classnames';
import React, {ReactNode, Component, HTMLAttributes} from "react";
import ReactList, {TemplateArgs} from '@jswork/react-list';

const CLASS_NAME = "react-scrollspy-nav";
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
  template?: (args: TemplateArgs) => ReactNode;
  /**
   * The reverse flag for navigation and children.
   */
  reverse?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export default class ReactScrollspyNav extends Component<ReactScrollspyNavProps> {
  static displayName = CLASS_NAME;
  static version = "__VERSION__";
  static defaultProps = {
    items: [],
  };

  get children() {
    const {children, reverse, items, navClassName, template} = this.props;
    const views = [
      <ReactList as="div" className={cx(`${CLASS_NAME}__nav`, navClassName)} items={items} template={template}/>,
      children
    ];
    return reverse ? views.reverse() : views;
  }

  render() {
    const {className, children, items, template, navClassName, reverse, ...rest} = this.props;
    return (
      <div data-component={CLASS_NAME} className={cx(CLASS_NAME, className)} {...rest}>
        {this.children}
      </div>
    );
  }
}
