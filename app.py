from flask import Flask, request, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/survey')
def survey():
    return render_template('survey/index.html')

@app.route('/submit', methods=["GET", "POST"])
def wip():
    if request.method == "POST":
        return "Under construction. Official survey will be out soon. Sorry!"
    return render_template('survey/index.html')

if __name__ == '__main__':
    app.run(debug=True)