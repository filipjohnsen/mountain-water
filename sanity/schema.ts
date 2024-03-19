import { type SchemaTypeDefinition } from "sanity";
import { documents } from "./documents";
import { objects } from "./objects";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [...documents, ...objects],
};
