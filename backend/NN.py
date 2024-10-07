import numpy as np


class NeuralNetwork:
    def __init__(self, layers, learning_rate=0.01, epochs=1000):
        self.layers = layers
        self.learning_rate = learning_rate
        self.epochs = epochs
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

    def _forward(self, X):
        activations = [X]
        for i in range(len(self.weights)):
            net_input = np.dot(
                activations[-1], self.weights[i]) + self.biases[i]
            activation = self._sigmoid(net_input)
            activations.append(activation)
        return activations

    def _backward(self, activations, y):
        deltas = [y - activations[-1]]
        for i in reversed(range(len(self.weights) - 1)):
            delta = np.dot(deltas[-1], self.weights[i + 1].T) * \
                self._sigmoid_derivative(activations[i + 1])
            deltas.append(delta)
        deltas.reverse()
        return deltas

    def _update_weights(self, activations, deltas):
        for i in range(len(self.weights)):
            self.weights[i] += self.learning_rate * \
                np.dot(activations[i].T, deltas[i])
            self.biases[i] += self.learning_rate * \
                np.sum(deltas[i], axis=0, keepdims=True)

    def train(self, X, y):
        for epoch in range(self.epochs):
            activations = self._forward(X)
            deltas = self._backward(activations, y)
            self._update_weights(activations, deltas)
            if epoch % 100 == 0:
                loss = np.mean(np.square(y - activations[-1]))
                print(f'Epoch {epoch}, Loss: {loss}')

    def predict(self, X):
        activations = self._forward(X)
        return activations[-1]


# Example usage:
if __name__ == "__main__":
    nn = NeuralNetwork(layers=[2, 3, 1], learning_rate=0.01, epochs=10000)
    X = np.array([[0, 0], [0, 1], [1, 0], [1, 1]])
    y = np.array([[0], [1], [1], [0]])
    nn.train(X, y)
    predictions = nn.predict(X)
    print("Predictions:", predictions)
