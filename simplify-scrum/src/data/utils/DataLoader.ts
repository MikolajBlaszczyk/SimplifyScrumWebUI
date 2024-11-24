
export class DataLoader {
    placeholder: boolean = true
    isEmpty: boolean = false
    data: any = null

    getData<T>(){
        return this.data
    }

    static default(){
        return new DataLoader()
    }


    static dataFinishedLoading<T>(loader: DataLoader, data: T, isEmpty: boolean): DataLoader{
        const copy = new DataLoader()
        copy.placeholder = false
        copy.isEmpty = isEmpty
        copy.data = data
        return copy
    }
} 