import {
  listTasksUrl,
  listsUrl,
  tasksUrl,
  taskUrl,
} from './api';
import axios from 'axios';
import { filterByName, orderBy } from './utils';
import { POINT_CONVERSION_HYBRID } from 'constants';

const FILTER_KEYS = {
  ALL: undefined,
  DONE: 'done',
  TODO: 'todo',
};

const resolvers = {
  Query: {
    list: async (_, { id, filter }) => {
      try {
        const response = await axios.get(listsUrl);

        return response.data.find(list => list.id === id);
      } catch (error) {
        return error;
      }
    },
    lists: async (_, { order, search }) => {
      try {
        const response = await axios.get(listsUrl);

        return orderBy(filterByName(response.data, search), order);
      } catch (error) {
        return error;
      }
    },
    listsByIds: async (_, { ids }) => {
      try {
        const response = await axios.get(listsUrl);

        return response.data.filter(item =>
          ids.indexOf(item.id) >= 0
        );
      } catch (error) {
        return error;
      }
    },
    filterList: async (_, { name }) => {
      try {
        const response = await axios.get(listsUrl);
        const regex = new RegExp(name);

        return response.data.filter(list => regexp.test(list.name));
      } catch (error) {
        return error;
      }
    },
    task: async (_, { id }) => {
      try {
        const response = await axios.get(taskUrl(id));

        return response.data;
      } catch (error) {
        return error;
      }
    },
    tasks: async () => {
      try {
        const response = await axios.get(tasksUrl);

        return response.data;
      } catch (error) {
        return error;
      }
    },
    filterTasks: (_, { name }) => {},
  },

  Mutation: {
    addTask: async (_, { list, name, is_complete }) => {
      try {
        const response = await axios.post(tasksUrl, {
          name,
          todo_list: list,
          is_complete: !!is_complete,
        })

        return response.data;
      } catch (error) {
        return error;
      }
    },

    removeTask: async (_, { id }) => {
      try {
        const response = await axios.delete(taskUrl(id));

        return { id };
      } catch (error) {
        return error;
      }
    },

    updateTask: async (_, { id, name, is_complete, list }) => {
      try {
        const response = await axios.put(taskUrl(id), {
          todo_list: list,
          is_complete,
          name,
        })

        return response.data;
      } catch (error) {
        return error;
      }
    },

    addList: async (_, { name }) => {
      try {
        const response = await axios.post(listsUrl, { name })

        return response.data;
      } catch (error) {
        return error
      }
    },

    removeList: async (_, { id }) => {
      try {
        const response = await axios.delete(listTasksUrl(id));

        return { id };
      } catch (error) {
        return error;
      }
    },

    updateList: async (_, { id, name }) => {
      try {
        const response = await axios.put(listTasksUrl(id), { name })

        return response.data;
      } catch (error) {
        return error;
      }
    },
  },

  Task: {
    list: async task => {
      try {
        const response = await axios.get(listsUrl);
        return response.data.find(list => list.id === task.todo_list)
      } catch (error) {
        return error;
      }
    },
  },

  List: {
    tasks: async (list, { filter, order, search }) => {
      const response = await axios.get(listTasksUrl(list.id));
      let tasks = response.data;

      tasks = orderBy(filterByName(tasks, search), order);

      switch (filter) {
        case FILTER_KEYS.DONE:
          return tasks.filter(task => task.is_complete)
        case FILTER_KEYS.TODO:
          return tasks.filter(task => !task.is_complete)
        default:
          return tasks;
      }
    },
    completedTasksCount: async list => {
      const response = await axios.get(listTasksUrl(list.id));
      return response.data.filter(task => task.is_complete).length;
    }
  }
};

export default resolvers;
