# coding: utf-8

from flask import Flask
from flask_socketio import SocketIO
from flask import render_template, request
import json
import numpy as np
from . import utils
from . import cnn
import cv2

app = Flask(__name__)
app.secret_key = 'white_black'

cnt = 0

socketio = SocketIO(app)

@app.route('/', methods=['GET', 'POST'])
def init_page():
    return render_template('white.html')


@app.route('/api/train', methods=['GET', 'POST'])
def train():
    image_data = request.form.get('imageData')
    action = request.form.get('action')
    action = json.loads(action)
    action = np.array(action)
    action.shape = (1, 5)
    image_data = json.loads(image_data)
    image_data = np.array(image_data)
    image_data.shape = image_data.size
    image_data.shape = (image_data.size // 4, 4)
    image_data = np.delete(image_data, -1, axis=1)
    image_data.shape = (600, 300, 3)
    image_data = image_data.astype(np.uint8)

    global cnt
    cnt += 1
    image_name = str(action) + str(cnt)
    cv2.imwrite(image_name+'.png', image_data)
    image_data = utils.preprocess(image_data)
    # cnn.train(image_data, action)
    return '0'


