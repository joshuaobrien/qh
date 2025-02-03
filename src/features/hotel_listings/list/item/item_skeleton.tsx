import styles from './item_skeleton.module.css';

type ItemSkeletonProps = {
  image: React.ReactNode;
  imageLabel: React.ReactNode;
  title: React.ReactNode;
  address: React.ReactNode;
  rating: React.ReactNode;
  room: React.ReactNode;
  promotion: React.ReactNode;
  price: React.ReactNode;
  savings?: React.ReactNode;
  priceLabel: React.ReactNode;
}

export const ItemSkeleton = ({
  image,
  imageLabel,
  title,
  address,
  rating,
  room,
  promotion,
  price,
  savings,
  priceLabel,
}: ItemSkeletonProps) => (
  <div className={styles.card}>
    <div className={styles.imageContainer}>
      <div className={styles.image}>
        { image }
      </div>
      <div className={styles.imageLabel}>
        { imageLabel }
      </div>
    </div>
    <div className={styles.content}>
      <div className={styles.title}>
        { title }
      </div>
      <div className={styles.address}>
        { address }
      </div>
      <div className={styles.rating}>
        { rating }
      </div>
      <div className={styles.room}>
        { room }
      </div>
      <div className={styles.promotion}>
        { promotion }
      </div>
      <div className={styles.price}>
        { price }
      </div>
      { savings && <div className={styles.savings}>
        { savings }
      </div> }
      <div className={styles.priceLabel}>
        { priceLabel }
      </div>
    </div>
  </div>
);
