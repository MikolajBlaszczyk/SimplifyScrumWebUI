export class GenericEnumService {
    static getEnumNames<T extends object>(enumObj: T): (keyof T)[] {
        return Object.keys(enumObj).filter(key => isNaN(Number(key))) as (keyof T)[];
    }

    static getEnumDictionary<T extends object>(enumObj: T): Record<string, T[keyof T]> {
        return Object.entries(enumObj)
            .reduce((dict, [key, value]) => {
                if (isNaN(Number(key))) {
                    dict[key] = value; 
                } else {
                    dict[value as unknown as string] = Number(key) as T[keyof T]; 
                }
                return dict;
            }, {} as Record<string, T[keyof T]>);
    }
}