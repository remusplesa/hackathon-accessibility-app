import { memo, useEffect, useMemo, useState } from "react";
import { Stage, Layer, Image } from "react-konva";
import useImage from "use-image";
import { RectangleShape } from "./RectangleShape";
import { CaptchaChallenge, IPrediction, PredictionKonvaBB } from "../types";

const TARGET_WIDTH = 400;

function convertBB(c: IPrediction, scale: number) {
  return {
    x: Math.floor(c.xmin * scale),
    y: Math.floor(c.ymin * scale),
    width: Math.floor((c.xmax - c.xmin) * scale),
    height: Math.floor((c.ymax - c.ymin) * scale),
    stroke: "",
    strokeWidth: 2,
    id: "",
  };
}

function convertBBtoYolo(box: PredictionKonvaBB, scale: number): IPrediction {
  return {
    id: "",
    name: "",
    xmin: Math.floor(box.x * scale),
    xmax: Math.floor((box.x + box.width) * scale),
    ymin: Math.floor(box.y * scale),
    ymax: Math.floor((box.y + box.height) * scale),
  };
}

type Props = CaptchaChallenge & {
  setChallenge: (e: any) => void;
  verify: (e?: any) => void;
};

export const LabelImage = memo(
  ({ quizzId, photoUrl, challenge, setChallenge, verify }: Props) => {
    const [image, status] = useImage(photoUrl);

    const [bb, setBb] = useState<PredictionKonvaBB>({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      stroke: "",
      strokeWidth: 0,
      id: "",
    });

    useEffect(() => {
      console.log(status);
      if (status !== "loading") {
        setBb(convertBB(challenge, scalingFactor));
      }
    }, [status]);

    if (!image || status === "loading") {
      return <p>loading...</p>;
    }

    const scalingFactor = TARGET_WIDTH / Number(image?.naturalWidth);
    const originalScalingFactor = Number(image?.naturalWidth) / TARGET_WIDTH;

    return (
      <div style={{display: "flex", flexDirection: "column", boxShadow: '15px 10px 50px black'}}>
        <h2>Wrap the box around the {challenge.name}</h2>
        <Stage
          width={TARGET_WIDTH}
          height={Number(Math.floor(image?.naturalHeight * scalingFactor))}
        >
          <Layer>
            <Image image={image} />
            <RectangleShape
              key={`bounding_box`}
              shapeProps={{ ...bb }}
              isSelected={true}
              dragable={true}
              onChange={(newAttrs) => {
                setBb(newAttrs);
              }}
            />
          </Layer>
        </Stage>
        <button
          style={{borderRadius: 0, backgroundColor: 'rgb(74, 159, 102)'}}
          type="button"
          onClick={() => {
            setChallenge({
              quizzId,
              photoUrl,
              challenge: {
                ...convertBBtoYolo(bb, originalScalingFactor),
                id: challenge.id,
                name: challenge.name,
              },
            });
            verify();
          }}
        >
          Validate challenge
        </button>
      </div>
    );
  }
);
