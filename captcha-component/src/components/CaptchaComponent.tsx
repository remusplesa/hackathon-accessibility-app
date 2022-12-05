import React, { useEffect, useState } from "react";
import axios from "axios";

interface Props {
  labelText?: string;
  setIsValid: (e: any) => void;
}

const options = {
  method: "POST",
  url: "http://localhost:4001/graphql",
  headers: { "Content-Type": "application/json" },
  data: {
    query: `query GetChallenge($mocked: Boolean) {
               getChallenge(mocked: $mocked){
                 quizzId
                 photoUrl
                 challenge {
                  id
                  name
                  xmin
                  xmax
                  ymin
                  ymax
                }
              }
            }
            `,
    variables: { mocked: true },
    operationName: "GetChallenge",
  },
};

export const CaptchaComponent: React.FC<Props> = ({setIsValid}): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);
  const [isOk, setIsOk] = useState(false);
  const [challenge, setChallenge] = useState<ChallengeResponse>();

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const res = await axios(options);
      if (res.data) {
        setChallenge(res.data);
      }
    })();
    setIsLoading(false);
  }, []);

  function verify() {
    console.log('Verify challenge data')
    // todo: call the other endpoint

    // todo: check response -> res.data.ok === true ?
    setIsValid(true);
    setIsOk(true);
  }

  if (isOk) {
    return <h3>All good, not a robot</h3>
  }

  return (
    <>
      {isLoading ? (
        "Loading..."
      ) : (
        <div>
          <pre>{JSON.stringify(challenge, null, 2)}</pre>
          <button type="button" onClick={() => verify()}>ok</button>
        </div>
      )}
    </>
  );
};

export interface IPrediction {
  id: string;
  name: string;
  xmin: number;
  xmax: number;
  ymin: number;
  ymax: number;
}

type ChallengeResponse = {
  getChallenge: {
    quizzId: string;
    photoUrl: string;
    challenge: IPrediction;
  };
};
