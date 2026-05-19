import type { FieldUIInput } from "../hook/use-field/FieldUIInput";
import type { IBehavior } from "./IBehavior";
import type { UIFlag } from "../hook/use-field/UiFlag";

/** Default: reflects validator state, never locks. */
export class DefaultBehavior implements IBehavior {
    getUIFlags({ touched, validator }: FieldUIInput): UIFlag[] {
        const state = validator.getState().status;
        if (state === "loading") {
            return ["loading"];
        }
        if (!touched){
             return ["pristine"];
        }
        if (state === "error") {
            return ["error"];
        }
        return ["valid"];
    }
}
