# Checkout Discounts

This is a Checkout Discount System that performs cost discount after scanning a collection of products. It allows to easily add new products and new discount rules.


## System requirements

This project is built using Node.js on top of Typescript. The following is required to run the project locally:

- Node 12.20 (or higher)
- NPM 6.14.0


## Installation and execution

The project setup is quite simple:

1. Clone this repository using git.
1. Run dependency installation with: `npm install`
1. Run the default example using: `npm run start`
1. Run all test cases using: `npm run test`

## Custom checkouts

Typescript is compiled to JavaScript on each `npm run start`, the compilation files can be found on the `dist` folder. The actual code implementation can be found under the `src` folder. 

To include a custom checkout modify the `src/index.ts` file. You can scan any product by passing in an the product ID. Scanning a non-existing product ID outputs an error.

There are two ways of creating new products on the system:
1) At runtime. This will create a new product for the current execution. Add the following on the `src/index.ts` file: 
```bash
checkout.add(7, "Shirt", "New Red Collection", 3.99)
```

2) On file-based database. Add a new product object to the database class located at: `src/database/database.ts`. This ensures the product will be available on all executions.

Once a product is created, it will be available for scanning.

To add a new rule:
1. Define a unique code to identify the rule.
1. Review the existing rule types as each rule has an associated type. 
2. Once you find a rule type that matches your expectations, modify the `values` property to accommodate to your needs.
3. Example:
```bash
{
   code: "BLACK-FRIDAY",
   type: "percentage_reduction",
   values: {
      minimum_cost: 10,
      discount_value: 10
   }
}
```

This is a discount using the "BLACK-FRIDAY" code. It is of type "percentage_reduction" which means that allows for reducing a certaing % to the total checkout cost. The values define when to apply the rule and which percentage value has to be discounted.