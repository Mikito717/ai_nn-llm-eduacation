from flask import Flask, request, jsonify
from flask_cors import CORS
from KNN import     train_knn
import numpy as np
import torch
from OpenAI_Chat import chat_with_openai 
import json
import os
import csv
app = Flask(__name__)
CORS(app)

@app.route('/run_knn', methods=['POST'])
def run_knn():
    print("start run_knn")
    data = request.json
    print(data)
    #ここでKNNの処理を行います
    result=train_knn(int(data['nNeighbors']), data['algorithm'], data['metric'])
    print(result)
    result = {
        'message': 'KNN - 処理が完了しました。',
        'accuracy': result
    }
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
    message = data.get('message')
    chatnumber = data.get('chatNumber')
    reset_flag = data.get('resetflag')
    username = data.get('username')
    print(f"message: {message}, chatnumber: {chatnumber}, reset_flag: {reset_flag}, username: {username}")
    
    responce=chat_with_openai(message,chatnumber,username,reset_flag)

    if responce=="Conversation reset successfully":
        return  200
    elif reset_flag:
        return responce

    result = {
        'message': responce
    }
    return jsonify(result)

@app.route('/api/receive_LLM_results', methods=['POST'])
def receive_LLM_results():
    data = request.get_json()
    finalanswer = data.get('finalanswer')
    correctanswer = data.get('correctanswer')
    score = data.get('score')
    username = data.get('username')
    
    #現在時間を取得
    from datetime import datetime
    current_time = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    
    #会話履歴を保存
    import glob
    import os
    conversation_files = glob.glob(f'./database/userdata/{username}/LLM_results_data/role*_conversation_tmp.txt')
    for conversation_file in conversation_files:
        filename=os.path.basename(conversation_file)
        new_filename = filename.replace("_conversation_tmp.txt", f"_conversation_{current_time}.txt")
        new_file_path = f'./database/userdata/{username}/LLM_results_data/{new_filename}'
        os.rename(conversation_file, new_file_path)

    
    #ユーザーネームなどをcsvに保存
    with open(f'./database/userdata/{username}/LLM_results_data.csv', 'a') as f:
        f.write(f"{username},{finalanswer},{correctanswer},{score},{current_time}\n")
    
    # ここでデータを処理します（例：データベースに保存）
    print(f"Final Answer: {finalanswer}")
    print(f"Correct Answer: {correctanswer}")
    print(f"Score: {score}")
    
    return jsonify({"message": "Data received successfully"}), 200
        
@app.route('/api/quests', methods=['GET'])
def get_cards():

    file_path='../database/task/default_task/'   
    quests = []
    for filename in os.listdir(file_path):
        if filename.endswith('.json'):
            with open(file_path + filename, 'r', encoding='utf-8') as f:
                quest = json.load(f)
                quests.append(quest)
    if quests is None:
        return jsonify({"message": "No quests found"}), 404
    print(quests)
    return jsonify(quests)

@app.route('/api/quests', methods=['POST'])
def post_cards():
    data = request.get_json()
    file_path='../database/task/created_task/created_task.json'   
    with open(file_path, 'a') as f:
        json.dump(data, f, indent=4)
    return jsonify({"message": "Data received successfully"}), 200

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    playername = data.get('username')
    password = data.get('password')
    isInitialLogin = data.get('initialRegistration')
    print(playername, password, isInitialLogin)
    
        # ユーザーネームに基づいたディレクトリを検索

    if os.path.exists(f'../database/userdata/{playername}'):
        #passwordを読み込み
        with open(f'../database/userdata/{playername}/password.txt', 'r') as f:
            saved_password = f.read()
        if saved_password != password:
            return jsonify({"message": "Login failed. Password is Incorrect."}), 401
    else:
    # ユーザーネームに基づいたディレクトリを作成
        os.makedirs(f'../database/userdata/{playername}', exist_ok=True)
    #passwordを保存
        with open(f'../database/userdata/{playername}/password.txt', 'w') as f:
            f.write(password)
            
    #ユーザーデータが存在するかの確認
    if os.path.exists(f'../database/userdata/{playername}/ml_models.csv'):
        pass
    else:
        with open(f'../database/userdata/{playername}/ml_models.csv', 'w') as f:
            f.write("model_name,having\n")
            f.write("KNN,True\n")
            f.write("SVM,False\n")
            f.write("Kmeans,False\n")
            f.write("PCA,False\n")
            f.write("RandomForest,False\n")
            f.write("RNN,False\n")
            f.write("CNN,False\n")
            
    return jsonify({"message": "Login successful","playerName":playername}), 200
    
@app.route('/api/set_planet_number', methods=['POST'])
def set_planet_number():
    data = request.get_json()
    print(data)
    playername = data.get('user')
    gold = data.get('gold')
    purple = data.get('purple')
    blue = data.get('blue')
    if(os.path.exists(f'../database/userdata/{playername}/planet_number.csv')):
        with open(f'../database/userdata/{playername}/planet_number.csv', 'a') as f:
            f.write(f"{gold},{purple},{blue}\n")
    else:
        with open(f'../database/userdata/{playername}/planet_number.csv', 'a') as f:
            f.write("gold,purple,blue\n")
            f.write(f"{gold},{purple},{blue}\n")
        
    return jsonify({"message": "Data received successfully"}), 200

@app.route('/api/get_planet_number', methods=['POST'])
def get_planet_number():
    data = request.get_json()
    playername = data.get('user')
    planet_number = []
    with open(f'../database/userdata/{playername}/planet_number.csv', 'r') as f:
        last_line = None
        for line in f:
            last_line = line
        if last_line:
            planet_number.append(last_line)
    return jsonify(planet_number)

@app.route('/api/get_ml_models', methods=['POST'])
def get_ml_models():
    data = request.get_json()
    playername = data.get('user')
    ml_models = []
    with open(f'../database/userdata/{playername}/ml_models.csv', 'r') as f:
        reader = csv.DictReader(f)
        for row in reader:
            ml_models.append(row)
    return jsonify(ml_models)

if __name__ == '__main__':
    app.run(debug=True)
