// Coloque aqui suas actions
export const USER_DATA = 'USER_DATA';
export const WALLET_DATA = 'WALLET_DATA';

export const userData = (payload: any) => {
  return {
    type: USER_DATA,
    payload,
  };
};

export const walletData = (payload: any) => {
  return {
    type: WALLET_DATA,
    payload,
  };
};
