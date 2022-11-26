# YOLOv5 🚀 by Ultralytics, GPL-3.0 license
"""
Run a Flask REST API exposing one or more YOLOv5s models
"""

import argparse
import io
from flask_cors import CORS

import torch
from flask import Flask, request,jsonify
from PIL import Image

app = Flask(__name__)
CORS(app)

print(torch.__version__)
DETECTION_URL = "/predict"

model = torch.hub.load("ultralytics/yolov5", 'custom','./model/best.pt' )
model.conf=0.5

def batch_predict(image_bytes):
    im = Image.open(io.BytesIO(image_bytes))
    results = model(im) 
    
    return results.pandas().xyxy[0].to_json(orient="records")


@app.route(DETECTION_URL, methods=["POST"])
def stream_predict():
    if request.method != "POST":
        return

    if request.files.get("image"):

        im_file = request.files["image"]
        im_bytes = im_file.read()
        output=batch_predict(im_bytes)
        response=jsonify(output)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

if __name__ == "__main__":
    app.run(debug=True,host="0.0.0.0")  # debug=True causes Restarting with stat