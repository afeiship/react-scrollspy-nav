import React, { HTMLAttributes } from 'react';
import cx from 'classnames';

const CLASS_NAME = 'react-component-library';

export type IProps = {
  /**
   * Additional CSS class names to apply to the component.
   * @default ''
   */
  className?: string;
  /**
   * The content of the component.
   * @default null
   */
  children?: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export default function ReactScrollSpyNav(props: IProps) {
  const { className, ...rest } = props;
  return <div data-component={CLASS_NAME} className={cx(CLASS_NAME, className)} {...rest} />;
}
