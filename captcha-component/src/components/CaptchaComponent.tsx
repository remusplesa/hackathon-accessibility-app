import React, { useState } from "react";
import { useCaptcha } from '../hooks/useCaptcha';
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
          <pre style={{overflow: "hidden"}}>{JSON.stringify(challenge, null, 2)}</pre>
          <button type="button" onClick={() => verify()}>ok</button>
        </div>
      )}
    </div>
  );
};
