# Drinks

An extension of the cocktails API. It has search and shop functionality.

## How to run the app

1. Fork or clone the github repo and open up the folder in the CLI
2. Install all dependencies via the 'npm i' command.
3. Run the client locally with 'npm start'.
4. Navigate to the locally hosted client (default is http://localhost:3000/).

## Features

1. a user can search the cocktails database for drinks.
2. a user can visit a specific drink's page to learn more about it.
3. API queries are minimized when searching and navigating from specific drink pages and your search is remembered.
4. a user can add, subtract, and remove items from a cart, which leads to a checkout page.

### How to search for a drink
1. Click on the search bar near the top of the screen.
2. Start typing and your search results will show up.

### How to add a drink to the cart / visit a specific drink's page
1. For each drink displayed, there are two buttons in the bottom. To add a drink to the cart, press the 'buy' button.
2. To visit a specific drink's page, click the 'details' button.

### How to go to checkout
1. Once you have items in your cart, make sure it is visible in the top right (click the cart button with a number next to it if it is not visible.)
2. Hover over the cart and scroll down. At the bottom you will see a button that says 'to checkout'. Click it to go to the checkout page.

## Future features
- An account system for users to keep track of previous purchases, set account settings, and register a credit card to optionally fill out the checkout credit card form automatically.
- A database and server extension to keep track of the account system and add new features like a review system with CRUD functionality.

## Dependencies
- React
- Redux
- Material-UI