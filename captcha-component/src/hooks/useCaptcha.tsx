import axios from "axios";
import { useEffect, useState } from "react";
import {
  CaptchaChallenge,
  CaptchaSubmitResponse,
  ChallengeResponse,
} from "../types";

const getChallengOptions = {
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

const solveChallengeOptions = (captchaEntry: CaptchaChallenge | undefined) => ({
  method: "POST",
  url: "http://localhost:4001/graphql",
  headers: { "Content-Type": "application/json" },
  data: {
    query: `mutation SolveChallenge($captcha: CaptchaInput!, $mocked: Boolean) {
        solveChallenge(captcha: $captcha, mocked: $mocked){
          ok
        }
      }
      `,
    variables: {
      captcha: captchaEntry,
    },
    operationName: "SolveChallenge",
  },
});

export const useCaptcha = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [challenge, setChallenge] = useState<CaptchaChallenge>();

  useEffect(() => {
    console.log("Loading");
    setIsLoading(true);
    (async () => {
      const res = await axios<ChallengeResponse>(getChallengOptions);
      console.log({ res: res.data?.data });
      setChallenge(res.data?.data.getChallenge);
    })();
    setIsLoading(false);
  }, []);

  async function submit(): Promise<{ ok: boolean }> {
    console.log({ challenge });
    if (challenge) {
      setIsLoading(true);
      const res = await axios<CaptchaSubmitResponse>(
        solveChallengeOptions(challenge)
      );
      setIsLoading(false);
      return res.data?.data.solveChallenge;
    }
    return { ok: false };
  }

  return {
    challenge,
    setChallenge,
    isLoading,
    submit,
  };
};
