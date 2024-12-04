import os
import time
import tracemalloc
from memory_profiler import memory_usage
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split

def train_randomforest(n_estimators=100, max_depth=None, min_samples_split=2, min_samples_leaf=1, memorylimit=0):
    """
    ランダムフォレストを動作させる関数

    Parameters:
    n_estimators: 決定木の数
    max_depth: 決定木の最大深さ
    min_samples_split: 内部ノードを分割するために必要な最小サンプル数
    min_samples_leaf: 葉ノードに必要な最小サンプル数
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

    # Breast Cancer Wisconsinデータセットの読み込み
    data = load_breast_cancer()
    X = data.data
    y = data.target

    # データセットの分割
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

    # max_depthを整数に変換
    if max_depth is not None:
        max_depth = int(max_depth)

    # ランダムフォレストモデルの作成
    model = RandomForestClassifier(
        n_estimators=n_estimators,
        max_depth=max_depth,
        min_samples_split=min_samples_split,
        min_samples_leaf=min_samples_leaf
    )
    
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
    
    # 詳細な評価を表示
    print("Classification Report:")
    print(classification_report(y_test, y_pred))
    print("Confusion Matrix:")
    print(confusion_matrix(y_test, y_pred))
    
    return accuracy, elapsed_time, memory_usage

if __name__ == "__main__":
    accuracy, elapsed_time, memory_usage = train_randomforest()
    print(f"Accuracy: {accuracy}")
    print(f"Elapsed Time: {elapsed_time} seconds")
    print(f"Memory Usage: {memory_usage} GB")