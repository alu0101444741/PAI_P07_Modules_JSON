const maximum = require('../pai-lab-07-basket-stats.js');

describe('Input Verifier works correctly', () => {
  test('The verifier should return the same number', () => {
    expect(maximum.testInput(4)).toBe(4);
    expect(maximum.testInput('1')).toBe(1);
    expect(maximum.testInput("3")).toBe(3);
  });
  test('The verifier should throw an error', () => {
    expect(() => {maximum.testInput('ASA'); }).toThrow(new Error('La entrada no era un número.'));
    expect(() => {maximum.testInput([1, 'B']); }).toThrow(new Error('La entrada no era un número.'));
    expect(() => {maximum.testInput({apple: 5}); }).toThrow(new Error('La entrada no era un número.'));
  });
});
describe('The maximum sum from the start is correct', () => {
  test('The result is the expected', () => {
    expect(maximum.maximumFromStart([])).toBe(0);
    expect(maximum.maximumFromStart([1, 4, 12, -3, -4, 5])).toBe(17);
    expect(maximum.maximumFromStart([7, -4, -1, 3, -4, 5])).toBe(7);
    expect(maximum.maximumFromStart([1, 4, 0, -10, -6, 5])).toBe(5); 
    expect(maximum.maximumFromStart([75, 5, -80, 10, 20, 30])).toBe(80); 
  });
});
describe('The maximum sum from the back is correct', () => {
  test('The result is the expected', () => {
    expect(maximum.maximumFromBack([])).toBe(0);
    expect(maximum.maximumFromBack([1, 4, 12, -3, -4, 5])).toBe(15);
    expect(maximum.maximumFromBack([7, -4, -1, 3, -4, 5])).toBe(6);
    expect(maximum.maximumFromBack([1, 4, 0, -10, -6, 5])).toBe(5); 
    expect(maximum.maximumFromBack([75, 5, -80, 10, 20, 30])).toBe(60); 
  });
});
describe('Both maximum sums are correct', () => {
  test('The result is the expected', () => {
    expect(maximum.maximumSums([])).toEqual([0, 0]);
    expect(maximum.maximumSums([1, 4, 12, -3, -4, 5])).toStrictEqual([17, 15]);
    expect(maximum.maximumSums([7, -4, -1, 3, -4, 5])).toStrictEqual([7, 6]);
    expect(maximum.maximumSums([1, 4, 0, -10, -6, 5])).toStrictEqual([5, 5]); 
    expect(maximum.maximumSums([75, 5, -80, 10, 20, 30])).toStrictEqual([80, 60]); 
  });
});