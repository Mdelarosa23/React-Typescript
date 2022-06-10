export default class Fields {
    id?: string;
    label: string;
    type: string;
    form_id: string;

    constructor(id: string, label: string, type: string, form_id: string) {
        this.id = id;
        this.label = label;
        this.type = type;
        this.form_id = form_id;
    }
}