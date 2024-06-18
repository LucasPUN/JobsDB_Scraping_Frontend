import {
  AppBar, Box, Button,
  Toolbar,
  Typography
} from "@mui/material";
import {useContext} from "react";
import {useAuthContext} from "@/context/AuthContext";

export default function MenuAppBar() {
  const {loginUser} = useAuthContext();

  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            JobsDB Scraping
          </Typography>
          <Typography marginRight={1}>
            {loginUser?.username}
          </Typography>
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}