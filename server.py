from flask import Flask, render_template
from db import fetch_movies
from scrap import scrap_web

app = Flask(__name__)

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


@app.route("/")
def home_page():
    return render_template("index.html", movies=formatted_movies)


if __name__ == "__main__":
    if not movies:
        scrap_web()
    app.run(debug=True)
