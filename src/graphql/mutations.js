/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createRecipes = /* GraphQL */ `
  mutation CreateRecipes(
    $input: CreateRecipesInput!
    $condition: ModelRecipesConditionInput
  ) {
    createRecipes(input: $input, condition: $condition) {
      id
      name
      image
      category
      ingredients
      instructions
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateRecipes = /* GraphQL */ `
  mutation UpdateRecipes(
    $input: UpdateRecipesInput!
    $condition: ModelRecipesConditionInput
  ) {
    updateRecipes(input: $input, condition: $condition) {
      id
      name
      image
      category
      ingredients
      instructions
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteRecipes = /* GraphQL */ `
  mutation DeleteRecipes(
    $input: DeleteRecipesInput!
    $condition: ModelRecipesConditionInput
  ) {
    deleteRecipes(input: $input, condition: $condition) {
      id
      name
      image
      category
      ingredients
      instructions
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
