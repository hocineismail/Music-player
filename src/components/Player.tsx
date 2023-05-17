import React from "react";
import Audio from "./audio";

type Props = {
  item: string;
  goToNext: () => void;
  goToPrevious: () => void;
};

export default function Player({ item, goToNext, goToPrevious }: Props) {
  return (
    <>
      <div>{/* <Audio item={item} /> */}</div>
    </>
  );
}
