import axios from 'axios';
import UserService from './UserService';

class ProjectService {
  static baseUrl = 'http://127.0.0.1:3000/project/';

  static async getAllProjects() {
    try {
      const user = UserService.getCurrentUser();
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': user.token,
      };

      const projects = await axios.get(ProjectService.baseUrl,
        { headers }
      );

      return projects.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  static async createProject(title) {
    try {
      const user = UserService.getCurrentUser();
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': user.token,
      };

      const project = await axios.post(ProjectService.baseUrl,
        {
          userId: user.id,
          title,
        },
        { headers }
      );
      return project.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  static async updateProject(project) {
    try {
      const user = UserService.getCurrentUser();
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': user.token,
      };

      const projectResponse = await axios.put(ProjectService.baseUrl + project.id,
        {
          userId: user.id,
          title: project.newTitle,
        },
        { headers }
      );
      return projectResponse.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  static async deleteProject(projectId) {
    try {
      const user = UserService.getCurrentUser();
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': user.token,
      };

      await axios.delete(ProjectService.baseUrl + projectId,
        { headers }
      );
    } catch (error) {
      throw error.response.data;
    }
  }
}

export default ProjectService;