import axios from 'axios';

class UserService {
  static baseUrl = 'http://127.0.0.1:3000/';

  static async handlePost(body, path) {
    try {
      const headers = {
        'Content-Type': 'application/json'
      };

      const credentials = await axios.post(UserService.baseUrl + path,
        body,
        { headers }
      );
      localStorage.setItem('credentials', JSON.stringify(credentials.data));
    } catch (error) {
      throw error.response.data;
    }
  }

  static signIn(email, password) {
    return UserService.handlePost({
      email,
      password
    }, 'sign-in');
  }

  static signUp(name, email, password) {
    return UserService.handlePost({
      name,
      email,
      password
    }, 'sign-up');
  }

  static getCurrentUser() {
    const credentialsStr = localStorage.getItem('credentials');
    return JSON.parse(credentialsStr);
  }
}

export default UserService;