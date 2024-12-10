from flask import Flask, request, jsonify
from flask_cors import CORS
from KNN import train_knn
from SVM import train_svm
from RF import train_randomforest
from NN import train_neuralnetwork  # 追加
import numpy as np
import torch
from OpenAI_Chat import chat_with_openai 
import json
import os
import csv
import multiprocessing
from Kmeans import train_kmeans  # 追加
app = Flask(__name__)
CORS(app)

@app.route('/run_knn', methods=['POST'])
def run_knn():
    print("start run_knn")
    data = request.json
    
    #Check the memory limit
    taskdata=data['task']
    memorylimit=taskdata['memory']
    memorylimit=int(memorylimit)
    
    #Check the number of neighbors
    n=int(data['nNeighbors'])
    
    #Check the algorithm and metric
    algorithm=data['algorithm']
    metric=data['metric']
    
    #ここでKNNの処理を行います
    with multiprocessing.Pool() as pool:
        result=pool.apply_async(train_knn,(n,algorithm,metric,memorylimit))
        result=result.get()
    #result={accuracy, elapsed_time, mem_usage}
    responce = {
        'message': 'KNN - 処理が完了しました。',
        'accuracy': result[0],
        'elapsed_time': result[1],
        'memory_usage': result[2]
    }
    return jsonify(responce)

@app.route('/run_svm', methods=['POST'])
def run_svm():
    print("start run_svm")
    data = request.json
    
    # パラメータの取得
    taskdata = data['task']
    memorylimit = taskdata['memory']
    memorylimit = int(memorylimit)
    
    kernel = data['kernel']
    C = float(data['C'])
    gamma = data['gamma']
    degree = int(data['degree'])
    
    # ここでSVMの処理を行います
    with multiprocessing.Pool() as pool:
        result = pool.apply_async(train_svm, (C,kernel,  degree,gamma, memorylimit))
        result = result.get()
    # result={accuracy, elapsed_time, mem_usage}
    response = {
        'message': 'SVM - 処理が完了しました。',
        'accuracy': result[0],
        'elapsed_time': result[1],
        'memory_usage': result[2]
    }
    return jsonify(response)

@app.route('/run_kmeans', methods=['POST'])
def run_kmeans():
    print("start run_kmeans")
    data = request.json
    n_clusters = int(data['n_clusters'])
    init = data['init']
    n_init = int(data['n_init'])
    max_iter = int(data['max_iter'])
    tol = float(data['tol'])
    #memorylimit = int(data['memorylimit'])

    # ここでK-meansの処理を行います
    with multiprocessing.Pool() as pool:
        result = pool.apply_async(train_kmeans, (n_clusters, init, n_init, max_iter, tol))
        result = result.get()
    # result={silhouette, elapsed_time, memory_usage}
    response = {
        'message': 'K-means - 処理が完了しました。',
        'silhouette': result[0],
        'elapsed_time': result[1],
        'memory_usage': result[2]
    }
    return jsonify(response)

@app.route('/run_pca', methods=['POST'])
def run_pca():
    print("start run_pca")
    data = request.json

    # ここでPCAの処理を行います
    result = {
        'message': 'PCA - 処理が完了しました。'
    }
    return jsonify(result)

@app.route('/run_randomforest', methods=['POST'])
def run_randomforest():
    print("start run_randomforest")
    data = request.json
    
    # パラメータの取得
    taskdata = data['task']
    memorylimit = taskdata['memory']
    memorylimit = int(memorylimit)
    
    n_estimators = int(data['n_estimators'])
    max_depth = data['max_depth']
    if max_depth is not None:
        max_depth = int(max_depth)
    min_samples_split = int(data['min_samples_split'])
    min_samples_leaf = int(data['min_samples_leaf'])
    
    # ここでランダムフォレストの処理を行います
    with multiprocessing.Pool() as pool:
        result = pool.apply_async(train_randomforest, (n_estimators, max_depth, min_samples_split, min_samples_leaf, memorylimit))
        result = result.get()
    # result={accuracy, elapsed_time, mem_usage}
    response = {
        'message': 'RandomForest - 処理が完了しました。',
        'accuracy': result[0],
        'elapsed_time': result[1],
        'memory_usage': result[2]
    }
    return jsonify(response)

@app.route('/run_NN', methods=['POST'])
def run_NN():
    print("start run_NN")
    data = request.json
    
    # パラメータの取得
    taskdata = data['task']
    memorylimit = taskdata['memory']
    memorylimit = int(memorylimit)
    
    # パラメータの取得
    layers = data['layers']
    learning_rate = data['learning_rate']
    algorithm = data['algorithm']
    if learning_rate is None:
        learning_rate = 0.01  # デフォルト値を設定
    else:
        learning_rate = float(learning_rate)
    epochs = data['epochs']
    if epochs is None:
        epochs = 1000  # デフォルト値を設定
    else:
        epochs = int(epochs)
    model_type = data['model_type']
    
    # ここでNNの処理を行います

    result = train_neuralnetwork(layers, learning_rate, epochs,algorithm, model_type)

    # result={accuracy, elapsed_time, mem_usage}
    response = {
        'message': 'NN - 処理が完了しました。',
        'accuracy': result[0],
        'elapsed_time': result[1],
        'memory_usage': result[2]
    }
    return jsonify(response)

@app.route('/run_LLM', methods=['POST'])
def run_LLM():
    print("start run_LLM")
    """
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
    """
    result = {
        'message': "Not Deployed Yet"
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
        
@app.route('/api/get_quests', methods=['POST'])
def get_cards():
    data = request.get_json()
    user=data.get('user')
    file_path='../database/task/default_task/'   
    quests = []
    for filename in os.listdir(file_path):
        if filename.endswith('.json'):
            with open(file_path + filename, 'r', encoding='utf-8') as f:
                quest = json.load(f)
                quests.append(quest)
    
    # cleartask.csv からクリア済みのタスクIDを取得
    clear_task_ids = set()
    with open(f'../database/userdata/{user}/cleartask.csv', 'r', encoding='utf-8') as csvfile:
        reader = csv.reader(csvfile)
        for row in reader:
            clear_task_ids.add(row[0])
    
    print(quests)
    # quests からクリア済みのタスクを除外
    quests = [quest for quest in quests if str(quest[0].get('id')) not in clear_task_ids]
    print(quests)

    if not quests:
        return jsonify({"message": "No quests found"}), 404

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
            f.write("RF,False\n")
            f.write("NN,False\n")
            
    if os.path.exists(f'../database/userdata/{playername}/cleartask.csv'):
        pass
    else:
        with open(f'../database/userdata/{playername}/cleartask.csv', 'w') as f:
            f.write("task_id,accuracy,elapsed_time,memory_usage,model\n")
            
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

@app.route('/api/task_clear', methods=['POST'])
def task_clear():
    data = request.get_json()
    playername = data.get('username')
    taskid = data.get('task_id')
    accuracy = data.get('accuracy')
    elapsed_time = data.get('elapsed_time')
    memory_usage = data.get('memory_usage')
    model=data.get('model')
    
    with open(f'../database/userdata/{playername}/cleartask.csv', 'a') as f:
        f.write(f"{taskid},{accuracy},{elapsed_time},{memory_usage},{model}\n")
    return jsonify({"message": "Task clear successfully"}), 200

if __name__ == '__main__':
    app.run(debug=True)
