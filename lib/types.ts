export type UserInfo = {
  username: string;
  name: string;
  imgSrc?: string;
  followers?: number;
  following?: number;
};

export type User = UserInfo & {
  publicKey: string;
  privateKey: string;
};

export type ContractTradeEvent = {
  version: number,
  guid: {
    creation_number: number,
    account_address: string,
  },
  sequence_number: number,
  type: string, 
  data: { 
    is_buy: boolean,
    new_supply: number,
    protocol_fee_apt_amount: number,
    purchase_apt_amount: number,
    key_amount: number,
    subject: string,
    subject_fee_apt_amount: number,
    trader: string
  }
}

export type ContractGetOwnedCollectionsResponse = [
  string[], 
  number[]
]

export type ContractGetCollectionsResponse = [
  string[], 
  number[]
]

export type ContractGetHoldersResponse = [
  string[], 
  number[]
]