import { expect } from 'chai';
import 'mocha';
import { getMostRepeatedElement } from './functions';

describe('test getMostRepeatedElement function,', () => {
  const result = getMostRepeatedElement(['naranja', 'bananas', 'naranja'], '');
  it('should return item: naranja', () => {
    expect(result.item).to.equal('naranja');
  });
  it('should return times: 2', () => {
    expect(result.times).to.equal(2);
  });
});

describe('test getMostRepeatedElement with an array of objects input', () => {
  const testArray = [
    {
      item: 'pelota',
    },
    {
      item: 'autito',
    },
    {
      item: 'pelota',
    },
  ];

  const result = getMostRepeatedElement(testArray, 'item');

  it('should return item: pelota', () => {
    expect(result.item).to.eql({ item: 'pelota' });
  });
  it('should return times: 2', () => {
    expect(result.times).to.equal(2);
  });
});

describe('test getMostRepeatedElement function,', () => {
  const result = getMostRepeatedElement([], '');
  it('should return undefined', () => {
    expect(result.item).to.equal(undefined);
  });
});
