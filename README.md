# Project: <a href="https://lg-eshop.web.app/">flip-flops eShop</a>

## Outline

This project was designed to reinforce React learnings.
This project includes the following:

- Fetch Data within a React App
- Use react-router-dom
- Use Firebase/Firestore

## Features

This e-Shop has the following Link pages:

- Home Page
  - Contains the following:
    - A Grid of products
    - Carousel of favourited products
    - Image of cart that shows the number of items in the cart
- Add to Cart Page
  - Product page that allows you to add to cart and select product sizes
- Shopping Cart Page
  - Lists all products ordered
  - Shows total amount of items in the cart
  - Includes Proceed to Checkout button
  - Ability to change quantity of products in cart. Prevents adding of items if order quantity exceeds stock.
  - Ability to remove items from cart.
- Checkout Page
  - Order is processed and customers are advised whether processing of order was successful or not.
- All products are stored in Firestore:
  - The following product information are stored:
    - name
    - price per unit
    - image url
    - favourited or not (boolean)
    - size
    - quantity

## Other info related to project requirements

- The eShop site is responsive on different screen sizes.
- Async / await is used to retrieve data from Firestore.
- Each component uses its own SCSS file. Variables and mixins are used.
- eShop was built in React, Javascript, HTML and SCSS.
- A public repository on GitHub for the project can be found in https://github.com/lgsoftdev/eShop.
