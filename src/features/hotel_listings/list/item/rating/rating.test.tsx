import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import { Rating } from "./rating";

describe("Rating", () => {
  afterEach(() => {
    cleanup();
  });

  const kinds = ["star", "self"] as const;

  const validCases = [
    { rating: 0, full: 0, half: 0, empty: 5 },
    { rating: 1, full: 1, half: 0, empty: 4 },
    { rating: 1.5, full: 1, half: 1, empty: 3 },
    { rating: 2, full: 2, half: 0, empty: 3 },
    { rating: 2.5, full: 2, half: 1, empty: 2 },
    { rating: 3, full: 3, half: 0, empty: 2 },
    { rating: 3.5, full: 3, half: 1, empty: 1 },
    { rating: 4, full: 4, half: 0, empty: 1 },
    { rating: 4.5, full: 4, half: 1, empty: 0 },
    { rating: 5, full: 5, half: 0, empty: 0 },
  ];

  it.each(kinds.flatMap(kind => validCases.map(c => ({ ...c, kind }))))(
    "renders correct icons and aria-label for rating=$rating and kind=$kind",
    ({ rating, kind, full, half, empty }) => {
      render(<Rating rating={rating} kind={kind} />);

      const iconPrefix = kind === "star" ? "star" : "circle";

      expect(screen.queryAllByTitle(`${iconPrefix}`)).toHaveLength(full);
      expect(screen.queryAllByTitle(`half ${iconPrefix}`)).toHaveLength(half);
      expect(screen.queryAllByTitle(`empty ${iconPrefix}`)).toHaveLength(empty);

      const expectedLabel = `Rating: ${rating} out of 5. (${kind === "star" ? "official rating" : "self rated"
        })`;

      expect(screen.getByRole("img").getAttribute("aria-label")).toBe(expectedLabel);
    }
  );

  const edgeCases = [
    { rating: -1, full: 0, half: 0, empty: 5 },
    { rating: -0.5, full: 0, half: 0, empty: 5 },
    { rating: 5.5, full: 5, half: 0, empty: 0 },
    { rating: 10, full: 5, half: 0, empty: 0 },
  ];

  it.each(kinds.flatMap(kind => edgeCases.map(c => ({ ...c, kind }))))(
    "handles edge cases correctly for rating=$rating and kind=$kind",
    ({ rating, kind, full, half, empty }) => {
      render(<Rating rating={rating} kind={kind} />);

      const iconPrefix = kind === "star" ? "star" : "circle";

      expect(screen.queryAllByTitle(`${iconPrefix}`)).toHaveLength(full);
      expect(screen.queryAllByTitle(`half ${iconPrefix}`)).toHaveLength(half);
      expect(screen.queryAllByTitle(`empty ${iconPrefix}`)).toHaveLength(empty);

      const clampedRating = Math.min(Math.max(rating, 0), 5);

      const expectedLabel = `Rating: ${clampedRating} out of 5. (${kind === "star" ? "official rating" : "self rated"
        })`;

      expect(screen.getByRole("img").getAttribute("aria-label")).toBe(expectedLabel);
    }
  );
});

describe("Rating snapshots", () => {
  afterEach(() => {
    cleanup();
  });

  const kinds = ["star", "self"] as const;
  const ratings = [-1, 0, 1.5, 3, 4.5, 5, 6];

  kinds.forEach(kind => {
    ratings.forEach(rating => {
      it(`matches snapshot for rating ${rating} and kind ${kind}`, () => {
        const { container } = render(<Rating rating={rating} kind={kind} />);
        expect(container).toMatchSnapshot();
      });
    });
  });
});
