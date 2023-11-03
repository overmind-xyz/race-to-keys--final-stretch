import {
  AptosAccount,
  AptosClient,
  CoinClient,
  FaucetClient,
  HexString,
  Network,
  Provider,
} from "aptos";
import {
  ContractGetCollectionsResponse,
  ContractGetHoldersResponse,
  ContractGetOwnedCollectionsResponse,
  ContractTradeEvent,
  User,
} from "./types";

const MODULE_ADDRESS =
  "0xedfa769774f2418e706fd38318e457030aa6fd632c827efa48decd9340061403";
const RESOURCE_ACCOUNT_ADDRESS =
  "0x121b76dc1d52f73904d30dd7d80e8eefea22f5a0b6b26d02d007b32b3ea9e454";
const MODULE_NAME = "race_to_keys";

const client = new AptosClient("https://fullnode.testnet.aptoslabs.com");
const faucetClient = new FaucetClient(
  "https://fullnode.testnet.aptoslabs.com",
  "https://faucet.testnet.aptoslabs.com"
);
const coinClient = new CoinClient(client);
const provider = new Provider(Network.TESTNET);

const TRANSACTION_OPTIONS = {
  max_gas_amount: "500000",
  gas_unit_price: "100",
};

export async function getAptosBalance(address: string) {
  try {
    const balance = await coinClient.checkBalance(address);
    console.log("balance", balance);
    return Number(balance) / 1_0000_0000;
  } catch (e) {
    console.log("error getting balance", e);
    return 0;
  }
}

async function fundAccount(accountToFund: AptosAccount) {
  try {
    if ((await getAptosBalance(accountToFund.address().toString())) > 0.5) {
      return;
    }
  } catch (e) {
    // ignore
  }

  await faucetClient.fundAccount(accountToFund.address(), 5000_0000);
}

/* 
  Buys keys of a key subject.
  @param buyer - The user buying the keys. This contains the private key of the account.
  @param keySubjectAddress - The address of the key subject.
  @param amountToBuy - The amount of keys to buy.
*/
export async function buyKeys(
  buyer: User,
  keySubjectAddress: string,
  amountToBuy: number
) {
  const buyerAccount = new AptosAccount(
    new HexString(buyer.privateKey).toUint8Array()
  );

  await fundAccount(buyerAccount);

  const rawTxn = await provider.generateTransaction(buyerAccount.address(), {
    function: `${MODULE_ADDRESS}::${MODULE_NAME}::buy_keys`,
    type_arguments: [],
    arguments: [keySubjectAddress, amountToBuy],
  });

  const tx = await provider.signAndSubmitTransaction(buyerAccount, rawTxn);

  await client.waitForTransaction(tx, { checkSuccess: true });
}

/* 
  Sells keys of a key subject.
  @param seller - The user selling the keys. This contains the private key of the account.
  @param keySubjectAddress - The address of the key subject.
  @param amountToSell - The amount of keys to sell.
*/
export async function sellKeys(
  seller: User,
  keySubjectAddress: string,
  amountToSell: number
) {
  const sellerAccount = new AptosAccount(
    new HexString(seller.privateKey).toUint8Array()
  );

  await fundAccount(sellerAccount);

  const rawTxn = await provider.generateTransaction(
    sellerAccount.address(),
    {
      function: `${MODULE_ADDRESS}::${MODULE_NAME}::sell_keys`,
      type_arguments: [],
      arguments: [keySubjectAddress, amountToSell],
    },
    TRANSACTION_OPTIONS
  );

  const tx = await provider.signAndSubmitTransaction(sellerAccount, rawTxn);

  await client.waitForTransaction(tx, { checkSuccess: true });
}

/* 
  Get the buy price for a given amount of keys for a key subject.
  @param keySubjectAddress - The address of the key subject.
  @param amount - The amount of keys to buy.
*/
export async function getBuyPrice(keySubjectAddress: string, amount: number) {
  const response = (
    await provider.view({
      function: `${MODULE_ADDRESS}::${MODULE_NAME}::get_buy_price`,
      type_arguments: [],
      arguments: [keySubjectAddress, amount.toString()],
    })
  )[0] as unknown as number;

  return response / 1_0000_0000;
}

/* 
  Get the sell price for a given amount of keys for a key subject.
  @param keySubjectAddress - The address of the key subject.
  @param amount - The amount of keys to sell.
*/
export async function getSellPrice(keySubjectAddress: string, amount: number) {
  const response = (
    await provider.view({
      function: `${MODULE_ADDRESS}::${MODULE_NAME}::get_sell_price`,
      type_arguments: [],
      arguments: [keySubjectAddress, amount.toString()],
    })
  )[0] as unknown as number;

  return response / 1_0000_0000;
}

