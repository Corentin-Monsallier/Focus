from flask import Flask, jsonify, send_from_directory
import os

app = Flask(__name__)

# Path to your images folder
IMAGE_FOLDER = os.path.join(os.getcwd(), 'images')

@app.route('/list-images', methods=['GET'])
def list_images():
    try:
        image_files = [f for f in os.listdir(IMAGE_FOLDER) if f.lower().endswith(('.png', '.jpg', '.jpeg', '.gif'))]
        return jsonify(image_files)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/images/<filename>', methods=['GET'])
def serve_image(filename):
    return send_from_directory(IMAGE_FOLDER, filename)

@app.route('/list-audio', methods=['GET'])
def list_audio():
    try:
        # List all audio files in the 'audio' folder
        audio_files = [f for f in os.listdir('audio') if f.lower().endswith(('.mp3', '.wav', '.ogg'))]
        return jsonify(audio_files)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/audio/<filename>', methods=['GET'])
def serve_audio(filename):
    return send_from_directory('audio', filename)


@app.route('/')
def serve_index():
    return send_from_directory(os.getcwd(), 'index.html')

@app.route('/<path:path>')
def serve_static_files(path):
    return send_from_directory(os.getcwd(), path)

if __name__ == '__main__':
    app.run(debug=True)
