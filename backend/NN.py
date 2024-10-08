import numpy as np
import matplotlib.pyplot as plt
from tensorflow.keras.datasets import mnist
from tensorflow.keras.utils import to_categorical

class NeuralNetwork:
    def __init__(self, layers, learning_rate=0.01, epochs=10000):
        self.layers = layers
        self.learning_rate = learning_rate
        self.epochs = epochs
        self.losses = []  # 損失を記録するリスト
        self.weights = []
        self.biases = []
        self._initialize_weights()

    def _initialize_weights(self):
        for i in range(len(self.layers) - 1):
            weight = np.random.randn(self.layers[i], self.layers[i + 1]) * 0.1
            bias = np.zeros((1, self.layers[i + 1]))
            self.weights.append(weight)
            self.biases.append(bias)

    def _sigmoid(self, x):
        return 1 / (1 + np.exp(-x))

    def _sigmoid_derivative(self, x):
        return x * (1 - x)

    def _softmax(self, x):
        exp_values = np.exp(x - np.max(x, axis=1, keepdims=True))
        return exp_values / np.sum(exp_values, axis=1, keepdims=True)

    def _cross_entropy_loss(self, y_true, y_pred):
        n_samples = y_true.shape[0]
        res = y_pred[range(n_samples), y_true.argmax(axis=1)]
        return -np.mean(np.log(res + 1e-9))

    def _cross_entropy_loss_derivative(self, y_true, y_pred):
        return y_pred - y_true

    def train(self, X, y):
        for epoch in range(self.epochs):
            # Forward pass
            activations = [X]
            for i in range(len(self.weights)):
                net_input = np.dot(activations[-1], self.weights[i]) + self.biases[i]
                if i == len(self.weights) - 1:
                    activation = self._softmax(net_input)
                else:
                    activation = self._sigmoid(net_input)
                activations.append(activation)

            # Compute loss
            loss = self._cross_entropy_loss(y, activations[-1])
            self.losses.append(loss)

            # Backward pass
            error = self._cross_entropy_loss_derivative(y, activations[-1])
            for i in reversed(range(len(self.weights))):
                delta = error * (activations[i + 1] if i == len(self.weights) - 1 else self._sigmoid_derivative(activations[i + 1]))
                error = np.dot(delta, self.weights[i].T)
                self.weights[i] -= self.learning_rate * np.dot(activations[i].T, delta)
                self.biases[i] -= self.learning_rate * np.sum(delta, axis=0, keepdims=True)

    def predict(self, X):
        activations = X
        for i in range(len(self.weights)):
            net_input = np.dot(activations, self.weights[i]) + self.biases[i]
            if i == len(self.weights) - 1:
                activations = self._softmax(net_input)
            else:
                activations = self._sigmoid(net_input)
        return activations

# MNISTデータセットの読み込みと前処理
(x_train, y_train), (x_test, y_test) = mnist.load_data()
x_train = x_train.reshape(-1, 28*28) / 255.0
x_test = x_test.reshape(-1, 28*28) / 255.0
y_train = to_categorical(y_train, 10)
y_test = to_categorical(y_test, 10)

# ニューラルネットワークのインスタンス化とトレーニング
nn = NeuralNetwork(layers=[784, 128, 64, 10], learning_rate=0.01, epochs=1000)
nn.train(x_train, y_train)

# テストデータでの予測
predictions = nn.predict(x_test)
accuracy = np.mean(np.argmax(predictions, axis=1) == np.argmax(y_test, axis=1))
print(f'Accuracy: {accuracy * 100:.2f}%')
