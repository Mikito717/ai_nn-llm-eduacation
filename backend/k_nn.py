import numpy as np
from sklearn.neighbors import KNeighborsClassifier
import cv2
from sklearn.datasets import fetch_openml
import matplotlib.pyplot as plt

def k_nn_learning(k_train,distance_metric, new_image_path,selected_class):
    #k_trainを整数に変換
    k_train=int(k_train)

    #プレイヤーが選択したクラスのデータが全学習データの10％以上になるようにする
    selected_class_number=int(k_train/10)

    fashion_mnist = fetch_openml('Fashion-MNIST',as_frame=False)

    X = fashion_mnist.data
    y = fashion_mnist.target
    X=X.reshape(X.shape[0], -1)


    #ラベルを整数値へ
    y = y.astype(int)


    # 新しい画像を分類
    #random=np.random.randint(0,len(X))
    random=np.where(y==selected_class)[0]
    random=random[0]
    new_image = X[random]
    new_image = new_image.reshape(1, -1)
    y_true = y[random]
    X = np.delete(X, random, axis=0)
    y = np.delete(y, random, axis=0)



    #Xの中からselected_classと同じクラスのデータをselected_class_number個だけ取得
    selected_indices = np.where(y == selected_class)[0]
    selected_indices = np.random.choice(selected_indices, selected_class_number, replace=False)
    X1 = X[selected_indices]
    y1 = y[selected_indices]

    #Xの中からランダムにk_trainこのデータを取得
    random_indices = np.random.choice(len(X), k_train-selected_class_number, replace=False)
    X = X[random_indices]
    y = y[random_indices]

    #2種類の訓練データをアペンド
    X = np.append(X, X1, axis=0)
    y = np.append(y, y1, axis=0)
    # K-NNモデルのトレーニング
    knn = KNeighborsClassifier(n_neighbors=k_train)
    knn.fit(X, y)

    k = 100

    # 近傍点の取得
    distances, indices = knn.kneighbors(new_image, n_neighbors=k)

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


    #画像を表示
    new_image = new_image.reshape(28, 28)
    plt.imshow(new_image, cmap='gray')
    plt.show()

    return result
    