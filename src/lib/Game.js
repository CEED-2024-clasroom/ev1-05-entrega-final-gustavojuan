import GAMES from './games.js'

class WordNotFound extends Error {
  constructor(message) {
    super(message)
    this.name = 'WordNotFound'
  }
}

class Game {
  #gameId
  #game

  constructor(gameId = null) {
    this.#gameId = gameId !== null ? gameId : Game.randomGameId()
    this.#game = GAMES[this.#gameId]
  }

  static randomGameId() {
    return Math.floor(Math.random() * GAMES.length)
  }

  get letters() {
    return this.#game.letters
  }

  get wordPositions() {
    const words = this.#game.words.entries()
    return Array.from(words).map(
      ([word, position]) => ({ ...position, length: word.length }))
  }

  findWord(word) {
    const wordPosition = this.#game.words.get(word.toLowerCase())
    if (!wordPosition) {
      throw new WordNotFound(`La palabra ${word} no está en el juego ${this.#gameId}`)
    }
    return wordPosition
  }
}

export { Game, WordNotFound }