from flask import Flask, render_template
from db import fetch_movies
from scrap import scrap_web
from flask.helpers import send_from_directory
from flask_cors import CORS, cross_origin

app = Flask(__name__, static_folder='react-frontend/build', static_url_path='')
CORS(app)
# Using fetched data or local file to avoid repetitive web scraping
movies = fetch_movies()

# local_file = open("movies.json", "r")
# movies = json.load(local_file)
# local_file.close()

# converting movies data from movies.db which is a list of tuples to a list of dicts
formatted_movies = [
    {"title": t, "year": y, "image": i, "rank": r, "summary": s}
    for t, y, i, r, s in movies
]


@app.route("/movies")
@cross_origin()
def home_page():
    return formatted_movies


@app.route("/")
@cross_origin()
def serve():
    return send_from_directory(app.static_folder, 'index.html')


if __name__ == "__main__":
    if not movies:
        scrap_web()
    app.run()
