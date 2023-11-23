import sqlite3

DB_NAME = "movies.db"
con = sqlite3.connect(DB_NAME)
cur = con.cursor()

# cur.execute("DROP TABLE IF EXISTS movies")
cur.execute(
    """CREATE TABLE IF NOT EXISTS movies(
    title TEXT,
    year INT,
    image TEXT,
    rank INT,
    genre TEXT,
    summary TEXT
    )"""
)

con.commit()


def add_record(title, year, image, rank, genre, summary):
    cur.execute(
        "INSERT INTO movies VALUES(?, ?, ?, ?, ?, ?)",
        (title, year, image, rank, genre, summary),
    )
    con.commit()


def fetch_movies():
    cur.execute("SELECT * FROM movies")
    movies = cur.fetchall()
    # con.close()
    return movies
