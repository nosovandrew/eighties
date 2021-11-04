# 80 📦

### FUNCTIONALITY In progress (global scope):

- [x] GraphQL supporting;
- [ ] GraphQL ADVANCED supporting:
  - [ ] return mutation status;
  - [ ] handle custom errors;
  - [ ] 🔥🔥🔥 external GraphQL API (backend server) -> will solve problem with gql queries in getStaticProps/getStaticPaths in build mode.
- [x] products and collections (drops) static rendering;
- [x] basic cart functionality;
- [ ] persistent cart (❌cookies or ✅localStorage);
  - [x] add backup cart functionality;
  - [x] check if user changed localStorage values (for example, reduce price) MAKED: checking before order is throwing to db;
- [ ] order page functionality;
  - [x] simple order/preorder functionality (without payment);
  - [ ] custom orderNumber instead of MongoDB _id;
  - [ ] order with payment;
- [ ] payment functionality;
- [ ] *optional* create and store user token + carts, orders, payments linked to it in db;
- [ ] Simple DESIGN:
  - [ ] brand style (logo, colors);
  - [ ] home;
  - [x] drop;
  - [x] product;
  - [x] cart;
  - [x] order (preorder, successpreorder pages);
  - [ ] payment?;
  - [ ] information pages (contacts, delivery, etc).

### MVP tasks:
- [ ] checking:
  - [ ] forms (validation);
  - [ ] if product "out of stock";
  - [ ] in cart (inc qty, empty cart);
  - [ ] when order is creating (check qty for items);
- [ ] cart icon?;
- [ ] product addToCart (several clicks, indicate clicked);
- [x] product page info! (preorder moved to QTY);
- [x] add currency to prices + price format;
- [ ] home style;
- [ ] logo!!! + brand name;
- [ ] new order notification;
- [ ] SEO + PWA;
