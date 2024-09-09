import numpy as np
from sklearn import svm
import cv2
import matplotlib.pyplot as plt
from sklearn.decomposition import PCA
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import pandas as pd

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

def append_bgr(color1,color2):
    color12=[]
    for i in range(len(color1)):
        color12.append([color1[i],color2[i]])
    return color12

#SVMの境界線を描画する関数(dimensions=2の場合)
def draw_svm_boundary(X_train,y_train,svm_model_bg,svm_model_gr,svm_model_br):
    #それぞれの軸は、RG,BR,BGのどれか
    #それぞれの軸のデータを取り出す
    b_train = [i[0] for i in X_train]
    g_train = [i[1] for i in X_train]
    r_train = [i[2] for i in X_train]

    #それぞれを軸にして、3つの表を作成し、それぞれに対してSVMの境界線を描画する
    #BG
    plt.scatter(b_train, g_train, c=y_train, cmap='winter')
    ax = plt.gca()
    xlim = ax.get_xlim()
    ylim = ax.get_ylim()

    #generate grid points for decision boundary
    xx = np.linspace(xlim[0], xlim[1], 30)
    yy = np.linspace(ylim[0], ylim[1], 30)
    YY, XX = np.meshgrid(yy, xx)
    xy = np.vstack([XX.ravel(), YY.ravel()]).T

    #get the decision boundary
    Z = svm_model_bg.decision_function(xy).reshape(XX.shape)
    ax.contour(XX, YY, Z, colors='k', levels=[-1, 0, 1], alpha=0.5, linestyles=['--', '-', '--'])
    

    #save the plot
    #plt.savefig('svm_bg.png')
    plt.show()

    #GR
    plt.scatter(g_train, r_train, c=y_train, cmap='winter')
    ax = plt.gca()
    xlim = ax.get_xlim()
    ylim = ax.get_ylim()

    #generate grid points for decision boundary
    xx = np.linspace(xlim[0], xlim[1], 30)
    yy = np.linspace(ylim[0], ylim[1], 30)
    YY, XX = np.meshgrid(yy, xx)
    xy = np.vstack([XX.ravel(), YY.ravel()]).T

    #get the decision boundary
    Z = svm_model_gr.decision_function(xy).reshape(XX.shape)
    ax.contour(XX, YY, Z, colors='k', levels=[-1, 0, 1], alpha=0.5, linestyles=['--', '-', '--'])
    

    #save the plot
    #plt.savefig('svm_gr.png')
    plt.show()

    #BR
    plt.scatter(b_train, r_train, c=y_train, cmap='winter')
    ax = plt.gca()
    xlim = ax.get_xlim()
    ylim = ax.get_ylim()
    
    #generate grid points for decision boundary
    xx = np.linspace(xlim[0], xlim[1], 30)
    yy = np.linspace(ylim[0], ylim[1], 30)
    YY, XX = np.meshgrid(yy, xx)
    xy = np.vstack([XX.ravel(), YY.ravel()]).T

    #get the decision boundary
    Z = svm_model_br.decision_function(xy).reshape(XX.shape)
    ax.contour(XX, YY, Z, colors='k', levels=[-1, 0, 1], alpha=0.5, linestyles=['--', '-', '--'])
    

    #save the plot
    #plt.savefig('svm_br.png')
    plt.show()





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

    #データセットの分割
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, shuffle=True)

    #bgrのそれぞれのデータを取り出す
    b_train = [i[0] for i in X_train]
    g_train = [i[1] for i in X_train]
    r_train = [i[2] for i in X_train]
    b_test = [i[0] for i in X_test]
    g_test = [i[1] for i in X_test]
    r_test = [i[2] for i in X_test]

    #bg,gr,brのそれぞれのデータを作成
    bg_train=append_bgr(b_train,g_train)
    gr_train=append_bgr(g_train,r_train)
    br_train=append_bgr(b_train,r_train)
    bg_test=append_bgr(b_test,g_test)
    gr_test=append_bgr(g_test,r_test)
    br_test=append_bgr(b_test,r_test)


    #numpy配列に変換
    bg_train=np.array(bg_train)
    gr_train=np.array(gr_train)
    br_train=np.array(br_train)
    bg_test=np.array(bg_test)
    gr_test=np.array(gr_test)
    br_test=np.array(br_test)

#SVmのモデルを作成(bg,gr,br)
    svm_model_bg = svm.SVC(kernel='linear')
    svm_model_gr = svm.SVC(kernel='linear')
    svm_model_br = svm.SVC(kernel='linear')
    svm_model_bg.fit(bg_train, y_train)
    svm_model_gr.fit(gr_train, y_train)
    svm_model_br.fit(br_train, y_train)


    #SVMの境界線を描画する
    draw_svm_boundary(X_train,y_train,svm_model_bg,svm_model_gr,svm_model_br)

    # テストデータでの精度を計算
    y_pred_bg = svm_model_bg.predict(bg_test)
    y_pred_gr = svm_model_gr.predict(gr_test)
    y_pred_br = svm_model_br.predict(br_test)
    #最終的な予測は、3つのSVMの予測の多数決で決定する
    y_pred=[]
    for i in range(len(y_pred_bg)):
        if y_pred_bg[i]+y_pred_gr[i]+y_pred_br[i]>=2:
            y_pred.append(1)
        else:
            y_pred.append(0)
    accuracy = accuracy_score(y_test, y_pred)
    print(f'accuracy: {accuracy}')

    return accuracy

# テスト
for i in range(1, 2):
    svm_learning(100, '.\\PetImages\\test_cat.jpg')
# svm_learning(100, '.\\PetImages\\test_dog.jpg')
