from flask import Flask, request, jsonify
from flask_cors import CORS
import k_nn
import numpy as np
import torch
from OpenAI_Chat import chat_with_openai 
import json
import os
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
        return jsonify({"message": "Login successful","playerName":playername}), 200
    else:
    # ユーザーネームに基づいたディレクトリを作成
        os.makedirs(f'../database/userdata/{playername}', exist_ok=True)
    #passwordを保存
        with open(f'../database/userdata/{playername}/password.txt', 'w') as f:
            f.write(password)
        return jsonify({"message": "Registry successful","playerName":playername}), 200
    
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

if __name__ == '__main__':
    app.run(debug=True)
