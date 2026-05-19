import type { FieldUIInput, UIFlag } from "../../../../fulll-lib";
import type { IBehavior } from "../../../../fulll-lib";

/**
 * Form-specific behavior: while the phone is being validated remotely, lock
 * the input so the user can't change it mid-flight. This lives next to the
 * form that uses it — the framework only exposes the IBehavior contract.
 */
export class CustomPhoneBehavior implements IBehavior {
  getUIFlags({ touched, validator }: FieldUIInput): UIFlag[] {
    const state = validator.getState().status;
    if (state === "loading") return ["loading", "locked"];
    if (!touched) return ["pristine"];
    if (state === "error") return ["error"];
    return ["valid"];
  }
}