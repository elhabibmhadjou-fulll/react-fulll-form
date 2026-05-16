import { Box, List, ListItem, Stack } from "@mui/material";
import { useAppSelector } from "../../redux";

export function HistoryPanel() {
    const form = useAppSelector((state) => state.form['default']);

    if (!form) {
        return null;
    }
    
    return <Box sx={{ width: 250 }} role="presentation" >
        <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                <Stack key={text} direction={"column"}>
                    <ListItem key={text} disablePadding>
                        {text}
                    </ListItem>
                    <br />
                </Stack>
            ))}
        </List>
    </Box>
}