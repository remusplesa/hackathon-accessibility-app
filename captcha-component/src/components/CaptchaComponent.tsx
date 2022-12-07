import React, { useEffect, useState } from "react";
import { Label } from "react-konva";
import { useCaptcha } from '../hooks/useCaptcha';
import { LabelImage } from './LabelImage';
interface Props {
  labelText?: string;
  setIsValid: (e: any) => void;
}


export const CaptchaComponent: React.FC<Props> = ({ setIsValid }): JSX.Element => {
  const [isOk, setIsOk] = useState(false);
  const { challenge, setChallenge, isLoading, submit } = useCaptcha();

  async function verify() {
    const { ok } = await submit();
    console.log('Verify challenge data', {ok})
    setIsValid(ok);
    setIsOk(ok);
  }

  if (isOk) {
    return <h3>All good, not a robot</h3>
  }

  return (
    <div>
      {isLoading ? (
        "Loading..."
      ) : (
        <div>
          {challenge && <LabelImage {...challenge} setChallenge={setChallenge} verify={verify}/>}
        </div>
      )}
    </div>
  );
};
