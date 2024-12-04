import os
import time
import tracemalloc
import pandas as pd
from memory_profiler import memory_usage
from sklearn.cluster import KMeans
from sklearn.model_selection import train_test_split
from sklearn.metrics import silhouette_score, adjusted_rand_score
from sklearn.preprocessing import LabelEncoder, StandardScaler


def train_kmeans(n_clusters=3, init='k-means++', n_init=10, max_iter=300, tol=1e-4, memorylimit=0):
    """
    KMeansクラスタリングを動作させる関数

    Parameters:
    n_clusters: クラスタの数
    init: 初期化方法
    n_init: 異なる初期化を行う回数
    max_iter: 最大反復回数
    tol: 収束のための許容誤差
    memorylimit: メモリ使用量の制限 (MB単位)

    Returns:
    silhouette: シルエットスコア
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

    # Customer Segmentationデータセットの読み込み
    data = pd.read_csv('BankChurners.csv')
    
    # 不要な列を除外
    data = data.drop(['CLIENTNUM', 'Naive_Bayes_Classifier_Attrition_Flag_Card_Category_Contacts_Count_12_mon_Dependent_count_Education_Level_Months_Inactive_12_mon_1', 'Naive_Bayes_Classifier_Attrition_Flag_Card_Category_Contacts_Count_12_mon_Dependent_count_Education_Level_Months_Inactive_12_mon_2'], axis=1)
    
    # カテゴリカルデータを数値に変換
    label_encoders = {}
    for column in data.select_dtypes(include=['object']).columns:
        label_encoders[column] = LabelEncoder()
        data[column] = label_encoders[column].fit_transform(data[column])
    
    # 特徴量とターゲットに分割
    X = data.drop('Attrition_Flag', axis=1)
    y = data['Attrition_Flag']
    
    # データの標準化
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    # データセットの分割
    X_train, X_test = train_test_split(X_scaled, test_size=0.3, random_state=42)

    # KMeansモデルの作成
    model = KMeans(
        n_clusters=n_clusters,
        init=init,
        n_init=n_init,
        max_iter=max_iter,
        tol=tol
    )
    
    # メモリ使用量のトラッキング開始
    tracemalloc.start()
    
    # 実行時間の計測開始
    start_time = time.time()
    
    # モデルの訓練
    model.fit(X_train)
    
    # テストデータに対する予測
    y_pred = model.predict(X_test)
    
    # 実行時間の計測終了
    elapsed_time = time.time() - start_time
    
    # メモリ使用量の計測終了
    current, peak = tracemalloc.get_traced_memory()
    tracemalloc.stop()
    memory_usage = peak / 10**6  # バイトからメガバイトに変換
    memory_usage = memory_usage / 1024  # メガバイトからギガバイトに変換
    
    # シルエットスコアの計算
    silhouette = silhouette_score(X_test, y_pred)
    
    # 詳細な評価を表示
    print("Silhouette Score:")
    print(silhouette)
    
    return silhouette, elapsed_time, memory_usage

if __name__ == "__main__":
    silhouette, elapsed_time, memory_usage = train_kmeans()
    print(f"Silhouette Score: {silhouette}")
    print(f"Elapsed Time: {elapsed_time} seconds")
    print(f"Memory Usage: {memory_usage} GB")