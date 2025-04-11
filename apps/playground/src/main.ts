import { deleteNullishPropsMutable } from '@dn/object/deleteNullishPropsMutable';

console.log(
  deleteNullishPropsMutable({
    a: 1, //
    b: null,
    c: 'test',
  }),
);
