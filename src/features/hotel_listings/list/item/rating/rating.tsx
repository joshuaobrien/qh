import { Circle } from "./circles/circle";
import { EmptyCircle } from "./circles/empty_circle";
import { HalfCircle } from "./circles/half_circle";
import { EmptyStar } from "./stars/empty_star";
import { HalfStar } from "./stars/half_star";
import { Star } from "./stars/star";
import styles from './rating.module.css';

type RatingProps = {
  rating: number,
  kind: 'star' | 'self',
}

const TOTAL_COUNT = 5;

const icons = {
  star: { Full: Star, Half: HalfStar, Empty: EmptyStar },
  self: { Full: Circle, Half: HalfCircle, Empty: EmptyCircle },
};

export const Rating = ({ rating, kind }: RatingProps) => {
  const fullCount = Math.floor(rating);
  const hasHalf = !Number.isInteger(rating)

  const { Full, Half, Empty } = icons[kind];

  const selectIcon = (position: number) => {
    if (position < fullCount) {
      return Full;
    }
    if (position === fullCount && hasHalf) {
      return Half;
    }
    return Empty;
  };

  return (
    <div className={styles.container}>
      {
        Array(TOTAL_COUNT).fill(undefined).map((_, i) => {
          const Icon = selectIcon(i)
          return <Icon key={i} />
        })
      }
    </div>
  )
}
