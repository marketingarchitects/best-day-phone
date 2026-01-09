'use client'
import React, { Children } from 'react';
import styles from './button.module.scss';

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  className?: string;
  href?: string;
  onClick?: (...args: any[]) => any;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'outline' | 'green' | 'ghost';
}

export const Button = ({
  children,
  className,
  href,
  onClick,
  size,
  variant="primary",
  ...rest
}: ButtonProps) => {



  /*----------------------------------------*/
  /* Render Functions
  /*----------------------------------------*/

  // Wrap string-only children in a span so they can be targeted by styles
  const renderChildren = Children.map(children, child => {
    if (typeof child === 'string') {
      return <span className={styles.buttonText}>{child}</span>; // Wrap the string in a span
    }
    return child; // Return non-string children as is
  });

  return React.createElement(
    !!href ? 'a' : 'button',
    {
      className: styles.button + ' ' + className,
      'data-size': size,
      'data-variant': variant,
      onClick: onClick,
      ...rest
    },
    (
      <div className={styles.buttonContent}>
        {renderChildren}
      </div>
    )
  );
}