# pokedex-react-native

#### Technologies - React Native, Redux Toolkit 

Features:
* Contains Lottie Animation(needs improvement) for the first stack screen, we are redirected to home screen - on click of button at the bottom.
* Testing done using React Native Testing Library & Jest.
* Redux Toolkit Used for storing the current pokemon in details screen & details components.

## Overview

We are using the [PokeApi](https://pokeapi.co/) to fetch the data for the pokemons. We can find the docs for the same [Here](https://pokeapi.co/docs/v2)

## Screens

1. Lottie Screen - we can navigate to Pokemon Home Screen by clicking the button
2. PokemonHome - for displaying all the pokemons in Flatlist
3. PokemonDetialsScreen - displays all the details of the Pokemon like desc, stats, weakness etc

## State

* Used Redux Toolkit to store the current Pokemon details , the same is used for the child components like PokemonDetailsHeader, PokemonDetailsStats etc
* the folder "redux" contains the store & slice files

## Coverage

Have used React Native Testing Library & Jest to write the test cases. Below is the screenshot from the coverage html. Needs Work ✍

![image](https://github.com/Sushmita-Ghosh/pokedex-react-native/assets/82622059/31212a6d-8785-491b-af25-320ce310762f)

## Features

#### Search
* We can serach the pokemons by name in the PokemonHome Screen in the text input field.
* The Search icon resets the list and restores the old Pokemon List component.

#### Filter
* Filters by Type - We can have filter the pokemons based on the various types defined in the pokeapi. On click of the icon (In Pokemon Home Screen)

# Preview
https://github.com/Sushmita-Ghosh/pokedex-react-native/assets/82622059/8faf8b37-3b50-489b-92fb-7707e1a6a4af

## ToDos

1. Testing Coverage - Improvement
2. Gradient for the images
3. Loading Indicator
4. Adding more filters
5. Performance



