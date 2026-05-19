import { IAsyncValidator } from "./IAsyncValidator";
import type { IValidator } from "./IValidator";

export class DelayedValidator extends IAsyncValidator<string> {
    private inner: IValidator<string>;
    private delayMs: number;
    private timer: ReturnType<typeof setTimeout> | null = null;

    constructor(inner: IValidator<string>, delayMs = 1000) {
        super();
        this.inner = inner;
        this.delayMs = delayMs;
    }

    protected validate(value?: string): void {
        // Only used for the synchronous required-check; delegate errors to inner
        this.inner.handle(value);
        for (const err of this.inner.getErrors()) {
            this.addError(err);
        }
    }

    protected override async validateAsync(value?: string): Promise<void> {
        if (this.timer) {
            clearTimeout(this.timer);
            return new Promise((resolve) => {
                this.timer = setTimeout(() => {
                    this.inner.handle(value);
                    // copy errors after the "HTTP call"
                    for (const err of this.inner.getErrors()) {
                        this.addError(err);
                    }
                    resolve();
                }, this.delayMs);
            });
        }
    }
}