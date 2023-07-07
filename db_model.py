from server import db


class Movies(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(300), unique=True)
    image = db.Column(db.String(300), unique=True)
    summary = db.Column(db.String(4000))
