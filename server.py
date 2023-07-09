from flask import Flask, render_template
from os import path
from bs4 import BeautifulSoup
import requests
from movie import Movie
import json
from db import cur, con, movies

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

    movies_lst = []
    # Creating a movie instance and list
    for i in range(100):
        temp_list = titles[i].text.split()
        title = " ".join(temp_list[1:-1])
        year = "".join(temp_list[-1][1:-1])
        rank = int(temp_list[0].replace(".", ""))
        image = f"static/images/image_{rank}.jpg"
        summary = summaries[i].text
        movie = Movie(i + 1, title, year, image, rank, summary)
        if year.isdigit():
            year = int(year)
        cur.execute(
            "INSERT INTO movies VALUES(?, ?, ?, ?, ?)",
            (title, year, image, rank, summary),
        )
        con.commit()
        movies_lst.append(vars(movie))
        # Downloading the actual binary image files
        binary_image = requests.get(images[i]).content
        with open(
            f"static/images/image_{rank}.jpg",
            "wb",
        ) as jpeg_file:
            jpeg_file.write(binary_image)

    jsonify = json.dumps(movies_lst, indent=4)
    with open(f"movies.json", "w") as file:
        file.write(jsonify)


# To avoid repetitive web scraping
# local_file = open("movies.json", "r")
# movies = json.load(local_file)
# local_file.close()

# converting movies data from movies.db which is a list of tuples to a list of dicts
movies = [
    {"title": t, "year": y, "image": i, "rank": r, "summary": s}
    for t, y, i, r, s in movies
]


@app.route("/")
def home_page():
    return render_template("index.html", movies=movies)


if __name__ == "__main__":
    app.run(debug=True)
    if not movies:
        scrap_web()
