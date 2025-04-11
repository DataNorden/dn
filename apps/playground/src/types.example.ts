import { FrozenNullObject, EnumTools, ValueOf } from '@dn/types';

export const Abc = FrozenNullObject({ a: 'a', b: 'b', c: 'c' } as const);
export type Abc = ValueOf<typeof Abc>;
export const AbcTools = new EnumTools('Abc', Abc);

console.log(Abc);

const func = (letter: Abc) => letter;
console.log(func(Abc.b));

console.log(AbcTools.isValid('c'));
console.log(AbcTools.isValid('d'));
