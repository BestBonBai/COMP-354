export default class Edit {
    constructor(oldContent, newContent, number) {
        this.oldContent = oldContent;
        this.newContent = newContent;
        this.number = number;
        this.group = "";
        this.selected = false;
    }
}