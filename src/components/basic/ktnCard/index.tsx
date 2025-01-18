import { CardProps, Card as PrimeCard } from "primereact/card";
import React from "react";
const Card = React.forwardRef((props: CardProps, ref: any) => {
  return <PrimeCard {...props} ref={ref} />;
});

export default Card;
