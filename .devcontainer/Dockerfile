# ベースイメージを指定
FROM node:14
FROM python:3.10

# 必要なパッケージをインストール
RUN apt-get update && apt-get install -y \
    python3-venv \
    wget \
    curl \
    git \
    build-essential \
    libssl-dev \
    zlib1g-dev \
    libbz2-dev \
    libreadline-dev \
    libsqlite3-dev \
    libffi-dev

# 作業ディレクトリを作成
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./
COPY requirements.txt ./

# 依存関係をインストール
RUN npm install
RUN python3 -m venv mvenv

# アプリケーションのソースコードをコピー
COPY . .

# シェルのプロンプトをカス��マイズ
RUN echo 'export PS1="ai_nn-llm-education@\\h:\\w\\$ "' >> ~/.bashrc

#仮想環境を有効化
RUN . mvenv/bin/activate

#pythonの依存関係をインストール
RUN pip inssall --upgrade pip
RUN pip install -r requirements.txt

# アプリケーションを起動
CMD ["npm", "start"]