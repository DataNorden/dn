import { describe, it, expect } from 'vitest';
import { EnumTools, EnumToolsOptions } from './EnumTools';

describe(EnumTools.name, () => {
  const testEnum = {
    KEY_ONE: 'VALUE_ONE',
    KEY_TWO: 'VALUE_TWO',
    KEY_THREE: 'VALUE_THREE',
  } as const;

  const testEnumTools = new EnumTools('TestEnum', testEnum);

  it('should initialize with correct keys', () => {
    expect(testEnumTools.keys).toEqual(['KEY_ONE', 'KEY_TWO', 'KEY_THREE']);
  });

  it('should initialize with correct values', () => {
    expect(testEnumTools.values).toEqual(['VALUE_ONE', 'VALUE_TWO', 'VALUE_THREE']);
  });

  it('should return correct entries', () => {
    expect(testEnumTools.entries).toEqual([
      ['KEY_ONE', 'VALUE_ONE'],
      ['KEY_TWO', 'VALUE_TWO'],
      ['KEY_THREE', 'VALUE_THREE'],
    ]);
  });

  it('should validate keys correctly', () => {
    expect(testEnumTools.isKey('KEY_ONE')).toBe(true);
    expect(testEnumTools.isKey('INVALID_KEY')).toBe(false);
  });

  it('should validate values correctly', () => {
    expect(testEnumTools.isValid('VALUE_ONE')).toBe(true);
    expect(testEnumTools.isValid('INVALID_VALUE')).toBe(false);
  });

  it('should return ownValues excluding subsets', () => {
    const subsetEnum = new EnumTools('SubsetEnum', { KEY_ONE: 'VALUE_ONE' });
    const mainEnumTools = new EnumTools('MainEnum', testEnum, {
      subsets: [subsetEnum],
    });

    expect(mainEnumTools.ownValues).toEqual(['VALUE_TWO', 'VALUE_THREE']);
  });

  it('should handle options for keyNotEqualValues', () => {
    const options: EnumToolsOptions = { keyNotEqualValues: true };
    const enumWithOptions = new EnumTools('TestEnumWithOptions', testEnum, options);

    expect(enumWithOptions.keyNotEqualValues).toBe(true);
  });

  it('should handle options for valuesNotUnique', () => {
    const options: EnumToolsOptions = { valuesNotUnique: true };
    const enumWithOptions = new EnumTools('TestEnumWithOptions', testEnum, options);

    expect(enumWithOptions.valuesNotUnique).toBe(true);
  });

  it('should handle empty subsets', () => {
    const enumWithEmptySubsets = new EnumTools('TestEnumWithEmptySubsets', testEnum, {
      subsets: [],
    });

    expect(enumWithEmptySubsets.ownValues).toEqual(['VALUE_ONE', 'VALUE_TWO', 'VALUE_THREE']);
  });
});
