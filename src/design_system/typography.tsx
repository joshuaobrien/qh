import styles from './typography.module.css';
import classNames from 'classnames';
import { PropsWithChildren } from "react";

type TypographyProps = {
  color?: 'red' | 'green' | 'black' | 'grey'
  isBold?: boolean
}

export const Title = ({ children, color = 'black'}: PropsWithChildren<TypographyProps>) => (
  <h2 className={classNames(styles.large, styles.semibold, styles.truncate)} style={{ color }}>
    {children}
  </h2>
)

export const Subtitle = ({ children, color = 'black'}: PropsWithChildren<TypographyProps>) => (
  <h3 className={classNames(styles.normal, styles.regular, styles.truncate)} style={{ color }}>
    {children}
  </h3>
)

export const Body = ({ children, isBold, color = 'black'}: PropsWithChildren<TypographyProps>) => (
  <span className={classNames(styles.normal, isBold ? styles.semibold : styles.regular, styles.truncate)} style={{ color }}>
    { children }
  </span>
)

export const Emphasis = ({ children, color = 'black'}: PropsWithChildren<TypographyProps>) => (
  <span className={classNames(styles.extraLarge, styles.regular, styles.truncate)} style={{ color }}>
    { children }
  </span>
)
