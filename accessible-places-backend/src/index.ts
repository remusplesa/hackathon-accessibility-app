import 'reflect-metadata';
import express from 'express';
import helmet from "helmet";
import { config } from 'dotenv';
import { connect } from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { PlaceResolver, UploadResolver } from './resolvers';


const startServer = async () => {
  const app = express();
  app.use(helmet());
  config()
  
  
  await connect(`${process.env.DATABASE_URL}`)
  .then(() => console.log('Connected to MongoDB 🥌'))
  .catch((err) => console.error(`Could not connect to MongoDB => ${err}`));
  

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PlaceResolver, UploadResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  const PORT = process.env.PORT || 4001;
  app.listen(PORT, () => {
    console.log(`🚀 Server started on http://localhost:${PORT}/graphql`);
  });
};

startServer();
