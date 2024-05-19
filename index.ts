/**
 * Функция реализует deepMerge.
 * @param source - Первый объект.
 * @param target - Целевой объект.
 * @returns объект в котором смерджится первый и целевой.
 */
export default function deepMerge(source: object, target: object): object {
	const uniqKeys = new Set();
	const result = {};
	/** Запись ключей в Set, чтобы сделать их уникальный список. */
	Object.keys(source).forEach(uniqKeys.add, uniqKeys);
	Object.keys(target).forEach(uniqKeys.add, uniqKeys);

	uniqKeys.forEach((key: string) => result[key] = mergeValues(source[key], target[key]));
	return result;
}

/**
 * Функция, которая мерджит два значения из объектов.
 * null явялется специально заданным значением, поэтому его можно будет вернкть в отличие от undefined.
 * @param sourceValue - значение из первого объекта.
 * @param targetValue - значеине из целевого объекта.
 * @returns смердженное значение объектов.
 */
const mergeValues = (sourceValue: any, targetValue: any): any => {
	/** Обработка объектов. */
	if (isObject(sourceValue) && isObject(targetValue)) {
		return deepMerge(sourceValue, targetValue);
	}

	/** Обработка массивов. */
	if (Array.isArray(sourceValue) && Array.isArray(targetValue)) {
		return [...sourceValue, ...targetValue];
	}
	if (!Array.isArray(sourceValue) && Array.isArray(targetValue)) {
		return [sourceValue, ...targetValue];
	}
	if (Array.isArray(sourceValue) && !Array.isArray(targetValue)) {
		return [...sourceValue, targetValue];
	}

	return targetValue === undefined ? sourceValue : targetValue;
}

/**
 * Функция проверяет, является ли переданное значение объектом.
 * @param value - значение.
 * @returns флаг того, что переданное значение является объектом.
 */
const isObject = (value: any): boolean => typeof value === 'object' && !Array.isArray(value);