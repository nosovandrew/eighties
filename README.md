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
  - [ ] information pages (contacts, delivery, etc);
  - [ ] ADVANCED styling sys (hsla + vars)

### MVP tasks:
- [ ] checking:
  - [ ] CONTEXT API error/warn state;
  - [ ] forms (validation);
  - [ ] if product "out of stock";
  - [ ] inc cart;
  - [x] empty cart;
  - [ ] when order is creating (check qty for items);
- [x] cart icon (not using);
- [x] loading indicator in making order;
- [ ] product addToCart:
  - [x] indicate clicked;
  - [x] several clicks (do nothing);
  - [ ] press animation;
- [x] product page info! (preorder moved to QTY);
- [x] add currency to prices + price format;
- [ ] home style;
- [ ] logo!!! + brand name;
- [x] new order notification;
- [ ] SEO + PWA;
