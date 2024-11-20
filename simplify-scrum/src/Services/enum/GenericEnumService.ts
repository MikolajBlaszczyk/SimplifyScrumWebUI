
export class GenericEnumService {
    static getEnumNames<T extends object>(enumObj: T): (keyof T)[] {
        return Object.keys(enumObj).filter(key => isNaN(Number(key))) as (keyof T)[];
    }


    static getEnumDictionary<T extends object>(enumObj: T): Record<string, number> {
        return Object.entries(enumObj)
            .filter(([key, value]) => !isNaN(Number(key))) // Filter out non-numeric keys
            .reduce((dict, [key, value]) => {
                dict[key] = Number(value); // key is a string here
                return dict;
            }, {} as Record<string, number>);
    }
}