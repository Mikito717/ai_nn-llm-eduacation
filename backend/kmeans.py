import numpy as np

class KMeans:
	def __init__(self, n_clusters=3, max_iter=300, tol=1e-4):
		self.n_clusters = n_clusters
		self.max_iter = max_iter
		self.tol = tol

	def initialize_centroids(self, X):
		indices = np.random.choice(X.shape[0], self.n_clusters, replace=False)
		return X[indices]

	def assign_clusters(self, X, centroids):
		distances = np.linalg.norm(X[:, np.newaxis] - centroids, axis=2)
		return np.argmin(distances, axis=1)

	def update_centroids(self, X, labels):
		centroids = np.zeros((self.n_clusters, X.shape[1]))
		for k in range(self.n_clusters):
			centroids[k] = X[labels == k].mean(axis=0)
		return centroids

	def fit(self, X):
		self.centroids = self.initialize_centroids(X)
		for i in range(self.max_iter):
			self.labels = self.assign_clusters(X, self.centroids)
			new_centroids = self.update_centroids(X, self.labels)
			if np.all(np.abs(new_centroids - self.centroids) < self.tol):
				break
			self.centroids = new_centroids

	def predict(self, X):
		return self.assign_clusters(X, self.centroids)

	def private_method(self):
		pass