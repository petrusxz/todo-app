import ItemModel from './ItemModel';

class ProjectModel {
  id = '';
  userId = '';
  title = '';
  itemsTodo = [];
  itemsDone = [];
  isEditing = false;
  newTitle = '';
  newItem = {};

  constructor(project) {
    this.id = project.id;
    this.userId = project.userId;
    this.title = project.title;
    if (project.items) {
      this.itemsTodo = project.items.filter(i => i.status !== 'done');
      this.itemsDone = project.items.filter(i => i.status === 'done');
    }
    this.newItem = new ItemModel(project);
  }
}

export default ProjectModel;