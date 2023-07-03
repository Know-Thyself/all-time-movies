class Movie:
    def __init__(self, m_id, title, img, rank, summary):
        self.id = m_id
        self.title = title
        self.image = img
        self.rank = rank
        self.summary = summary

    def __str__(self):
        return f'{self.title} is a great movie that has been ranked {self.rank} in the alltime top 100 movies.'

    @classmethod
    def get(cls, m_id, title, img, rank, summary):
        return cls(m_id, title, img, rank, summary)

    def get_movie(self):
        return self
