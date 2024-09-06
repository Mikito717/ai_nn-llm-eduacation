import numpy as np
from sklearn import svm
import cv2
import matplotlib.pyplot as plt
from sklearn.decomposition import PCA

#todo:BGRのそれぞれの掛け合わせごとに、学習させる（3通り）

# 画像をロードして前処理する関数
def load_and_preprocess_image(filepath, size=(64, 64)):
    img = cv2.imread(filepath)
    if img is None:
        return False
    else:
        img = cv2.resize(img, size)
        #画像のRGBの平均値を求める
        b_average = np.mean(img[:,:,0])
        g_average = np.mean(img[:,:,1])
        r_average = np.mean(img[:,:,2])
        bgr=[b_average,g_average,r_average]

    return bgr

def svm_learning(train_size, new_image_path):
    # データセットの作成
    cat_images = [f'.\\PetImages\\Cat\\{i}.jpg' for i in range(0, train_size)]
    dog_images = [f'.\\PetImages\\Dog\\{i}.jpg' for i in range(0, train_size)]
    X = []
    y = []
    for image_path in cat_images:
        img = load_and_preprocess_image(image_path)
        if img is False:
            continue
        X.append(img)
        y.append(0)  # 猫のラベル
    for image_path in dog_images:
        img = load_and_preprocess_image(image_path)
        if img is False:
            continue
        X.append(img)
        y.append(1)  # 犬のラベル
    X = np.array(X)
    y = np.array(y)

    # SVMモデルのトレーニング
    clf = svm.SVC()
    clf.fit(X, y)
    Z=clf.predict(X)

    # 可視化のためにデータを2次元空間に射影 (PCAを使用)
    pca = PCA(n_components=2)
    X_reduced = pca.fit_transform(X)

    # 決定境界の描画
    x_min, x_max = X_reduced[:, 0].min() - 1, X_reduced[:, 0].max() + 1
    y_min, y_max = X_reduced[:, 1].min() - 1, X_reduced[:, 1].max() + 1
    h = 1  # step size in the mesh
    xx, yy = np.meshgrid(np.arange(x_min, x_max, h), np.arange(y_min, y_max, h))
    #Z = clf.predict(np.c_[xx.ravel(), yy.ravel()]) 
    Z = Z.reshape(xx.shape)

    plt.contourf(xx, yy, Z, cmap=plt.cm.coolwarm, alpha=0.8)
    plt.scatter(X_reduced[:, 0], X_reduced[:, 1], c=y, cmap=plt.cm.coolwarm)
    plt.xlabel('PCA component 1')
    plt.ylabel('PCA component 2')
    plt.title('SVM decision boundary')
    plt.show()

    # 結果を表示
    result = {
    }

    print("SVMの処理が完了しました")
    return result

# テスト
svm_learning(100, '.\\PetImages\\test_cat.jpg')
# svm_learning(100, '.\\PetImages\\test_dog.jpg')
