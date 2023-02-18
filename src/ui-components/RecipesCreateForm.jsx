/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Recipes } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
}) {
  const labelElement = <Text>{label}</Text>;
  const { tokens } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button
            size="small"
            variation="link"
            color={tokens.colors.brand.primary[80]}
            isDisabled={hasError}
            onClick={addItem}
          >
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function RecipesCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    name: "",
    image: "",
    category: [],
    ingredients: [],
    instructions: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [image, setImage] = React.useState(initialValues.image);
  const [category, setCategory] = React.useState(initialValues.category);
  const [ingredients, setIngredients] = React.useState(
    initialValues.ingredients
  );
  const [instructions, setInstructions] = React.useState(
    initialValues.instructions
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setName(initialValues.name);
    setImage(initialValues.image);
    setCategory(initialValues.category);
    setCurrentCategoryValue("");
    setIngredients(initialValues.ingredients);
    setCurrentIngredientsValue("");
    setInstructions(initialValues.instructions);
    setErrors({});
  };
  const [currentCategoryValue, setCurrentCategoryValue] = React.useState("");
  const categoryRef = React.createRef();
  const [currentIngredientsValue, setCurrentIngredientsValue] =
    React.useState("");
  const ingredientsRef = React.createRef();
  const validations = {
    name: [{ type: "Required" }],
    image: [],
    category: [],
    ingredients: [],
    instructions: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value = getDisplayValue
      ? getDisplayValue(currentValue)
      : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          name,
          image,
          category,
          ingredients,
          instructions,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(new Recipes(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "RecipesCreateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={true}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              image,
              category,
              ingredients,
              instructions,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Image"
        isRequired={false}
        isReadOnly={false}
        value={image}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              image: value,
              category,
              ingredients,
              instructions,
            };
            const result = onChange(modelFields);
            value = result?.image ?? value;
          }
          if (errors.image?.hasError) {
            runValidationTasks("image", value);
          }
          setImage(value);
        }}
        onBlur={() => runValidationTasks("image", image)}
        errorMessage={errors.image?.errorMessage}
        hasError={errors.image?.hasError}
        {...getOverrideProps(overrides, "image")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              image,
              category: values,
              ingredients,
              instructions,
            };
            const result = onChange(modelFields);
            values = result?.category ?? values;
          }
          setCategory(values);
          setCurrentCategoryValue("");
        }}
        currentFieldValue={currentCategoryValue}
        label={"Category"}
        items={category}
        hasError={errors.category?.hasError}
        setFieldValue={setCurrentCategoryValue}
        inputFieldRef={categoryRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Category"
          isRequired={false}
          isReadOnly={false}
          value={currentCategoryValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.category?.hasError) {
              runValidationTasks("category", value);
            }
            setCurrentCategoryValue(value);
          }}
          onBlur={() => runValidationTasks("category", currentCategoryValue)}
          errorMessage={errors.category?.errorMessage}
          hasError={errors.category?.hasError}
          ref={categoryRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "category")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              image,
              category,
              ingredients: values,
              instructions,
            };
            const result = onChange(modelFields);
            values = result?.ingredients ?? values;
          }
          setIngredients(values);
          setCurrentIngredientsValue("");
        }}
        currentFieldValue={currentIngredientsValue}
        label={"Ingredients"}
        items={ingredients}
        hasError={errors.ingredients?.hasError}
        setFieldValue={setCurrentIngredientsValue}
        inputFieldRef={ingredientsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Ingredients"
          isRequired={false}
          isReadOnly={false}
          value={currentIngredientsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.ingredients?.hasError) {
              runValidationTasks("ingredients", value);
            }
            setCurrentIngredientsValue(value);
          }}
          onBlur={() =>
            runValidationTasks("ingredients", currentIngredientsValue)
          }
          errorMessage={errors.ingredients?.errorMessage}
          hasError={errors.ingredients?.hasError}
          ref={ingredientsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "ingredients")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Instructions"
        isRequired={false}
        isReadOnly={false}
        value={instructions}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              image,
              category,
              ingredients,
              instructions: value,
            };
            const result = onChange(modelFields);
            value = result?.instructions ?? value;
          }
          if (errors.instructions?.hasError) {
            runValidationTasks("instructions", value);
          }
          setInstructions(value);
        }}
        onBlur={() => runValidationTasks("instructions", instructions)}
        errorMessage={errors.instructions?.errorMessage}
        hasError={errors.instructions?.hasError}
        {...getOverrideProps(overrides, "instructions")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
