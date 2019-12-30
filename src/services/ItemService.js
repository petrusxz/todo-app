import axios from 'axios';
import UserService from './UserService';

class ItemService {
  static baseUrl = 'http://127.0.0.1:3000/item/';

  static async createItem(newItem) {
    try {
      const user = UserService.getCurrentUser();
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': user.token,
      };

      const item = await axios.post(ItemService.baseUrl,
        newItem,
        { headers }
      );
      return item.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  static async deleteItem(itemId) {
    try {
      const user = UserService.getCurrentUser();
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': user.token,
      };

      await axios.delete(ItemService.baseUrl + itemId,
        { headers }
      );
    } catch (error) {
      throw error.response.data;
    }
  }

  static async markAsDone(item) {
    try {
      const user = UserService.getCurrentUser();
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': user.token,
      };

      item.status = 'done';
      const modifiedItem = await axios.put(ItemService.baseUrl + item.id,
        item,
        { headers }
      );

      return modifiedItem.data;
    } catch (error) {
      throw error.response.data;
    }
  }
}

export default ItemService;