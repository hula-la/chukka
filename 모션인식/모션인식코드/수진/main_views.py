from flask import Blueprint, Response, url_for
from werkzeug.utils import redirect

from motionDetection import gen_frames

app = Blueprint('main', __name__, url_prefix='/')

@app.route('/')
def index():
    global keyp_list
    return Response(gen_frames(r'dance_video/dancer.mp4', 0, keyp_list), mimetype='multipart/x-mixed-replace; boundary=frame')

# if __name__ == '__main__':
#     app.run(debug=False,host="127.0.0.1",port=5000)


if __name__ == "__main__":
    app.run(debug=False, host="127.0.0.1", port=5000)
