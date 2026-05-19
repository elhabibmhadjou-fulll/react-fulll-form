import { Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import { TextField } from "../../../../component/text-field";
import { SelectField } from "../../../../component/select-field";
import { FORM_1 } from "../../../../redux";
import { UsernameValidator } from "../../../../validator/UsernameValidator";
import { EmailValidator } from "../../../../validator/EmailValidator";
import { RequiredValidator } from "../../../../validator/RequiredValidator";
import {
    DebouncedValidator,
    DelayedValidator,
    DefaultBehavior,
    lockWhileLoading,
    prefillBehavior,
} from "../../../../fulll-lib";
import { fakeFetchOptions, fakeFetchPrefill } from "../../../../api";

export function CarForm() {
    // ── 1. SYNC ──────────────────────────────────────────────────────────────
    // Pure synchronous rule. Validator goes straight to valid / error.
    const usernameValidator = useMemo(() => new UsernameValidator(), []);
    const usernameBehaviors = useMemo(() => [new DefaultBehavior()], []);

    // ── 2. ASYNC (no debounce) ───────────────────────────────────────────────
    // EmailValidator wrapped in DelayedValidator → simulated 1s HTTP call.
    //   change → "loading" (spinner) → "valid" | "error"
    const emailValidator = useMemo(
        () => new DelayedValidator(new EmailValidator(), 1000),
        [],
    );
    const emailBehaviors = useMemo(() => [new DefaultBehavior()], []);

    // ── 3. ASYNC + DEBOUNCE + LOCK ───────────────────────────────────────────
    // DebouncedValidator(500ms) wraps DelayedValidator(1s) → no spinner while
    // typing, then loading, then valid/error.
    // Extra behavior: emits "locked" while validator is loading. The text-field
    // turns that into `readOnly` (keeps focus, blocks edits during the flight).
    const debouncedValidator = useMemo(
        () => new DebouncedValidator(new DelayedValidator(new EmailValidator(), 1000), 500),
        [],
    );
    const debouncedBehaviors = useMemo(
        () => [new DefaultBehavior(), lockWhileLoading()],
        [],
    );

    // ── 4. PREFILL FROM FAKE API ─────────────────────────────────────────────
    // `prefillBehavior` handles the fetch + setValue + loading/locked flags.
    // `lockWhileLoading` extends the lock to the post-prefill async validation
    // (DelayedValidator goes to "loading" right after setValue).
    const prefillValidator = useMemo(
        () => new DelayedValidator(new EmailValidator(), 1000),
        [],
    );
    const prefillBehaviors = useMemo(
        () => [
            new DefaultBehavior(),
            lockWhileLoading(),
            prefillBehavior(fakeFetchPrefill),
        ],
        [],
    );

    // ── 5. SELECT WITH ASYNC-FETCHED OPTIONS ─────────────────────────────────
    // The options state lives *inside* SelectField (via `optionsFetcher`) so
    // the fetch resolution doesn't re-render the whole form / sibling fields.
    const cardValidator = useMemo(() => new RequiredValidator(), []);
    const cardBehaviors = useMemo(() => [new DefaultBehavior()], []);

    return (
        <div>
            <Stack spacing={2}>
                <Typography variant="h6">Car Form</Typography>

                <Typography variant="body2">1. Synchronous validation</Typography>
                <TextField
                    formId={FORM_1.id}
                    name="name"
                    label="Username (sync)"
                    placeholder="3 to 5 chars"
                    validator={usernameValidator}
                    behaviors={usernameBehaviors}
                    required
                />

                <Typography variant="body2">2. Asynchronous validation (1s fake API)</Typography>
                <TextField
                    formId={FORM_1.id}
                    name="email"
                    label="Email (async)"
                    placeholder="must contain @"
                    validator={emailValidator}
                    behaviors={emailBehaviors}
                    required
                />

                <Typography variant="body2">
                    3. Async + debounce + lock while loading
                </Typography>
                <TextField
                    formId={FORM_1.id}
                    name="emailDebounced"
                    label="Email (debounced + locked)"
                    placeholder="type, wait ~1.5s"
                    validator={debouncedValidator}
                    behaviors={debouncedBehaviors}
                    required
                />

                <Typography variant="body2">
                    4. Prefill from fake API on mount
                </Typography>
                <TextField
                    formId={FORM_1.id}
                    name="prefill"
                    label="Prefilled email"
                    placeholder="waiting for API…"
                    validator={prefillValidator}
                    behaviors={prefillBehaviors}
                    required
                />

                <Typography variant="body2">
                    5. Select with async-fetched options
                </Typography>
                <SelectField
                    formId={FORM_1.id}
                    name="cardType"
                    label="Card type"
                    optionsFetcher={fakeFetchOptions}
                    validator={cardValidator}
                    behaviors={cardBehaviors}
                    required
                />

                <Typography variant="body2">
                    6. Same as 5, with a default value pre-selected after fetch
                </Typography>
                <SelectField
                    formId={FORM_1.id}
                    name="cardTypeDefault"
                    label="Card type (default: Mastercard)"
                    optionsFetcher={fakeFetchOptions}
                    defaultValue="mastercard"
                    validator={cardValidator}
                    behaviors={cardBehaviors}
                    required
                />
            </Stack>
        </div>
    );
}
