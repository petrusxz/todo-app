import React, { Component, Fragment } from 'react';
import './ItemsContainer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import ItemService from '../../services/ItemService';

class ItemsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newItem: this.props.itemTemplate,
      itemsTodo: this.props.itemsTodo,
      itemsDone: this.props.itemsDone,
    };

    this.addItem = this.addItem.bind(this);
    this.handleItemChange = this.handleItemChange.bind(this);
  }

  async handleItemCheckChange(item) {
    try {
      const itemDone = await ItemService.markAsDone(item);

      this.setState(state => {
        const itemIdx = state.itemsTodo.findIndex(i => i.id === item.id);
        state.itemsTodo.splice(itemIdx, 1);
        state.itemsDone = [...state.itemsDone, itemDone];

        return {
          itemsTodo: state.itemsTodo,
          itemsDone: state.itemsDone
        }
      });
    } catch (error) {
      alert(error);
    }
  }

  async deleteItem(item) {
    const shouldProceed = window.confirm('Are you sure about deleting this item?');
    if (shouldProceed) {
      try {
        await ItemService.deleteItem(item.id);

        this.setState(state => {
          const itemIdx = state.itemsTodo.findIndex(i => i.id === item.id);
          state.itemsTodo.splice(itemIdx, 1);

          return {
            itemsTodo: state.itemsTodo,
          }
        });
      } catch (error) {
        alert(error);
      }
    }
  }

  async addItem(event) {
    event.preventDefault();

    try {
      const newItem = await ItemService.createItem(this.state.newItem);
      this.setState(state => {
        state.itemsTodo = [...state.itemsTodo, newItem];
        state.newItem.description = '';

        return {
          itemsTodo: state.itemsTodo,
        }
      });
    } catch (error) {
      alert(error);
    }
  }

  handleItemChange(event) {
    const { value } = event.target;

    this.setState(state => {
      state.newItem.description = value;
      return {
        newItem: state.newItem,
      }
    });
  }

  render() {
    return (
      <Fragment>
        <div className="ItemsContainer-content">
          {(this.state.itemsTodo.length === 0 && this.state.itemsDone.length === 0) &&
            <div className="ItemsContainer-empty">
              <FontAwesomeIcon
                icon={faExclamationCircle}
                size="4x" />
              <p>This project has no tasks</p>
            </div>
          }
          {this.state.itemsTodo.length > 0 &&
            <h3>To Do</h3>
          }
          {this.state.itemsTodo.map(item =>
            <div key={item.id} className="ItemsContainer-todo">
              <input
                type="checkbox"
                onChange={() => this.handleItemCheckChange(item)}>
              </input>
              <label>{item.description}</label>
              <FontAwesomeIcon
                icon={faTrash}
                className="ItemsContainer-remove"
                onClick={() => this.deleteItem(item)} />
            </div>
          )}

          {this.state.itemsDone.length > 0 &&
            <h3>Done</h3>
          }
          {this.state.itemsDone.map(item =>
            <div key={`done${item.id}`} className="ItemsContainer-done">
              <input type="checkbox" checked disabled></input>
              <label className="ItemsContainer-tooltip">
                {item.description}
                <span className="ItemsContainer-tooltiptext">
                  Ended on: <br/>{
                    new Date(item.finishAt)
                      .toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                  }
                </span>
              </label>
            </div>
          )}
        </div>

        <div className="ItemsContainer-add">
          <form onSubmit={this.addItem} className="secondary">
            <input
              type="text"
              value={this.state.newItem.description}
              onChange={this.handleItemChange}>
            </input>
            <input
              type="submit"
              value="Add">
            </input>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default ItemsContainer;
