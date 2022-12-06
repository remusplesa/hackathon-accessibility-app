export interface IPrediction {
  id: string;
  name: string;
  xmin: number;
  xmax: number;
  ymin: number;
  ymax: number;
}

export type ChallengeResponse = {
  data: {
    getChallenge: CaptchaChallenge;
  }
};

export type CaptchaChallenge = {
  quizzId: string;
  photoUrl: string;
  challenge: IPrediction;
}

export type CaptchaSubmitResponse = {
  data: {
    solveChallenge: {
      ok: boolean;
    }
  }
}