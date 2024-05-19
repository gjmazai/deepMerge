import deepMerge from '../index';

/**
 * Тест для глубокого merge'a.
 */
describe('Deep merge test', () => {
	it('Should merge simple objects with uniq fields', () => {
		expect(deepMerge({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 });
	});

	it('Should simple object without uniq keys', () => {
		expect(deepMerge({ a: 1 }, { a: 2 })).toEqual({ a: 2 });
		expect(deepMerge({ a: [1] }, { a: [2] })).toEqual({ a: [1, 2] });
		expect(deepMerge({ a: 1 }, { a: [2] })).toEqual({ a: [1, 2] });
		expect(deepMerge({ a: [1] }, { a: 2 })).toEqual({ a: [1, 2] });
	});

	it('should merge nested objects', () => {
		expect(deepMerge({ a: { b: 1 } }, { a: { b: 2 } })).toEqual({ a: { b: 2 } });
		expect(deepMerge({ a: { b: [1] } }, { a: { b: 2 } })).toEqual({ a: { b: [1, 2] } });

	})
});