/*
  Get the buy price after fees for a given amount of keys for a key subject.
  @param keySubjectAddress - The address of the key subject.
  @param amount - The amount of keys to buy.
*/
export async function getBuyPriceAfterFees(
  keySubjectAddress: string,
  amount: number
) {
  const response = (
    await provider.view({
      function: `${MODULE_ADDRESS}::${MODULE_NAME}::get_buy_price_after_fees`,
      type_arguments: [],
      arguments: [keySubjectAddress, amount.toString()],
    })
  )[0] as unknown as number;

  return response / 1_0000_0000;
}

/*
  Get the sell price after fees for a given amount of keys for a key subject.
  @param keySubjectAddress - The address of the key subject.
  @param amount - The amount of keys to sell.
*/
export async function getSellPriceAfterFees(
  keySubjectAddress: string,
  amount: number
) {
  const response = (
    await provider.view({
      function: `${MODULE_ADDRESS}::${MODULE_NAME}::get_sell_price_after_fees`,
      type_arguments: [],
      arguments: [keySubjectAddress, amount.toString()],
    })
  )[0] as unknown as number;

  return response / 1_0000_0000;
}

/*
  Get the key balance for a given user and key subject.
  @param keyOwnerAddress - The address of the user.
  @param keySubjectAddress - The address of the key subject.
*/
export async function getKeyBalance(
  keyOwnerAddress: string,
  keySubjectAddress: string
) {
  const response = (
    await provider.view({
      function: `${MODULE_ADDRESS}::${MODULE_NAME}::get_key_balance`,
      type_arguments: [],
      arguments: [keyOwnerAddress, keySubjectAddress],
    })
  )[0] as unknown as number;

  return response;
}

/* 
  Get the key supply for a given key subject.
  @param keySubjectAddress - The address of the key subject.
*/
export async function getKeySupply(keySubjectAddress: string) {
  const response = (
    await provider.view({
      function: `${MODULE_ADDRESS}::${MODULE_NAME}::get_key_supply`,
      type_arguments: [],
      arguments: [keySubjectAddress],
    })
  )[0] as unknown as number;

  return response;
}

/*
  Get the protocol's fee percentage. This is the percentage of the total transaction that is taken as a fee.
*/
export async function getProtocolFeePercentage() {
  const response = (
    await provider.view({
      function: `${MODULE_ADDRESS}::${MODULE_NAME}::get_protocol_fee_percentage`,
      type_arguments: [],
      arguments: [],
    })
  )[0] as unknown as number;

  return response / 1_0000_0000;
}

/*
  Get the subject's fee percentage. This is the percentage of the total transaction that is taken as a fee.
*/
export async function getSubjectFeePercentage() {
  const response = (
    await provider.view({
      function: `${MODULE_ADDRESS}::${MODULE_NAME}::get_subject_fee_percentage`,
      type_arguments: [],
      arguments: [],
    })
  )[0] as unknown as number;

  return response / 1_0000_0000;
}

/*
  Get the list of key subjects who the user owns keys in.
  @param user - The user to get the owned collections for.
*/
export async function getOwnedCollections(user: User) {
  const response = (await provider.view({
    function: `${MODULE_ADDRESS}::${MODULE_NAME}::get_owned_keys`,
    type_arguments: [],
    arguments: [user.publicKey],
  })) as ContractGetOwnedCollectionsResponse;

  return response[0].map((collection, index) => ({
    address: collection,
    keys: response[1][index],
  }));
}

/*
  Get the list of all key subjects on the protocol.
  @param user - The user to see if they own keys in the key subject.
*/
export async function getKeySubjects(user?: User) {
  const response = (await provider.view({
    function: `${MODULE_ADDRESS}::${MODULE_NAME}::get_all_key_collections`,
    type_arguments: [],
    arguments: [user?.publicKey || "0x0"],
  })) as ContractGetCollectionsResponse;

  return response[0].map((collection, index) => ({
    address: collection,
    keys: response[1][index],
  }));
}

/*
  Get the list of holders for a given key subject.
  @param keySubjectAddress - The address of the key subject.
*/
export async function getKeyHolders(keySubjectAddress: string) {
  const response = (await provider.view({
    function: `${MODULE_ADDRESS}::${MODULE_NAME}::get_key_holders`,
    type_arguments: [],
    arguments: [keySubjectAddress],
  })) as ContractGetHoldersResponse;

  return response[0].map((holder, index) => ({
    address: holder,
    keys: response[1][index],
  }));
}

/*
  Get the trading event history for the last 50,000 trades on the protocol. 
*/
export async function getTradeHistory() {
  const response = (await provider.getEventsByEventHandle(
    RESOURCE_ACCOUNT_ADDRESS,
    `${MODULE_ADDRESS}::${MODULE_NAME}::TradeEvents`,
    "trade_events",
    {
      limit: 50_000,
    }
  )) as unknown as ContractTradeEvent[];

  return response.reverse();
}
