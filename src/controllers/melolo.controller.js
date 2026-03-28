const { apiMelolo } = require("../libs/api");

const getMeloloLatest = async (req, res, next) => {
  try {
    const result = await apiMelolo.get("/latest");
    const books = result.data.books;

    const data = [];

    for (const book of books) {
      data.push({
        id: book.book_id,
        name: book.book_name,
        abstract: book.abstract,
        author: book.author,
        isHot: Number(book.is_hot) === 1,
        isExclusive: Number(book.is_exclusive) === 1,
        isDubbed: Number(book.is_dubbed) === 1,
        isNew: Number(book.is_new_book) === 1,
        language: book.language,
        cover: book.thumb_url,
        source: book.source,
        statInfos: book.stat_infos,
      });
    }

    res.json(data);
  } catch (error) {
    next(error);
  }
};

const getMeloloTrending = async (req, res, next) => {
  try {
    const result = await apiMelolo.get("/trending");
    const books = result.data.books;

    const data = [];

    for (const book of books) {
      data.push({
        id: book.book_id,
        name: book.book_name,
        abstract: book.abstract,
        author: book.author,
        isHot: Number(book.is_hot) === 1,
        isExclusive: Number(book.is_exclusive) === 1,
        isDubbed: Number(book.is_dubbed) === 1,
        isNew: Number(book.is_new_book) === 1,
        language: book.language,
        cover: book.thumb_url,
        source: book.source,
        statInfos: book.stat_infos,
      });
    }

    res.json(data);
  } catch (error) {
    next(error);
  }
};

const meloloSearch = async (req, res, next) => {
  try {
    const { query = "", limit = 15, offset = 0 } = req.query;

    const result = await apiMelolo.get(
      `/meloloSearch?query=${query}&&limit=${limit}&&offset=${offset}`,
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = { getMeloloLatest, getMeloloTrending, meloloSearch };
