# coding: utf-8

from flask import Flask
from flask_socketio import SocketIO
from flask import render_template

app = Flask(__name__)
app.secret_key = 'white_black'

socketio = SocketIO(app)


@app.route('/', methods=['GET', 'POST'])
def init_page():
    return render_template('white.html')


@app.route('/api/think', methods=['GET', 'POST'])
def think():
    pass