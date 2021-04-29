import { FC } from "react";

const googleFont = (name: string) => {
  return (
    <link
      rel="stylesheet"
      href={`https://fonts.googleapis.com/css?family=${name}`}
    />
  );
};

export const Metadata: FC = () => {
  return (
    <>
      {googleFont("VT323")}
      {googleFont("Inconsolata")}
    </>
  );
};
