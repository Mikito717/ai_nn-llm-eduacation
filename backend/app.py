from flask import Flask, request, jsonify
from flask_cors import CORS
import k_nn
import numpy as np
import torch

app = Flask(__name__)
CORS(app)

@app.route('/run_knn', methods=['POST'])
def run_knn():
    print("start run_knn")
    data = request.json
    data_gold=data['comsumeData_gold']
    data_purple=data['comsumeData_purple'] 
    data_blue=data['comsumeData_blue']

    #for debug
    k_value = 100*data_gold+10*data_purple+data_blue
    distance_metric = "euclidean"
    
    #k-nnを指定した学習数で実行
    #プレイヤーが、10個のお題のうち、どれかを選ぶ
    player_class=3
    distance_metric="euclidean"
    predict=k_nn_learning(1000,"euclidean","",player_class)

    #予測のラベルから、服を予測
    if predict[1]==0:
        predict[1]="T-shirt/top"
    elif predict[1]==1:
        predict[1]="Trouser"
    elif predict[1]==2:
        predict[1]="Pullover"
    elif predict[1]==3:
        predict[1]="Dress"
    elif predict[1]==4:
        predict[1]="Coat"
    elif predict[1]==5:
        predict[1]="Sandal"
    elif predict[1]==6:
        predict[1]="Shirt"
    elif predict[1]==7:
        predict[1]="Sneaker"
    elif predict[1]==8:
        predict[1]="Bag"
    elif predict[1]==9:
        predict[1]="Ankle boot"
    print( f'K: {k_value}, 距離の計量法: {distance_metric} - 処理が完了しました。あなたの画像は{predict[0]}点で{predict[1]}です.答えは、{predict[2]}です')

    return jsonify(result)

@app.route('/run_svm', methods=['POST'])
def run_svm():
    print("start run_svm")
    data =request.json

    #ここでSVMの処理を行います
    
    result = {
        'message': 'SVM - 処理が完了しました。'
    }
    return jsonify(result)

@app.route('/run_kmeans', methods=['POST'])
def run_kmeans():
    print("start run_kmeans")
    data = request.json

    #ここでK-meansの処理を行います

    result = {
        'message': 'K-means - 処理が完了しました。'
    }
    return jsonify(result)

@app.route('/run_pca', methods=['POST'])
def run_pca():
    print("start run_pca")
    data = request.json

    #ここでPCAの処理を行います

    result = {
        'message': 'PCA - 処理が完了しました。'
    }
    return jsonify(result)

@app.route('/run_randomforest', methods=['POST'])
def run_randomforest():
    print("start run_randomforest")
    data = request.json

    #ここでRandomForestの処理を行います

    result = {
        'message': 'RandomForest - 処理が完了しました。'
    }
    return jsonify(result)

@app.route('/run_RNN', methods=['POST'])
def run_RNN():
    print("start run_RNN")
    data = request.json

    #ここでRNNの処理を行います

    result = {
        'message': 'RNN - 処理が完了しました。'
    }
    return jsonify(result)

@app.route('/run_CNN', methods=['POST'])
def run_CNN():
    print("start run_CNN")
    data = request.json

    #ここでCNNの処理を行います

    result = {
        'message': 'CNN - 処理が完了しました。'
    }
    return jsonify(result)

@app.route('/run_LLM', methods=['POST'])
def run_LLM():
    print("start run_LLM")
    data = request.json

    #ここでLLMの処理を行います

    result = {
        'message': 'LLM - 処理が完了しました。'
    }
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
