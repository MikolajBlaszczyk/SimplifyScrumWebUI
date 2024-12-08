import { v4 as uuidv4 } from 'uuid';
import { NoteTypeEnum } from "./NoteTypeEnum";

export class Note {
    uuid: string = uuidv4()
    title: string
    content: string
    type: NoteTypeEnum
    creationDate: Date

    constructor(title: string, content: string, creationDate: Date, type: NoteTypeEnum) {
        this.title = title;
        this.content = content;
        this.creationDate = creationDate;
        this.type = type;
    }
}