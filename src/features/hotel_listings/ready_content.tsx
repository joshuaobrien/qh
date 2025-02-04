import { Body, Subtitle, Title } from "../../design_system/typography";
import type { Result } from "../../services/hotel_service/hotel_schema";
import { ItemImage } from "./list/item/image/item_image";
import { ItemSkeleton } from "./list/item/item_skeleton";
import { Price } from "./list/item/price";
import { Rating } from "./list/item/rating/rating";

export const ReadyContent = ({
  results,
  stayLengthNights,
}: { results: Result[]; stayLengthNights: number }) => (
  <ul>
    {results.map((result) => (
      <li key={result.id}>
        <ItemSkeleton
          image={
            <ItemImage
              imageUrl={result.property.previewImage.url}
              description={result.property.previewImage.caption}
            />
          }
          imageLabel={<Body color="red">{result.offer.promotion.title}</Body>}
          title={<Title>{result.property.title}</Title>}
          address={
            <Subtitle color="grey">
              {result.property.address.join(", ")}
            </Subtitle>
          }
          rating={
            <Rating
              rating={result.property.rating.ratingValue}
              kind={result.property.rating.ratingType}
            />
          }
          room={<Body color="red">{result.offer.name}</Body>}
          promotion={
            result.offer.cancellationOption.cancellationType ===
            "FREE_CANCELLATION" ? (
              <Body color="green">Free cancellation</Body>
            ) : undefined
          }
          price={<Price value={result.offer.displayPrice.amount} />}
          savings={
            <Body color="red" isBold>
              {result.offer.savings != null
                ? `Save $${result.offer.savings.amount}~`
                : undefined}
            </Body>
          }
          priceLabel={
            <>
              <Body isBold>{stayLengthNights}</Body>
              <Body>{` night total (${result.offer.displayPrice.currency})`}</Body>
            </>
          }
        />
      </li>
    ))}
  </ul>
);
