import os
import time
from memory_profiler import memory_usage
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score

def train_knn(k, algorithm='auto', metric='minkowski', memorylimit=0):
    # Check OS (Windows or Linux)
    if os.name == 'nt':
        memorylimit = 0

    # Check the memory limit
    if memorylimit != 0:
        import resource
        resource.setrlimit(resource.RLIMIT_AS, (memorylimit, memorylimit))

    # Load dataset
    iris = load_iris()
    X, y = iris.data, iris.target

    # Split dataset into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

    # Initialize KNN classifier
    knn = KNeighborsClassifier(n_neighbors=k, algorithm=algorithm, metric=metric)

    # Measure memory usage and time
    start_time = time.time()
    mem_usage_before = memory_usage()[0]

    # Train the model
    knn.fit(X_train, y_train)

    mem_usage_after = memory_usage()[0]
    end_time = time.time()

    # Predict on the test set
    y_pred = knn.predict(X_test)

    # Calculate accuracy
    accuracy = accuracy_score(y_test, y_pred)

    # Calculate elapsed time and memory usage
    elapsed_time = end_time - start_time
    mem_usage = mem_usage_after - mem_usage_before

    return accuracy, elapsed_time, mem_usage/1024

# Example usage
if __name__ == "__main__":
    k = 3
    algorithm = 'auto'
    accuracy, elapsed_time, mem_usage = train_knn(k, algorithm)
    print(f"Accuracy: {accuracy}")
    print(f"Elapsed Time: {elapsed_time} seconds")
    print(f"Memory Usage: {mem_usage} MiB")