import time
import tracemalloc
import numpy as np
import tensorflow as tf
from tensorflow.keras.datasets import mnist
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Flatten, Conv2D, MaxPooling2D, SimpleRNN

def train_neuralnetwork(layers, learning_rate, epochs, algorithm, model_type):
    # データセットのロードと前処理
    (x_train, y_train), (x_test, y_test) = mnist.load_data()
    x_train, x_test = x_train / 255.0, x_test / 255.0

    if model_type == 'CNN':
        x_train = x_train.reshape(-1, 28, 28, 1)
        x_test = x_test.reshape(-1, 28, 28, 1)

    # モデルの構築
    model = Sequential()
    if model_type == 'CNN':
        model.add(Conv2D(layers[0], kernel_size=(3, 3), activation='relu', input_shape=(28, 28, 1)))
        model.add(MaxPooling2D(pool_size=(2, 2)))
        model.add(Flatten())
        for units in layers[1:]:
            model.add(Dense(units, activation='relu'))
    elif model_type == 'RNN':
        model.add(SimpleRNN(layers[0], input_shape=(28, 28)))
        for units in layers[1:]:
            model.add(Dense(units, activation='relu'))
    else:  # NN
        model.add(Flatten(input_shape=(28, 28)))
        for units in layers:
            model.add(Dense(units, activation='relu'))

    model.add(Dense(10, activation='softmax'))

    # モデルのコンパイル
    model.compile(optimizer=algorithm, loss='sparse_categorical_crossentropy', metrics=['accuracy'])

    # メモリ使用量のトラッキング開始
    tracemalloc.start()
    start_time = time.time()

    # モデルのトレーニング
    model.fit(x_train, y_train, epochs=epochs, verbose=0)

    # モデルの評価
    test_loss, test_acc = model.evaluate(x_test, y_test, verbose=0)

    # 実行時間とメモリ使用量の計測
    end_time = time.time()
    _, peak_memory = tracemalloc.get_traced_memory()
    tracemalloc.stop()

    execution_time = end_time - start_time
    peak_memory = peak_memory / (1024 * 1024)  # メガバイトに変換

    return test_acc, execution_time, peak_memory

if __name__ == "__main__":
    # デバッグ用の使用例
    layers = [32, 64]
    learning_rate = 0.001
    epochs = 5
    algorithm = 'adam'
    model_type = 'NN'

    accuracy, exec_time, memory_usage = train_neuralnetwork(layers, learning_rate, epochs, algorithm, model_type)
    print(f"Accuracy: {accuracy}, Execution Time: {exec_time} seconds, Memory Usage: {memory_usage} MB")