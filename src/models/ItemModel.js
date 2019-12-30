class ItemModel {
  id = '';
  projectId = '';
  description = '';

  constructor(project) {
    this.projectId = project.id;
  }
}

export default ItemModel;
