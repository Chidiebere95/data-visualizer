import apiRoutes from '../../routes/api_routes';
import { get, post } from '../../network/https';
import { ethers } from 'ethers';
// const { ethers } = require('ethers');

export default class PostsService {
  //  get all data daily
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
  //  get all data monthly
  static async getAllDataMonthly() {
    const response: any = await get({
      url: apiRoutes.getAllDataMonthly,
      baseURL: process.env.REACT_APP_URL || '',
    });
    if (!response.success) {
      throw new Error('Something went wrong');
    }
    return response.data;
  }
}
