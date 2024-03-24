import apiRoutes from '../../routes/api_routes';
import { get, post } from '../../network/https';
import { ethers } from 'ethers';
// const { ethers } = require('ethers');

export default class PostsService {
  //  get all tokens
  static async getAllTokens() {
    const response: any = await get({
      url: apiRoutes.getAllTokens,
      baseURL: process.env.REACT_APP_URL_2 || '',
    });
    if (response.status !== 'success') {
      throw new Error('Something went wrong');
    }
    return response.data;
  }
  //  get token details
  static async getTokenDetails(params: any) {
    // const { ethers } = require('ethers');
    console.log('aaaa');

    const provider = new ethers.providers.JsonRpcProvider(
      params.nodeProviderUrl
    );
    console.log('bbb');
    const contractABI = [
      'function name() view returns (string)',
      'function symbol() view returns (string)',
      'function decimals() view returns (uint8)',
      'function totalSupply() view returns (uint256)',
      'function balanceOf(address) view returns (uint)',
    ];
    console.log('ccc');
    console.log('params', params);
    const stringify = JSON.stringify(contractABI);
    console.log('stringify', stringify);
    let contract;
    try {
      contract = new ethers.Contract(
        params.contractAddress,
        contractABI,
        provider
      );

      console.log('dddd', contract);
    } catch (error) {
      console.log('error k', error);
    }

    try {
      if (contract) {
        console.log('1');
        const name = await contract.name();
        console.log('2');
        const symbol = await contract.symbol();
        console.log('3');
        let decimals = await contract.decimals();
        decimals = decimals.toString();
        // decimals = ethers.utils.formatUnits(decimals);
        //  decimals = decimals * 1e18;

        console.log('Contract Symbol:', symbol);
        console.log('Contract Name:', name);
        console.log('Contract Decimals:', decimals);

        let usersTokenBalance = await contract.balanceOf(params.publicKey);
        usersTokenBalance = ethers.utils.formatUnits(usersTokenBalance);
        console.log('usersTokenBalance2', usersTokenBalance);
        return {
          name,
          symbol,
          decimals,
          usersTokenBalance,
        };
      }
    } catch (error: any) {
      console.error('Error retrieving contract information:', error.message);
    }
  }
  //  get token details
  static async getAllDataDaily() {
    const response: any = await get({
      url: apiRoutes.getAllDataDaily,
      baseURL: process.env.REACT_APP_URL || '',
    });
    if (!response.success) {
      throw new Error('Something went wrong');
    }
    return response.data;
  }
}
