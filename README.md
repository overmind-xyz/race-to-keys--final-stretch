# Race to Keys Quest

In this quest, you will compete with other developers in a challenge of skill, creativity, and speed. Build out this quest for a chance to win the keys to Overmind’s Network: the fastest-growing SocialFi app on the Aptos blockchain.

## Motivation

Race to Keys calls you to display your building prowess, by building out Network’s most requested feature to date — Keys that grant access to people on the network! For a brief story of how we got here and where this quest is leading to, read the [Race launch thread](https://twitter.com/overmind_xyz/status/1719015741192630507).

## Integration with Quest Contract

In this quest, we provide the deployed smart contract and the API to connect to the contracts.

### Contract logic

The contract contains the following logic.

- **Initializing keys for a new account**: The first key of each collection must be purchased (for free) by the account associated with the collection. This initializes the key supply for the specific subject (account).
- **Purchasing keys**: After the creator purchases the first key, anyone else can purchase keys from their collection. The price of a key will increase as the supply of keys increases. keys can only be owned in whole amounts.
- **Selling keys**: Anyone who owns a key can sell it anytime. If a key is the only one in supply, it cannot be sold.

### Contract API

In the template frontend package, we provide the middleware functionality to integrate with the contract. The middleware can be found in `contract.ts` in the `lib` directory.

## Task 1: Private Key Custody System

Build a private key storage system for the users. Your system needs to provide the following functionality:

- **Account creation**: A new Aptos account should be created when a new user logs in with their Twitter account.
- **APT transfers**: A user should be able to transfer APT to and from their Aptos account.
- **Private key access:** A user should have access to the private key of their Aptos account.
- **Private key security**: No one but the user associated with the Aptos account should have access to the private key or be able to use the account to execute transactions. An Aptos account should be used to execute transactions only when the authenticated user performs an action on the app.

**_ DO NOT STORE PRIVATE KEYS DIRECTLY IN THE DATABASE _**

- **Navigate and interact with the app**: All user interactions with the deployed contract should be handled through the provided middleware functions using the user’s associated Aptos account.

## Task 2: Fundamental Features

- ****\*\*\*\*****Sign In / Sign Out****\*\*\*\*****
  - Authentication is handled by connecting a user’s Twitter account
- **Dashboard**
  - Display connected user’s Aptos address and basic information like account balance
  - Provide the ability for users to initialize their key collection
  - Display keys owned by the current user for different accounts, along with their current value.
  - Display current protocol fees (`getProtocolFeePercentage` and `getSubjectFeePercentage`)
- ****\*\*\*\*****Search****\*\*\*\*****
  - Search for accounts and display their keys if present, including the number of keys and current value, with the option to buy
- **********\*\***********Buy / Sell Keys**********\*\***********
  - Interface to allow users to purchase or sell keys of another account’s keys
  - Integrates `buyKeyes`, `sellKeys`, and fee methods
- **Trade History**
  - Display recent trading activity by the connected user
  - Integrates `getTradeHistory`

## Bonus Task 1: Advanced Features

In addition to features 1 and 2, you are invited to add any other features to the app that you see fit. This is the spot to let your creativity go wild and show us your edge!

For example, a list of favorite keys or more detailed user pages with profile pictures and bios.

## Bonus Task 2: Key Utility

The app you’ve built so far implements functionality around keys, but it lacks one essential element: key utility. What are keys useful for? Why should someone buy your keys, apart from trading them? Keys are intended to grant access to their issuer. Let your imagine go wild here. You can look at what other SocialFi apps have implemented for inspiration, though we hope you will stretch above and beyond what others have done!

Finally, don’t forget to pay attention to the non-technical aspects of the app. In addition to your code, we will also look at the design and UX of your app! How your app looks and feels to your users is just as important as how well it works.

## What to submit

- [ ] The complete code for your app, key custody system, as well as anything built for the quest.
- [ ] A URL to a live demo instance of your app (replace the placeholder URL with your demo URL): [https://network.overmind.xyz](https://network.overmind.xyz/)
- [ ] A short description of how you built your submission. We are looking for a description of the technologies you used, the reasoning behind your design decisions, and a general guideline to help us navigate your code. A brief summary is perfect, no more is needed!

## Submission Deadline

Submissions are due by Friday, November 10th end of day ET.

## Evaluation Process

There are four stages to selection of the Race winner:

### Stage 1: Required Functionality

Submissions will be evaluated on a Pass/Fail basis, like any other Overmind quest, on the basis of functionality and correctness for the required tasks (Tasks 1 and 2).

### Stage 2: Shortlist

Accepted quests will be evaluated by the Overmind team on the following three criteria, in order to arrive at a shortlist that will make it to the community vote stage:

1. **Technical Merit (40%)**: is your implementation technically sound?
2. **Design Quality (UI/UX) (40%)**: is your app easy to use? Does it look good?
3. **Creativity and Innovation (20%)**: have you implemented innovative ideas above and beyond the requirements? The bonus tasks are the easiest way to get points here.

### Stage 3: Community Vote

Projects shortlisted by the Overmind team will be opened to the community for a vote. We will share more details on how this will work in the coming days.

### Stage 4: Interview

We will interview the top projects from the community vote, and select the final winner based on their ability to formulate and execute a vision as a founder of Network.
