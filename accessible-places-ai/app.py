# YOLOv5 🚀 by Ultralytics, GPL-3.0 license
"""
Run a Flask REST API exposing one or more YOLOv5s models
"""

import argparse
import io

import torch
from flask import Flask, request
from PIL import Image

app = Flask(__name__)
print(torch.__version__)
DETECTION_URL = "/v1/predict"

model = torch.hub.load("ultralytics/yolov5", 'custom', path='HackatonAI/best.pt')
model.conf=0.5

@app.route(DETECTION_URL, methods=["POST"])
def predict():
    if request.method != "POST":
        return

    if request.files.get("image"):

        im_file = request.files["image"]
        im_bytes = im_file.read()
        im = Image.open(io.BytesIO(im_bytes))

        
        results = model(im, size=640) 
        return results.pandas().xyxy[0].to_json(orient="records")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Flask API exposing YOLOv5 model")
    parser.add_argument("--port", default=5001, type=int, help="port number")
    opt = parser.parse_args()



    app.run(host="0.0.0.0", port=opt.port)  # debug=True causes Restarting with stat