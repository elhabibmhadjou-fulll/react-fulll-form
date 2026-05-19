import type { IValidator } from "../validator";
import type { UIFlag } from "../hook/use-field/UiFlag";

/**
 * Read-only view + actions passed to behaviors at each lifecycle hook.
 * Behaviors interact with the field only through this context — no direct
 * access to React, Redux, or any framework primitive.
 */
export interface BehaviorContext {
    readonly signal: AbortSignal;
    readonly validator: IValidator<string>;
    readonly touched: boolean;
    readonly submitting: boolean;
    getValue(): string;
    setValue(next: string): void;
    /**
     * Imperative escape hatch: replaces the calling behavior's flag set at any
     * moment (e.g. to expose a `loading` flag during an async task started in
     * `onMount`, outside the normal hook-return cycle).
     */
    pushFlags(flags: UIFlag[]): void;
}
