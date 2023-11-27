from flask import Flask, render_template
from db import fetch_movies
from scrap import scrap_web
from flask.helpers import send_from_directory
from flask_cors import CORS, cross_origin
from detail import scrap_detail
import json

with open('details.json') as movies_detail:
    movies_content = movies_detail.read()

detail_content = json.loads(movies_content)

app = Flask(__name__, static_folder='react-frontend/build', static_url_path='')
CORS(app)
# Using fetched data or local file to avoid repetitive web scraping
movies = fetch_movies()

# local_file = open("movies.json", "r")
# movies = json.load(local_file)
# local_file.close()

# converting movies data from movies.db which is a list of tuples to a list of dicts
formatted_movies = [
    {"id": id, "title": t, "year": y, "image": i, "rank": r, "genre": g, "summary": s}
    for id, t, y, i, r, g, s in movies
]


@app.route("/movies")
@cross_origin()
def home_page():
    return formatted_movies


@app.route('/detail/<id>', methods=['GET'])
@cross_origin()
def detail_page(id):
    detail = [movie for movie in detail_content if movie['id'] == int(id)][0]
    return detail


@app.route("/")
@cross_origin()
def serve():
    return send_from_directory(app.static_folder, 'index.html')


if __name__ == "__main__":
    if not movies:
        scrap_web()
    app.run()
