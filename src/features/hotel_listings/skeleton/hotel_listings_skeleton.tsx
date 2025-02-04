import styles from './hotel_listings_skeleton.module.css';

type HotelListingsSkeletonProps = {
  // todo(josh): when we have more pages, pull the logo out
  // into a layout that applies to them all.
  logo: React.ReactNode;
  topLeft: React.ReactNode
  topRight: React.ReactNode
  content: React.ReactNode
}

export const HotelListingsSkeleton = ({ logo, topLeft, topRight, content }: HotelListingsSkeletonProps) => (
  <div className={styles.container}>
    <div className={styles.logo}>
      { logo }
    </div>
    <div className={styles.top}>
      { topLeft }
      { topRight }
    </div>
    { content }
  </div>
);
