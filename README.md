# Race to Keys Quest

In this quest, you will compete with other developers in a challenge of speed, knowledge, and creativity. Build out this quest for a chance to win the keys to Overmind’s Network: the fastest-growing SoFi app on the Aptos network.

## Integration with Quest Contract

In this quest, we provide the deployed smart contract and the API to connect to the contracts.

### Contract logic

The contract contains the following logic.

- **Initializing keys for a new account**: The first key of each collection must be purchased (for free) by the account associated with the collection. This initializes the key supply for the specific subject (account).
- **Purchasing keys**: After the creator purchases the first key, anyone else can purchase keys from their collection. The price of a key will increase as the supply of keys increases. keys can only be owned in whole amounts.
- **Selling keys**: Anyone who owns a key can sell it anytime. If a key is the only share in supply, it cannot be sold.

### Contract API

In the template frontend package, we provide the middleware functionality to integrate with the contract. The middleware can be found in [`contract.ts`](./quest-frontend/race-to-keys-app/lib/contract.ts) in the `lib` directory.

## Object #1 - Private Key Custody System

Build a private key storage system for the users. Your system needs to provide the following functionality:

- **Account creation**: A new Aptos account should be created when a new user logs in with their Twitter account.
- **APT transfers**: A user should be able to transfer APT to and from their Aptos account.
- **Private key access:** A user should have access to the private key of their Aptos account.
- **Private key security**: No one but the user associated with the Aptos account should have access to the private key or be able to use the account to execute transactions. An Aptos account should be used to execute transactions only when the authenticated user performs an action on the app.

**_ DO NOT STORE PRIVATE KEYS DIRECTLY IN THE DATABASE _**

- **Navigate and interact with the app**: All user interactions with the deployed contract should be handled through the provided middleware functions using the user’s associated Aptos account.

## Objective #2 - App Fundamental Features

- ****\*\*\*\*****Sign In / Sign Out****\*\*\*\*****
  - Authentication is handled by connecting a user’s Twitter account
- **Dashboard**
  - Display connected user’s Aptos address and basic information like account APT balance
  - Provide the ability for users to initialize their key collection
  - Display keys owned by the current user for different accounts, along with their current value.
  - Display current protocol fees (`getProtocolFeePercentage` and `getSubjectFeePercentage`)
- ****\*\*\*\*****Search****\*\*\*\*****
  - Search for accounts and display their keys if present, including the number of keys and current value, with the option to buy
- **********\*\***********Buy / Sell Keys**********\*\***********
  - Interface to allow users to purchase or sell keys of another account’s keys
  - Integrates `buyKeys`, `sellKeys`, and fee methods
- **Trade History**
  - Display recent trading activity by the connected user
  - Integrates `getTradeHistory`

## 3. App Advanced Features

In addition to features 1 and 2, you are encouraged to add any other features and systems to the app that you see fit. This is the chance to let your creative minds go wild and show us your stuff!

For example, a list of favorite keys or more detailed user pages with profile pictures and bios.

# Bonus - Show us your attention to detail

Don’t forget to pay attention to the non-technical aspects of the app. In addition to your code, we will also look at the design and UX of your app! How your app looks and feels to your users is just as important as how well it works.

# What to submit

- [ ] The complete code for your app, key custody system, as well as anything built for the quest.
- [ ] A URL to a live demo instance of your app (replace the placeholder URL with your demo URL): [https://network.overmind.xyz](https://network.overmind.xyz/)
- [ ] A short description of how you built your submission. We are looking for a description of the technologies you used, the reasoning behind your design choices, and general guidance to help us navigate and understand your code. A brief summary is perfect, no more is needed!
