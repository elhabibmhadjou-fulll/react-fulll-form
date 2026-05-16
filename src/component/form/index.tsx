// import { useEffect, useMemo } from "react";
// import type { FormProps } from "./props";
// import { useAppDispatch } from "../../redux";
// import { formSlice } from "../../redux/form";
// import { FormContextId } from "./FormContextId";
// import { v4 as uuidv4 } from "uuid";

// export function Form(props: FormProps) {
//     const id = useMemo(() => uuidv4(), []);

//     const dispatch = useAppDispatch();

//     useEffect(() => {
//         dispatch(formSlice.actions.register({
//             formId: id,
//             name: props.name,
//         }));
//     }, []);

//     return <FormContextId.Provider value={id}>
//         <form onSubmit={e => e.preventDefault()}>
//             {props.children}
//             {JSON.stringify(Date.now() / 1000)}
//         </form>
//     </FormContextId.Provider>
// }