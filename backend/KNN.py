from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score

def train_knn(k, algorithm='auto', metric='minkowski'):
    # Load dataset
    iris = load_iris()
    X, y = iris.data, iris.target
    
    # Split dataset into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)
    
    # Initialize KNN classifier
    knn = KNeighborsClassifier(n_neighbors=k, algorithm=algorithm, metric=metric)
    
    # Train the model
    knn.fit(X_train, y_train)
    
    # Predict on the test set
    y_pred = knn.predict(X_test)
    
    # Calculate accuracy
    accuracy = accuracy_score(y_test, y_pred)
    
    return accuracy

# Example usage
if __name__ == "__main__":
    k = 3
    algorithm = 'auto'
    metric = 'minkowski'
    accuracy = train_knn(k, algorithm, metric)
    print(f"Model accuracy: {accuracy}")