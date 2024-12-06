import {
  useCallback,
  forwardRef,
  useRef,
  useImperativeHandle,
  useMemo,
} from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { updateSearchKeyword } from "../utils/redux/todoSlice";
import { openModal } from "../utils/redux/modalSlice";
import OpacityIcon from "@mui/icons-material/Opacity";
import InvertColorsOffIcon from "@mui/icons-material/InvertColorsOff";
import IconButton from "@mui/material/IconButton";
import { toggleGridColorByPriority } from "../utils/redux/generalSettingsSlice";
import { InputAdornment, Tooltip } from "@mui/material";
import { getKeyboardShortcuts, getModifierSymbols } from "../utils/utils";

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

const Header = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const searchInputRef = useRef(null);
  const gridColorByPriority = useSelector(
    (state) => state.generalSettings?.gridColorByPriority
  );
  const KEYBOARD_SHORTCUTS = useMemo(() => getKeyboardShortcuts(), []); //memoize keyboard shortcuts

  // Expose the `focusSearchInput` method to the parent via the ref
  useImperativeHandle(ref, () => ({
    focusSearchInput: () => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    },
    openModal: () => {
      dispatch(openModal({ mode: "create" }));
    },
    toggleGridColor: () => {
      dispatch(toggleGridColorByPriority());
    },
  }));

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
              inputRef={searchInputRef}
              endAdornment={
                <InputAdornment position="end">
                  <Typography sx={{ fontSize: "0.75rem", color: "#aaa" }}>
                    {getModifierSymbols(KEYBOARD_SHORTCUTS["search"]).join(
                      " + "
                    )}
                  </Typography>
                </InputAdornment>
              }
              sx={{ paddingRight: 1 }}
            />
          </Search>
          <Tooltip
            title={getModifierSymbols(KEYBOARD_SHORTCUTS["createTask"]).join(
              " + "
            )}
            arrow
          >
            <Button
              sx={{ color: "#FFF" }}
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => dispatch(openModal({ mode: "create" }))}
            >
              Add Task
            </Button>
          </Tooltip>
          <Tooltip
            title={getModifierSymbols(
              KEYBOARD_SHORTCUTS["toggleGridColor"]
            ).join(" + ")}
            arrow
          >
            <IconButton
              aria-label="color"
              onClick={(e) => dispatch(toggleGridColorByPriority())}
            >
              {gridColorByPriority ? <OpacityIcon /> : <InvertColorsOffIcon />}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </Container>
    </AppBar>
  );
}, []);
export default Header;
