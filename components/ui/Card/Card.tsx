import styles from './card.module.scss';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  color?: 'white' | 'gray' | 'orange' | 'yellow' | 'pink';
  outline?: 'none' | 'solid' | 'dashed';
}

export const Card = ({
  children,
  className,
  color="white",
  outline="none",
  ...rest
}: CardProps) => {
  return (
    <div
      className={styles.card + ' ' + className}
      data-color={color}
      data-outline={outline}
      {...rest}
      >
      {children}
    </div>
  );
}



/*
 * Card Group
 */
export interface CardGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode
}
Card.Group = ({
  children,
  className='',
  ...rest
}: CardGroupProps) => {
  return (
    <div className={styles.cardGroup + ' ' + className} {...rest}>
      {children}
    </div>
  );
}