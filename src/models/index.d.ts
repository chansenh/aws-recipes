import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerRecipes = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Recipes, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly image?: string | null;
  readonly category?: (string | null)[] | null;
  readonly ingredients?: (string | null)[] | null;
  readonly instructions?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyRecipes = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Recipes, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly image?: string | null;
  readonly category?: (string | null)[] | null;
  readonly ingredients?: (string | null)[] | null;
  readonly instructions?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Recipes = LazyLoading extends LazyLoadingDisabled ? EagerRecipes : LazyRecipes

export declare const Recipes: (new (init: ModelInit<Recipes>) => Recipes) & {
  copyOf(source: Recipes, mutator: (draft: MutableModel<Recipes>) => MutableModel<Recipes> | void): Recipes;
}