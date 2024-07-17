import numpy as np
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from skimage import io, transform
import csv
import torchvision
import cv2
import datetime


maxdata = 1000
k_train=1000
# 画像をロードして前処理する関数
def load_and_preprocess_image(filepath, size=(64, 64)):
    img = cv2.imread(filepath)
    if img is None:
        #print(f"{filepath} is None")
        return False
    else:
        img = cv2.resize(img,size)
        img=img.flatten()
    return img

for k_train in range(1000, 10000, 100):
    # データセットの作成
    cat_images = [f'.\\PetImages\\Cat\\{i}.jpg' for i in range(0, k_train)]
    dog_images = [f'.\\PetImages\\Dog\\{i}.jpg' for i in range(0, k_train)]

    X = []
    y = []

    for image_path in cat_images:
        img=load_and_preprocess_image(image_path)
        if img is False:
            continue
        X.append(img)
        y.append(0)  # 猫のラベル

    for image_path in dog_images:
        img=load_and_preprocess_image(image_path)
        if img is False:
            continue
        X.append(img)
        y.append(1)  # 犬のラベル

    X = np.array(X)
    y = np.array(y)

    # K-NNモデルのトレーニング
    knn = KNeighborsClassifier(n_neighbors=k_train)
    knn.fit(X, y)

    # テスト結果を格納するリストを作成
    test_results = [
        ["正解ラベル", "予測ラベル", "正解数"],
    ]

    currency = 0
    k = 100
    for i in range(k_train+1, k_train+maxdata):
        # 新しい画像を分類
        new_image_path = f'.\\PetImages\\Cat\\{i}.jpg'
        new_image = load_and_preprocess_image(new_image_path)
        #print(new_image_path)
        if new_image is False:
            continue

        # 近傍点の取得
        distances, indices = knn.kneighbors([new_image], n_neighbors=k)

        # 近傍点のラベルを取得
        neighbor_labels = y[indices]
        neighbor_labels = neighbor_labels.flatten()
        #print(neighbor_labels)

        # 多数決による分類
        predicted_label = np.bincount(neighbor_labels).argmax()
        #print(predicted_label)

        # 正しいラベルの数を出力
        correct_label_count = np.sum(neighbor_labels == 0)#猫の場合のみ（犬の場合は1）

        if predicted_label==0:
            currency += 1
        #print(f'Predicted Label: {"Dog" if predicted_label == 1 else "Cat"}')
        #print(f'Correct Label Count: {correct_label_count}')
        test_results.append(["Cat", {"Dog" if predicted_label == 1 else "Cat"}, correct_label_count])



    print(f'Accuracy: {currency}/{maxdata} = {currency/maxdata*100}%')
    test_results.append(["Accuracy", f"{currency}/{maxdata}", currency/maxdata*100])
    # CSVファイルを開く
    now=datetime.datetime.now()
    with open(f'test_results{now.strftime("%Y%m%d_%H%M%S")}.csv', 'w', newline='') as f:
        # CSVライターオブジェクトを作成
        writer = csv.writer(f)

        # ヘッダー行を書き込む
        writer.writerow(test_results[0])

        # テスト結果を書き込む
        for row in test_results[1:]:
            writer.writerow(row)