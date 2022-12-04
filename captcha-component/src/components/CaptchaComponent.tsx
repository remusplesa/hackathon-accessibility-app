import React from "react";

interface Props {
  labelText: string;
}

export const CaptchaComponent: React.FC<Props> = ({
  labelText,
}: Props): JSX.Element => <div>{labelText}</div>;
