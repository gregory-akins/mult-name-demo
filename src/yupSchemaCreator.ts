import * as yup from 'yup';

/** Adding just additional methods here */

const urlString = function(this:yup.StringSchema, ...args) {
  return this.url(...args);
}

yup.addMethod(yup.string, "URL", urlString);


const validator = function (this:yup.StringSchema, message:any) {
  return this.test('is-string-boolean', message, (value:any) => {
    const isValid = value.split(' ').join('').length !== 0;

    if (!isValid) return true;

    if (['Y', 'N'].indexOf(value) !== -1) {
      return true;
    } else {
      return false;
    }
  });
};

yup.addMethod(yup.string, "stringBoolean", validator);
yup.addMethod(yup.string, "StringBoolean", validator);

export function createYupSchema(schema:any, config:any) {
  const { field, validationType, validations = [] } = config;
  if (!yup[validationType]) {
    return schema;
  }
  let validator = yup[validationType]();
  validations.forEach((validation) => {
    const { params, type } = validation;
    if (!validator[type]) {
      return;
    }
    validator = validator[type](...params);
  });
  if (field.indexOf('.') !== -1) {
    // nested fields are not covered in this example but are eash to handle tough
  } else {
    schema[field] = validator;
  }

  return schema;
}

export const getYupSchemaFromMetaData = (
  metadata,
  additionalValidations,
  forceRemove
) => {
  const yepSchema = metadata.reduce(createYupSchema, {});
  const mergedSchema = {
    ...yepSchema,
    ...additionalValidations,
  };

  forceRemove.forEach((field) => {
    delete mergedSchema[field];
  });

  const validateSchema = yup.object().shape(mergedSchema);

  return validateSchema;
};