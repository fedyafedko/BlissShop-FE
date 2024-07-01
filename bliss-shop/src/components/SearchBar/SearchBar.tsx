import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { ChangeEvent, useEffect, useState, KeyboardEvent } from 'react';
import React from 'react';
import { Divider, Typography } from '@mui/material';
import Product from '../../api/Product';
import ProductResponse from '../../api/models/response/ProductResponse';
import SearchProductRequest from '../../api/models/request/Product/SearchProductRequest';
import { useNavigate } from 'react-router-dom';
import productImage from '../../img/productImage.png';

type Product = {
  id: number;
  name: string;
  imagePath: string;
};

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<ProductResponse[]>([]);
  const navigate = useNavigate();

  const handleSearch = async (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value === '') {
      setFilteredProducts([]);
      return;
    }

    const request: SearchProductRequest = {
      search: value,
      page: 1,
      pageSize: 5,
    };

    var response = await Product.getAll(request);
    setFilteredProducts(response.data?.items || []);
  };

  const handleClick = () => {
    navigate(`/products/${searchTerm}`);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleClick();
    }
  };

  return (
    <Box sx={{ position: 'relative', width: 400 }}>
      <Paper
        component="form"
        sx={{ p: '2px 7px', zIndex: 2, display: 'flex', alignItems: 'center', height: 50, borderRadius: '50px', bgcolor: 'secondary.main', position: 'relative' }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1, color: 'background.paper' }}
          placeholder="Search..."
          value={searchTerm}
          onKeyPress={handleKeyPress}
          onChange={handleSearch}
        />
        <IconButton
          type="button"
          sx={{ p: '10px', color: 'background.paper' }}
          aria-label="search"
          onClick={handleClick}>
          <SearchIcon />
        </IconButton>
      </Paper>

      {filteredProducts.length > 0 && (
        <Box sx={{ width: '100%', position: 'absolute', paddingTop: '20px', zIndex: 1, mt: -3, bgcolor: 'background.paper', borderRadius: '0 0 10px 10px', boxShadow: 3 }}>
          <List>
            {filteredProducts.map(product => (
              <React.Fragment key={product.id}>
                <ListItem button 
                onClick={() => navigate(`/product/${product.id}`)}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '10px',
                  padding: '10px',
                }}>
                  <Box component='img'
                    src={product.imagesPath[0] ? `https://localhost:7299${product.imagesPath[0]}` : productImage}
                    sx={{
                      width: '60px',
                      height: '60px',
                      objectFit: 'cover',
                      objectPosition: 'center',
                    }} />
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    width: '100%',
                  }}>
                    <Typography  sx={{
                      fontWeight: 'bold',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      width: '80%',
                    }} >
                      {product.name}
                    </Typography>
                    <Typography sx={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      width: '80%',
                    }} >
                      {product.description}
                    </Typography>
                  </Box>

                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default SearchBar;
