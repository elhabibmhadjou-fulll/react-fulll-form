
export type ValidationOption = {
    required?: boolean;
}

export abstract class IValidator<T> {
    private value?: T;
    private errors: Map<number, string | null> = new Map();
    private options?: ValidationOption;

    public setOptions(options: ValidationOption) {
        this.options = options;
        return this;
    }

    public hasError(): boolean {
        return Array.from(this.errors.values()).some(v => v !== null);
    }

    public getErrors(): string[] {
        return Array.from(this.errors.values())
            .filter((error): error is string => error !== null);
    }

    public getFirstError(): string | null {
        for (const error of this.errors.values()) {
            if (error !== null) return error;
        }
        return null;
    }

    public getCurrentError(): string | null {
        const values = Array.from(this.errors.values());
        for (let i = values.length - 1; i >= 0; i--) {
            if (values[i] !== null) {
                return values[i];
            }
        }
        return null;
    }

    public addError(invalid: boolean, message: string): void;
    public addError(message: string): void;
    public addError(invalidOrMessage: boolean | string, message?: string): void {
        const index = this.errors.size;
        if (typeof invalidOrMessage === 'string') {
            this.errors.set(index, invalidOrMessage);
        } else {
            if(message) {
                this.errors.set(index, invalidOrMessage ? message : null);
            }
        }
    }

    protected abstract validate(value?: T): void;

    protected isEmpty(value?: T): boolean {
        if (value === undefined || value === null) return true;
        if (typeof value === 'string') return value.trim() === '';
        return false;
    }

    public handle(value?: T) {
        this.value = value;
        this.errors = new Map();

        const empty = this.isEmpty(value);

        if (this.options?.required && empty) {
            this.addError("This field is required");
            return this;
        }

        if (!empty) {
            this.validate(value);
        }

        return this;
    }

    public getValue(): T | undefined {
        return this.value;
    }
}