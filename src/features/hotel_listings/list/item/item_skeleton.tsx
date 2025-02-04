import styles from "./item_skeleton.module.css";

type ItemSkeletonProps = {
  image: React.ReactNode;
  imageLabel?: React.ReactNode;
  title: React.ReactNode;
  address: React.ReactNode;
  rating: React.ReactNode;
  room: React.ReactNode;
  promotion: React.ReactNode;
  // We don't pass a loader in for the price,
  // so it is optional.
  price?: React.ReactNode;
  savings?: React.ReactNode;
  priceLabel: React.ReactNode;
};

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
      <div className={styles.image}>{image}</div>
      {imageLabel != null ? (
        <div className={styles.imageLabel}>{imageLabel}</div>
      ) : undefined}
    </div>
    <div className={styles.content}>
      <div className={styles.upper}>
        <div className={styles.titleAndRatingContainer}>
          <div className={styles.title}>{title}</div>
          <div className={styles.rating}>{rating}</div>
        </div>
        <div className={styles.address}>{address}</div>
      </div>
      <div className={styles.lower}>
        <div className={styles.roomAndPromotionContainer}>
          <div className={styles.room}>{room}</div>
          <div className={styles.promotion}>{promotion}</div>
        </div>
        {price != null ? (
          <div className={styles.pricingContainer}>
            <div className={styles.priceLabel}>{priceLabel}</div>
            <div className={styles.price}>{price}</div>
            {savings && <div className={styles.savings}>{savings}</div>}
          </div>
        ) : undefined}
      </div>
    </div>
  </div>
);
