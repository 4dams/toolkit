import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
    selector: "app-select",
    templateUrl: "./select.component.html",
    styleUrls: ["./select.component.css"],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: SelectComponent,
            multi: true,
        },
    ],
})
export class SelectComponent implements OnInit {
    public inputValue: string;
    public focus = false;

    // Required by NG_VALUE_ACCESSOR
    private onChange: (value) => {};
    private onTouched: (value) => {};

    @Input() options: Array<{ label: string; value: string }> = [];
    @Input() value: string;
    @Input() placeholder = "";

    @Output() change = new EventEmitter<any>();

    constructor() {}

    ngOnInit() {}

    public setValue(value: string, label: string) {
        this.writeValue(value, label);
        this.onChange(this.value);
        this.change.emit(this.value);
    }

    public writeValue(value: string, label: string) {
        this.value = value;
        this.inputValue = label;
    }

    public changeEvent() {
        // Update value
        this.value = this.inputValue;

        // Emit change event
        this.onChange(this.value);
        this.change.emit(this.value);
    }

    // Required by NG_VALUE_ACCESSOR
    public registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
}
