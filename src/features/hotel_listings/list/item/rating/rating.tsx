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
  const clampedRating = Math.min(Math.max(rating, 0), TOTAL_COUNT);
  const fullCount = Math.floor(clampedRating);
  const hasHalf = !Number.isInteger(clampedRating)

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
    <div
      className={styles.container}
      role="img"
      aria-label={`Rating: ${clampedRating} out of ${TOTAL_COUNT}. (${kind === 'star' ? 'official rating' : 'self rated'})`}
    >
      {
        Array(TOTAL_COUNT).fill(undefined).map((_, i) => {
          const Icon = selectIcon(i)
          return (
            <span key={i} aria-hidden>
              <Icon key={i} />
            </span>
          )
        })
      }
    </div>
  )
}
