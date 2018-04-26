import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';

import schema from'./schema';

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || 'localhost';

const app = express();

app.use('/graphql', cors(), bodyParser.json(), graphqlExpress({ schema }));

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(PORT, () => {
  console.log(`Go to http://${HOST}:${PORT}/graphiql to run queries!`);
});
