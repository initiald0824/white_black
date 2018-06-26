# coding: utf-8
import tensorflow as tf


def train():
    sess = tf.InteractiveSession()
    x = tf.placeholder('float', [None, 784])
    W = tf.Variable(tf.zeros[784, 5])
    b = tf.Variable(tf.zeros[5])
    y = tf.nn.softmax(tf.matmul(x, W) + b)
    y_ = tf.placeholder('float', [None, 5])
    cross_entropy = tf.reduce_mean(-tf.reduce_sum(y_ * tf.log(y), reduction_indices=[1]))
    train_step = tf.train.GradientDescentOptimizer(0.5).minimize(cross_entropy)
    tf.global_variable_initializer().run()
    pass
