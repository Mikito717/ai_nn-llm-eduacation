import numpy as np
from sklearn.neighbors import KNeighborsClassifier
import cv2
from sklearn.datasets import fetch_openml

def k_nn_learning(k_train,distance_metric, new_image_path):
 #k_trainを整数に変換
    k_train=int(k_train)

    fashion_mnist = fetch_openml('Fashion-MNIST',as_frame=False)

    X = fashion_mnist.data
    y = fashion_mnist.target
    X=X.reshape(X.shape[0], -1)

    # 新しい画像を分類
    random=np.random.randint(0,len(X))
    new_image = X[random]
    y_true = y[random]
    X = np.delete(X, random, axis=0)
    y = np.delete(y, random, axis=0)

    #ラベルを整数値へ
    y = y.astype(int)

    #Xの中からランダムにk_trainこのデータを取得
    random_indices = np.random.choice(len(X), k_train, replace=False)
    X = X[random_indices]
    y = y[random_indices]

    # K-NNモデルのトレーニング
    knn = KNeighborsClassifier(n_neighbors=k_train)
    knn.fit(X, y)

    k = 100
        
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
    result.append(y_true)
    
    #実行終了を表示
    print("K-NNの処理が完了しました")
    
    return result
    