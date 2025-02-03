import styles from './item_image.module.css';

type ItemImageProps = {
  imageUrl: string;
}

export const ItemImage = ({ imageUrl }: ItemImageProps) => (
  <img
    className={styles.container}
    src={imageUrl}
  />
)
