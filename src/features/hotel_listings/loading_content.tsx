import { SquareLoader, TextLoader } from "../../design_system/loader";
import { ItemSkeleton } from "./list/item/item_skeleton";

export const LoadingContent = () => (
  <ul aria-label="Loading">
    {Array(5)
      .fill(undefined)
      .map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: index is fine here, it's a static array
        <li key={i} aria-hidden>
          <ItemSkeleton
            image={<SquareLoader />}
            title={<TextLoader />}
            rating={<TextLoader />}
            address={<TextLoader />}
            room={<TextLoader />}
            promotion={<TextLoader />}
            price={undefined}
            savings={undefined}
            priceLabel={undefined}
          />
        </li>
      ))}
  </ul>
);
