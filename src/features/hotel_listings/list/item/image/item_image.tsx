import styles from "./item_image.module.css";

type ItemImageProps = {
  imageUrl: string;
  description: string;
};

export const ItemImage = ({ imageUrl, description }: ItemImageProps) => (
  <img className={styles.container} src={imageUrl} aria-label={description} />
);
