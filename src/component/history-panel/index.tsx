import { Box, List, ListItem, Stack } from "@mui/material";
import { FORM_NAME_1, useAppSelector } from "../../redux";

export function HistoryPanel() {
    const form = useAppSelector((state) => state.form[FORM_NAME_1]);

    if (!form) {
        return null;
    }

    return <Box sx={{ width: "250px" }} role="presentation" >
        <pre>
            {JSON.stringify(form, null, 2)}
        </pre>
        <List>
            {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text) => (
                <Stack key={text} direction={"column"}>
                    <ListItem key={text} disablePadding>
                        {text}
                    </ListItem>
                    <br />
                </Stack>
            ))} */}
        </List>
    </Box>
}