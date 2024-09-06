from flask import Flask, request, jsonify
from flask_cors import CORS
import k_nn

app = Flask(__name__)
CORS(app)

@app.route('/run_knn', methods=['POST'])
def run_knn():
    print("start run_knn")
    data = request.json
    #k_value = data['k']#k>=100
    #distance_metric = data['distance_metric']

    #for debug
    k_value = 100
    distance_metric = "euclidean"
    
    #try:
    # ここでK-NNの処理を行います
    new_image_path = '.\\PetImages\\test_cat.jpg'
    predict=k_nn.k_nn_learning(k_value, distance_metric, new_image_path)
    
    #予測のラベルから、猫か犬かを判定
    if predict[1]==0:
        predict[1]="猫"
    else:
        predict[1]="犬"
    result = {
        'message': f'K: {k_value}, 距離の計量法: {distance_metric} - 処理が完了しました。あなたの画像は{predict[0]}点で{predict[1]}です'
    }
    """except:
        result = {
        'message': f'K: {k_value}, 距離の計量法: {distance_metric} - 処理が失敗しました。'
        }
    """
    
    return jsonify(result)

def run_svm():
    print("start run_svm")
    data =request.json

    #ここでSVMの処理を行います
    
    result = {
        'message': 'SVM - 処理が完了しました。'
    }
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
