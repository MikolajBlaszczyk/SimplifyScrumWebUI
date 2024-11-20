
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
        loader.placeholder = false
        loader.isEmpty = isEmpty
        loader.data = data
        return loader
    }
} 