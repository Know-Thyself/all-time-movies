from bs4 import BeautifulSoup
import requests
from movie import Movie
import json
from db import add_record, con


def scrap_web():
    response = requests.get("https://www.timeout.com/film/best-movies-of-all-time").text
    soup = BeautifulSoup(response, "html.parser")
    titles = soup.find_all(class_="_h3_cuogz_1")
    images = soup.find_all(name="img")
    genres = soup.find_all("ul", class_="_tagsList_163gl_5")
    summaries = soup.find_all(class_="_summary_kc5qn_21")
    images = [
        img.get("src") for img in images[1:] if not img.get("src").startswith("data")
    ]

    movies_lst = []
    # Creating a movie instance and list
    for i in range(100):
        temp_list = titles[i].text.split()
        title = " ".join(temp_list[1:-1])
        print(title, i)
        year = "".join(temp_list[-1][1:-1])
        rank = int(temp_list[0].replace(".", ""))
        id = rank
        image = f"images/image_{rank}.jpg"
        if genres[i].text[4:]:
            genre = genres[i].text[4:]
        else:
            genre = "Hybrid Genre"
        summary = summaries[i].text
        movie = Movie(id, title, year, image, rank, genre, summary)
        if year.isdigit():
            year = int(year)
        # Inserting record to database
        add_record(id, title, year, image, rank, genre, summary)
        movies_lst.append(vars(movie))
        # Downloading the actual binary image files
        binary_image = requests.get(images[i]).content
        if i != 49:
            with open(
                f"./react-frontend/public/images/image_{rank}.jpg",
                "wb",
            ) as jpeg_file:
                jpeg_file.write(binary_image)
    # Closing database connection
    con.close()
    # Creating a json file
    jsonify = json.dumps(movies_lst, indent=4)
    with open(f"movies.json", "w") as file:
        file.write(jsonify)
