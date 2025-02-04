import { Emphasis } from "../../../../design_system/typography";

export const Price = ({ value }: { value: number }) => (
  // The dollar sign in the card is stylised, so we need
  // extra consideration here for screenreaders
  <span>
    <Emphasis>{value}</Emphasis>
  </span>
);
