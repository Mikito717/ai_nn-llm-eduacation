import numpy as np
from sklearn.neighbors import KNeighborsClassifier
import cv2

# 画像をロードして前処理する関数
def load_and_preprocess_image(filepath, size=(64, 64)):
    img = cv2.imread(filepath)
    if img is None:
        return False
    else:
        img = cv2.resize(img,size)
        img=img.flatten()
    return img

def k_nn_learning(k_train, new_image_path):
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

    k = 100
    
    # 新しい画像を分類
    new_image = load_and_preprocess_image(new_image_path)
    #print(new_image_path)
    if new_image is False:
        print("画像が読み込めませんでした")
        
    # 近傍点の取得
    distances, indices = knn.kneighbors([new_image], n_neighbors=k)

    # 近傍点のラベルを取得
    neighbor_labels = y[indices]
    neighbor_labels = neighbor_labels.flatten()

    # 多数決による分類
    predicted_label = np.bincount(neighbor_labels).argmax()

    # 予測したラベルと一致した近傍の数を出力
    correct_label_count = np.sum(neighbor_labels == predicted_label)
    
    # 結果を表示
    result=[]
    result.append(correct_label_count)
    result.append(predicted_label)
    
    return result
    