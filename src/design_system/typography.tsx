import classNames from "classnames";
import type { PropsWithChildren } from "react";
import styles from "./typography.module.css";

type TypographyProps = {
  color?: "red" | "green" | "black" | "grey";
  isBold?: boolean;
  isItalics?: boolean;
};

export const Title = ({
  children,
  color = "black",
}: PropsWithChildren<TypographyProps>) => (
  <h2
    className={classNames(styles.large, styles.semibold, styles.truncate)}
    style={{ color }}
  >
    {children}
  </h2>
);

export const Subtitle = ({
  children,
  color = "black",
}: PropsWithChildren<TypographyProps>) => (
  <h3
    className={classNames(styles.normal, styles.regular, styles.truncate)}
    style={{ color }}
  >
    {children}
  </h3>
);

export const Body = ({
  children,
  isBold,
  isItalics,
  color = "black",
}: PropsWithChildren<TypographyProps>) => (
  <span
    className={classNames(
      styles.normal,
      isItalics && styles.italics,
      isBold ? styles.semibold : styles.regular,
      styles.truncate,
    )}
    style={{ color }}
  >
    {children}
  </span>
);

export const Emphasis = ({
  children,
  color = "black",
}: PropsWithChildren<TypographyProps>) => (
  <span
    className={classNames(styles.extraLarge, styles.regular, styles.truncate)}
    style={{ color }}
  >
    {children}
  </span>
);
