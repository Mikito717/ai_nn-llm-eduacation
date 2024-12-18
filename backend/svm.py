import os
import time
import tracemalloc
from memory_profiler import memory_usage
from sklearn import svm
from sklearn.metrics import accuracy_score
from sklearn.datasets import load_wine
from sklearn.model_selection import train_test_split

def train_svm(C=1.0, kernel='rbf', degree=3, gamma='scale', memorylimit=0):
    """
    SVMを動作させる関数

    Parameters:
    C: 正則化パラメータ
    kernel: カーネルタイプ ('linear', 'poly', 'rbf', 'sigmoid', 'precomputed')
    degree: 多項式カーネルの次数 (kernel='poly' の場合に使用)
    gamma: 'scale', 'auto' または float (kernel='rbf', 'poly', 'sigmoid' の場合に使用)
    memorylimit: メモリ使用量の制限 (MB単位)

    Returns:
    accuracy: テストデータに対する精度
    elapsed_time: 実行時間
    memory_usage: 使用メモリ量
    """
    # Check OS (Windows or Linux)
    if os.name == 'nt':
        memorylimit = 0

    # Check the memory limit
    if memorylimit != 0:
        import resource
        resource.setrlimit(resource.RLIMIT_AS, (memorylimit * 1024 * 1024, memorylimit * 1024 * 1024))

    # Wineデータセットの読み込み
    data = load_wine()
    X = data.data
    y = data.target

    # データセットの分割
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

    # SVMモデルの作成
    model = svm.SVC(C=C, kernel=kernel, degree=degree, gamma=gamma)
    
    # メモリ使用量のトラッキング開始
    tracemalloc.start()
    
    # 実行時間の計測開始
    start_time = time.time()
    
    # モデルの訓練
    model.fit(X_train, y_train)
    
    # テストデータに対する予測
    y_pred = model.predict(X_test)
    
    # 実行時間の計測終了
    elapsed_time = time.time() - start_time
    
    # メモリ使用量の計測終了
    current, peak = tracemalloc.get_traced_memory()
    tracemalloc.stop()
    memory_usage = peak / 10**6  # バイトからメガバイトに変換
    memory_usage = memory_usage / 1024  # メガバイトからギガバイトに変換
    
    # 精度の計算
    accuracy = accuracy_score(y_test, y_pred)
    
    return accuracy, elapsed_time, memory_usage

if __name__ == "__main__":
    accuracy, elapsed_time, memory_usage = train_svm()
    print(f"Accuracy: {accuracy}")
    print(f"Elapsed Time: {elapsed_time} seconds")
    print(f"Memory Usage: {memory_usage} GB")