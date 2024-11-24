

export class ValidationService {
    static validateTextInput(value: String): boolean{ 
        return (value.length != 0)
    }
}