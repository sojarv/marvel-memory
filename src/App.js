import './App.scss';
import { useEffect, useState } from 'react';
import Card from './components/Card';
import Header from './components/Header';
import { Heroes } from './data';
import Endgame from './components/Endgame';
import md5 from 'md5';
import Footer from './components/Footer';

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [heroes, setHeroes] = useState([]);
  const [score, setScore] = useState(0);
  const [showedHeroes, setShowedHeroes] = useState([]);
  const [won, setWon] = useState(false);
  const [game, setNew] = useState(false);

  useEffect(() => {
    // Setup for fetching elements from Marvel developer sites
    const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters?name=';

    /**
     * public key, private key
     const ts = 1;
     const stringToHash = ts + privateKey + publicKey;
     const hash = md5(stringToHash);
     const ending = '&ts=' + ts + '&apikey=' + publicKey + '&hash=' + hash;
     const url = baseUrl;
     
     */
    // names from all heroes used
    const names = [
      'Doctor Strange',
      'WOLVERINE',
      'Cyclops',
      'Storm',
      'Nebula',
      'Star-Lord (Peter Quill)',
      'Nick Fury',
      'Captain Marvel (Carol Danvers)',
      'Ant-Man (Scott Lang)',
      'BLACK PANTHER',
      'Drax',
      'Rocket Raccoon',
      'Groot',
      'Odin',
      'Captain America',
      'Gamora',
      'Spider-man',
      'Vision',
      'Iron man',
      'Hulk',
      'Thor',
      'Thanos',
      'Loki',
      'SCARLET WITCH',
      'Magneto',
      'Professor X',
      'Black widow',
      'Hawkeye',
      'Falcon',
      'Bucky',
    ];

    // This is a request, that gives back the data from Marvel Develompent Portal

    /* let requests = names.map((name) => fetch(baseUrl + name + ending));

    Promise.all(requests)
      .then((responses) => {
        // all responses are resolved successfully
        //console.log(responses);
        return responses;
      })
      .then((promises) => Promise.all(promises.map((r) => r.json())))
      .then((results) => {
        results.forEach((result) => {
          console.log(result);
          setHeroes((prevState) => [
            ...prevState,
            {
              id: result.data.results[0].id,
              name: result.data.results[0].name,
              description: result.data.results[0].description,
              image:
                result.data.results[0].thumbnail.path + '/standard_xlarge.jpg',
              selected: false,
            },
          ]);
          console.log(result.data.results[0].name);
        });
      }); */

    // Shuffeles them, sets all heroes and first three ones
    shuffleArray(Heroes);
    setHeroes(Heroes);
    setShowedHeroes([Heroes[0], Heroes[1], Heroes[2]]);
  }, [game]);

  // This function is used every time it starts a new game, that it clears all already selected items
  const clearElementForNewGame = (newHeroes) => {
    const cleared = newHeroes.map((hero) => {
      const updatedHero = {
        ...hero,
        selected: false,
      };
      return updatedHero;
    });
    return cleared;
  };

  // Function for new game - sets score to 0, it isn't won, new game, clears and sets heroes
  const newGame = () => {
    setScore(0);
    setWon(false);
    setNew(true);
    const newHeroes = clearElementForNewGame(heroes);
    shuffleArray(newHeroes);
    setHeroes(newHeroes);
    setShowedHeroes([newHeroes[0], newHeroes[1], newHeroes[2]]);
  };

  // Find first element in array that wasn't selected yet.
  const findFirstFalse = (array) => {
    let el = array.find((hero) => {
      hero.selected = false;
      return hero;
    });
    return el;
  };

  // If you win the game it set to this. And clears elements in addition.
  const endGame = () => {
    const newHeroes = clearElementForNewGame(heroes);
    setWon(true);
    setNew(false);
    setScore(score + 1);
    shuffleArray(newHeroes);
    setHeroes(newHeroes);
    setShowedHeroes([newHeroes[0], newHeroes[1], newHeroes[2]]);
  };

  // Gets data from child (Card).
  const getData = (e) => {
    let heroId = Number(e);
    let el = heroes.find((hero) => hero.id === heroId);

    if (el.selected) {
      // if it is already selected then game over and new game
      newGame();
    } else {
      const newHeroes = heroes.map((hero) => {
        // else find the element
        hero.className = '';
        if (hero.id === heroId) {
          const updatedHero = {
            ...hero,
            selected: !hero.selected, // update state
          };
          return updatedHero;
        }
        return hero;
      });

      shuffleArray(newHeroes); // shuffle this new array
      let filtredfromtrue = newHeroes.filter((hero) => hero.selected !== true); // finds all that weren't selected yet

      let findFirst = findFirstFalse(filtredfromtrue); //find the first one from them.

      if (findFirst === undefined) {
        // if this is undefined (all are selected already)
        setShowedHeroes([newHeroes[0], newHeroes[1], newHeroes[2]]);
        setScore(score + 1);
        endGame(); // ends game
      } else {
        // otherwise get every element other than the one that is alredy seleceted in (findFirst)
        let others = newHeroes.filter((hero) => hero.id !== findFirst.id);
        let toShow = [findFirst, others[0], others[1]]; // make them show

        shuffleArray(toShow); // shuffle them, so there is not the same order everytime
        setHeroes(newHeroes); // sets heroes and ones for show
        setShowedHeroes(toShow);
        setScore(score + 1); // increment score
      }
    }
  };

  // Shuffles an array
  const shuffleArray = (array) => {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };

  // Gets data from child(Endgame) so it initiate new game
  const getNew = (e) => {
    setNew(e);
    setWon(false);
    setScore(0);
  };

  // if you won, then show Endgame with winning
  // else if you lost show Endgame with losing
  //      else play memory

  return (
    <div className="App">
      <Header />
      <div id="score">Your score is: {score} / 27</div>
      <div className="cardContainer">
        {won ? (
          <div id="end">
            <Endgame end={won} isNew={getNew} />
          </div>
        ) : game ? (
          <div id="end">
            <Endgame end={won} isNew={getNew} />
          </div>
        ) : (
          showedHeroes.map((hero) => {
            return (
              <Card
                selected={hero.selected}
                key={hero.id}
                id={hero.id}
                image={hero.image}
                name={hero.name}
                description={hero.description}
                childData={getData}
              />
            );
          })
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
