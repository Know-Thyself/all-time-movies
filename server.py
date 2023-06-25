from flask import Flask, render_template
from bs4 import BeautifulSoup
import requests
from movie import Movie
import json
import sys

app = Flask(__name__)


def scrap_web():
    response = requests.get("https://www.timeout.com/film/best-movies-of-all-time").text
    soup = BeautifulSoup(response, "html.parser")
    titles = soup.find_all(class_="_h3_cuogz_1")
    images = soup.find_all(name="img")
    summaries = soup.find_all(class_="_summary_kc5qn_21")
    images = [
        img.get("src") for img in images[1:] if not img.get("src").startswith("data")
    ]

    movies = []

    # Creating a movie instance and list
    for i in range(100):
        temp_list = titles[i].text.split()
        title = " ".join(temp_list[1:])
        rank = int(temp_list[0].replace(".", ""))
        image = images[i]
        summary = summaries[i].text
        movie = Movie(i + 1, title, image, rank, summary)
        movies.append(vars(movie))

    jsonify = json.dumps(movies, indent=4)
    with open("movies.json", "w") as file:
        file.write(jsonify)

# To avoid repeated web scraping
local_file = open("movies.json", "r")
movies = json.load(local_file)


@app.route("/")
def home_page():
    return render_template("index.html", movies=movies)


if __name__ == "__main__":
    if not len(movies):
        scrap_web()
    app.run(debug=True)
