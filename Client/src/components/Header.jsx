import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import logo from "../../public/todo.svg";

function ResponsiveAppBar() {
  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar
          sx={{ alignContent: "center", justifyContent: "center" }}
          disableGutters
        >
          <img
            src={logo}
            alt="Logo"
            style={{ width: 40, height: 40, marginRight: 10 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            TickIt
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
