#coding: utf-8

import numpy as np
import cv2

def preprocess(observation):
	observation = cv2.cvtColor(cv2.resize(observation, (28, 28)), cv2.COLOR_BGR2GRAY)
	ret, observation = cv2.threshold(observation,1,255,cv2.THRESH_BINARY)
	return np.reshape(observation, [-1, 784])


