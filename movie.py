class Movie:
    def __init__(self, m_id, title, img, rank, summary):
        self.id = m_id
        self.title = title
        self.image = img
        self.rank = rank
        self.summary = summary

    def get_movie(self):
        return vars(self)
