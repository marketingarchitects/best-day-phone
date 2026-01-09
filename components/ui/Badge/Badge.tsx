'use client'
import React, { Children } from 'react';
import styles from './badge.module.scss';

export interface BadgeProps {
  children: React.ReactNode;
  color?: 'orange' | 'green' | 'white' | 'black' | 'ghost';
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  style?: React.CSSProperties;
}

export const Badge = ({
  children,
  color='orange',
  onClick,
  size='md',
  style
}: BadgeProps) => {

  // Wrap string-only children in a span so they can be targeted by styles
  const renderChildren = Children.map(children, child => {
    if (typeof child === 'string') {
      return <p>{child}</p>; // Wrap the string in a span
    }
    return child; // Return non-string children as is
  });

  return (
    <div
      className={`${styles.badge} ${!!onClick ? styles.interactive : ''}`}
      data-color={color}
      data-size={size}
      onClick={onClick}
      style={style}
      >
      {renderChildren}
    </div>
  );
}