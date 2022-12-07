export type IPrediction = {
  id: string;
  name: string;
  xmin: number;
  xmax: number;
  ymin: number;
  ymax: number;
}

export type PredictionKonvaBB = {
  x: number;
  y: number;
  width: number;
  height: number;
  stroke: string;
  strokeWidth: number;
  id: string;
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