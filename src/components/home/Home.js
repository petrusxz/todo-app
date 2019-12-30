import React, { Component, Fragment } from 'react';
import './Home.css';
import UserService from '../../services/UserService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import ProjectService from '../../services/ProjectService';
import ProjectModel from '../../models/ProjectModel';
import ProjectContainer from './../project-container/ProjectContainer';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newProjectTitle: '',
      projects: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.createProject = this.createProject.bind(this);
  }

  componentDidMount() {
    this.loadProjects();
  }

  async loadProjects() {
    try {
      const projects = await ProjectService.getAllProjects();
      this.setState({
        projects: projects.map(p => new ProjectModel(p))
      });
    } catch (error) {
      alert(error);
    }
  }

  handleChange(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  async createProject(event) {
    event.preventDefault();

    try {
      const project = await ProjectService.createProject(this.state.newProjectTitle);
      this.setState(state => {
        return {
          projects: [...state.projects, new ProjectModel(project)],
          newProjectTitle: '',
        }
      });
    } catch (error) {
      alert(error);
    }
  }

  async deleteProject(project) {
    const shouldProceed = window.confirm('Are you sure about deleting this project?');
    if (shouldProceed) {
      try {
        await ProjectService.deleteProject(project.id);
        this.setState(state => {
          return {
            projects: state.projects.filter(p => p.id !== project.id),
          }
        });
      } catch (error) {
        alert(error);
      }
    }
  }

  render() {
    return (
      <Fragment>
        <div className="Home-header">
          <b>EDirectInsure TODO List</b>
          <div>
            {UserService.getCurrentUser().name}
            <Link to="/sign-in">
              <FontAwesomeIcon
                icon={faSignOutAlt}
                size="lg"
                onClick={() => UserService.clearCredentials()} />
            </Link>
          </div>
        </div>

        <div className="Home-add-project">
          <h2>Create a new project</h2>
          <form onSubmit={this.createProject} className="secondary">
            <input
              type="text"
              name="newProjectTitle"
              value={this.state.newProjectTitle}
              onChange={this.handleChange}>
            </input>
            <input type="submit" value="Create"></input>
          </form>
        </div>

        <div className="Home-project-list">
          {this.state.projects.map((project) =>
            <ProjectContainer
              key={project.id}
              project={project}
              onDelete={this.deleteProject.bind(this, project)} />
          )}
        </div>
      </Fragment>
    );
  }
}

export default Home;