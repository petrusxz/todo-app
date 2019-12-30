import React, { Component, Fragment } from 'react';
import './ProjectContainer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import ProjectService from '../../services/ProjectService';
import ItemsContainer from '../items-container/ItemsContainer';

class ProjectContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: this.props.project
    };

    this.toggleProjectEdit = this.toggleProjectEdit.bind(this);
    this.updateProject = this.updateProject.bind(this);
    this.handleProjectChange = this.handleProjectChange.bind(this);
  }

  toggleProjectEdit() {
    this.setState(state => {
      state.project.isEditing = !state.project.isEditing;
      state.project.newTitle = state.project.title;

      return {
        project: state.project,
      }
    });
  }

  async updateProject(event) {
    event.preventDefault();

    try {
      await ProjectService.updateProject(this.state.project);
      this.setState(state => {
        state.project.title = state.project.newTitle;
        state.project.isEditing = false;

        return {
          project: state.project,
        }
      });
    } catch (error) {
      alert(error);
    }
  }

  handleProjectChange(event) {
    const { value } = event.target;

    this.setState(state => {
      state.project.newTitle = value;

      return {
        project: state.project,
      }
    });
  }

  render() {
    return (
      <div className="ProjectContainer-card">
        <div className="ProjectContainer-card-header">
          {!this.state.project.isEditing
            ?
            this.state.project.title
            :
            <div className="ProjectContainer-edit">
              <FontAwesomeIcon
                icon={faTimesCircle}
                onClick={this.toggleProjectEdit} />
              <form onSubmit={this.updateProject}>
                <input
                  type="text"
                  value={this.state.project.newTitle}
                  onChange={this.handleProjectChange}>
                </input>
              </form>
            </div>
          }
          <div className="ProjectContainer-actions">
            {!this.state.project.isEditing
              ?
              <Fragment>
                <FontAwesomeIcon
                  icon={faPen}
                  onClick={this.toggleProjectEdit} />
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={this.props.onDelete} />
              </Fragment>
              :
              <span>
                Save
              </span>
            }
          </div>
        </div>

        <ItemsContainer
          itemTemplate={this.state.project.newItem}
          itemsTodo={this.state.project.itemsTodo}
          itemsDone={this.state.project.itemsDone} />
      </div>
    );
  }
}

export default ProjectContainer;