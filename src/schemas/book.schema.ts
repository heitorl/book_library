import * as yup from "yup";

const createBookSchema = yup.object().shape({
  title: yup.string().required(),
  author: yup.string().required(),
  description: yup.string().notRequired(),
});

const serializedCreateBookSchema = yup.object().shape({
  id: yup.string().uuid().required(),
  title: yup.string().required(),
  author: yup.string().required(),
  description: yup.string().notRequired(),
  available: yup.boolean().required(),
});

const serializedAllBookSchema = yup.object().shape({
  id: yup.string().uuid().required(),
  title: yup.string().required(),
  author: yup.string().required(),
  description: yup.string().notRequired(),
  available: yup.boolean().required(),
  info: yup
    .object()
    .shape({
      borrowedBy: yup.string().nullable(),
      startDate: yup.string().nullable(),
      endDate: yup.string().nullable(),
    })
    .default({}),
});

export {
  createBookSchema,
  serializedCreateBookSchema,
  serializedAllBookSchema,
};
