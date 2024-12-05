import { useCallback } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import logo from "/todo.svg?url";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { debounce } from "lodash";
import { useDispatch } from "react-redux";
import { updateSearchKeyword } from "../utils/redux/todoSlice";
import { openModal } from "../utils/redux/modalSlice";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "16ch",
      "&:focus": {
        width: "25ch",
      },
    },
  },
}));

function Header() {
  const dispatch = useDispatch();

  // Create a debounced function that updates the search keyword in redux
  const debouncedSetSearchKeyword = useCallback(
    debounce((value) => {
      dispatch(updateSearchKeyword(value));
    }, 300), // Adjust the delay as needed (300ms here)
    [dispatch]
  );

  const handleInputChange = (event) => {
    const value = event.target.value;
    debouncedSetSearchKeyword(value); // Call the debounced function
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            display: "flex",
            alignContent: "center",
          }}
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
          <Box sx={{ flexGrow: 1 }} />
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={handleInputChange}
            />
          </Search>
          <Button
            sx={{ color: "#FFF" }}
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => dispatch(openModal({ mode: "create" }))}
          >
            Add Task
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
