import styles from './hotel_listings_skeleton.module.css';

type HotelListingsSkeletonProps = {
  topLeft: React.ReactNode
  topRight: React.ReactNode
  content: React.ReactNode
}

export const HotelListingsSkeleton = ({topLeft, topRight, content }: HotelListingsSkeletonProps) => (
  <div className={styles.container}>
    <div className={styles.top}>
      { topLeft }
      { topRight }
    </div>
    { content }
  </div>
);
