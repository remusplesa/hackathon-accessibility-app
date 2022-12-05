import React, { useEffect, useState } from "react";
import axios from "axios";

interface Props {
  // labelText: string;
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

export const CaptchaComponent: React.FC<Props> = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);
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

  return (
    <>
      {isLoading ? (
        "Loading..."
      ) : (
        <input required>
          <pre>{JSON.stringify(challenge, null, 2)}</pre>
        </input>
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
