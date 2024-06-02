import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
    return (
        <Paper
      component="form"
      sx={{ p: '2px 7px', display: 'flex', alignItems: 'center',height:50, width: 400, borderRadius: '50px', bgcolor: 'secondary.main'}}
    >
      <InputBase
        sx={{ ml: 1, flex: 1, color: 'text.secondary'}}
        placeholder="Search..."
      />
      <IconButton type="button" sx={{ p: '10px', color: 'text.secondary'}} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
    );
};

export default SearchBar;