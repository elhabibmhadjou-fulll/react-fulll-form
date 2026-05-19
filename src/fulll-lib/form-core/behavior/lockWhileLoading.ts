import { createBehavior } from "./createBehavior";
import type { IBehavior } from "./IBehavior";

/**
 * Adds the `"locked"` flag whenever the validator is in `"loading"` state.
 * Reacts to every lifecycle hook that can change the validator status:
 * onChange (sync handle), onSubmit (forced validation), onValidationResolved
 * (async settle). Combine with `DefaultBehavior` for the full UX.
 */
export function lockWhileLoading(): IBehavior {
    const compute = (loading: boolean) => (loading ? ["locked" as const] : []);
    const fromCtxLoading = (status: string) => compute(status === "loading");
    return createBehavior({
        onChange: (_v, ctx) => fromCtxLoading(ctx.validator.getState().status),
        onSubmit: (ctx) => fromCtxLoading(ctx.validator.getState().status),
        onValidationResolved: (ctx) => fromCtxLoading(ctx.validator.getState().status),
    });
}
