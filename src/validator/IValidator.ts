
export abstract class IValidator<T> {
    private value?: T;
    private errors: Map<number, string | null> = new Map();

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

    public handle(value?: T) {
        this.value = value;
        this.errors = new Map();
        this.validate(value);
        return this;
    }

    public getValue(): T | undefined {
        return this.value;
    }
}