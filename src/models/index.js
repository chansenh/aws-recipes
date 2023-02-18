// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Recipes } = initSchema(schema);

export {
  Recipes
};