import sqlite3

DB_NAME = "movies.db"
con = sqlite3.connect(DB_NAME)
cur = con.cursor()

cur.execute("DROP TABLE IF EXISTS movies")
cur.execute(
    """CREATE TABLE IF NOT EXISTS movies(
    title TEXT,
    year INT,
    image TEXT,
    rank INT,
    summary TEXT
    )"""
)

con.commit()
print("DB Created successfully!!!")
