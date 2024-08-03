from PIL import Image

# 画像のリストを作成します
image_files = ["../frontend/public/assets/rocketimage2.png","../frontend/public/assets/rocketimage.png"]  # ここにGIFに含めたい画像ファイルのパスを指定します

# 画像を開いてリストに追加します
images = [Image.open(image) for image in image_files]

# GIFを作成します
images[0].save(
    'output.gif',            # GIFファイルの出力先
    save_all=True,           # すべての画像を保存するためのオプション
    append_images=images[1:], # 最初の画像以外の画像を追加
    optimize=False,         # 最適化オプション（画像サイズを縮小）
    duration=500,           # 各フレームの表示時間（ミリ秒）
    loop=0                  # ループの回数（0は無限ループ）
)

# GIFファイルのパス
gif_path = 'output.gif'

# GIFファイルを開く
with Image.open(gif_path) as img:
    # フレーム数を取得
    frame_count = getattr(img, 'n_frames', 1)
    print(f'Number of frames: {frame_count}')

