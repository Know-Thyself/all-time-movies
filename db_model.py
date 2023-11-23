from app import db


class Movies(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(300), unique=True)
    image = db.Column(db.String(300), unique=True)
    rank = db.Column(db.String(300), unique=True)
    genre = db.Column(db.String(300))
    summary = db.Column(db.String(40000))
