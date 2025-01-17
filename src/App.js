import React from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // currWord is the current secret word for this round. Update this with this.setState after each round.
      currWord: getRandomWord(),
      // guessedLetters stores all letters a user has guessed so far
      guessedLetters: [],
      // Insert num guesses left state here
      numOfGuesses: 5,
      // Insert form input state here
      input: "",
      guessedWord: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  generateWordDisplay = () => {
    const wordDisplay = [];
    // for...of is a string and array iterator that does not use index
    for (let letter of this.state.currWord) {
      if (this.state.guessedLetters.includes(letter)) {
        wordDisplay.push(letter);
      } else {
        wordDisplay.push("_");
      }
    }
    return wordDisplay.toString();
  };

  // Insert form callback functions handleChange and handleSubmit here
  handleChange(event) {
    this.setState({ input: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    let userInput = this.state.input;

    if (userInput === "") {
      return;
    }

    let outcome = this.checkIfCorrect(userInput);
    console.log(`outcome: ${outcome}`);

    this.setState((state) => ({
      guessedLetters: [...state.guessedLetters, userInput],
      input: "",
      numOfGuesses: [...this.state.currWord].includes(userInput)
        ? this.state.numOfGuesses
        : this.state.numOfGuesses - 1,
      guessedWord: outcome,
    }));
    console.log(this.state.numOfGuesses);
  }

  checkIfCorrect(input) {
    let correctWord = [...this.state.currWord];
    let userInputs = [...this.state.guessedLetters, input];
    let userHasGuessed = false;

    for (let i = 0; i < correctWord.length; i++) {
      if (!userInputs.includes(correctWord[i])) {
        return (userHasGuessed = false);
      }
    }
    return (userHasGuessed = true);
  }

  gameForm = () => {
    if (!this.state.guessedWord && this.state.numOfGuesses > 0) {
      return (
        <>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={this.state.input}
              onChange={this.handleChange}
              maxLength="1"
              minLength="1"
            />
            <input type="submit" value="submit" />
          </form>
          <h4>Guesses remaining: {this.state.numOfGuesses}</h4>
        </>
      );
    } else if (this.state.guessedWord) {
      return (
        <>
          <p>You guessed the word! Reset game to try again.</p>
          <button onClick={this.resetGame}>Reset Game</button>
        </>
      );
    } else if (!this.state.guessedWord && this.state.numOfGuesses === 0) {
      return (
        <>
          <p>You ran out of guesses! Reset game to try again.</p>
          <button onClick={this.resetGame}>Reset Game</button>
        </>
      );
    }
  };

  resetGame = () => {
    this.setState({
      currWord: getRandomWord(),
      guessedLetters: [],
      numOfGuesses: 10,
      input: "",
      guessedWord: false,
    });
  };

  render() {
    console.log(`correct word: ${this.state.currWord}`);

    return (
      <div className="App">
        <header className="App-header">
          <h1>Guess The Word 🚀</h1>
          <h3>Word Display</h3>
          {this.generateWordDisplay()}
          <h3>Guessed Letters</h3>
          {this.state.guessedLetters.length > 0
            ? this.state.guessedLetters.toString()
            : "-"}
          <h3>Input</h3>
          {/* Insert form element here */}
          {this.gameForm()}
        </header>
      </div>
    );
  }
}

export default App;
