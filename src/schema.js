import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

const typeDefs = `
  type List {
    id: Int!,
    name: String!,
    todos_count: Int,
    completedTasksCount: Int
    tasks(filter: String, order: String, search: String): [Task],
  }

  type Task { id: Int!, name: String!, is_complete: Boolean, list: List! }

  type Query {
    listsByIds(ids: [Int]): [List]
    filterList(name: String!): [Task]
    list(id: Int!, filter: String): List
    lists(order: String, search: String): [List]

    task(id: Int!): Task
    tasks: [Task]
    filterTasks(name: String): [Task]
  }

  type Mutation {
    addTask (
      list: Int!
      name: String!
      is_complete: Boolean
    ): Task

    removeTask (
      id: Int!
    ): Task

    updateTask (
      id: Int!
      list: Int!
      name: String!
      is_complete: Boolean
    ): Task

    addList (
      name: String!
    ): List

    removeList (
      id: Int!
    ): List

    updateList (
      id: Int!
      name: String!
    ): List
  }
`;

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
