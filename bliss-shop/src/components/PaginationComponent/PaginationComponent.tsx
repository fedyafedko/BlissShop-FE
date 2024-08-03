import { Box, Pagination, Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";
import ProductResponse from "../../api/models/response/ProductResponse";
import PageListResponse from "../../api/models/response/PageListResponse";

interface PaginationComponentProps {
    getProductCategory: (page: number, sort: string) => Promise<void>;
    product: PageListResponse<ProductResponse> | null;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({ getProductCategory, product }) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [sorting, setSorting] = useState<string>('');

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
        getProductCategory(page, sorting);
    };

    const handleSortChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string | null,
      ) => {
        if (newAlignment !== null) {
            setSorting(newAlignment);
            getProductCategory(currentPage, newAlignment);
        }
      };

      return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignSelf: 'flex-end',
            gap: '20px',
        }}>
            <ToggleButtonGroup
                color="secondary"
                value={sorting}
                exclusive
                onChange={handleSortChange}
                aria-label="Sorting"
                size="small"
            >
                <ToggleButton value="" sx={{textTransform: 'none'}}>None</ToggleButton>
                <ToggleButton value="0" sx={{textTransform: 'none'}}>Rating</ToggleButton>
                <ToggleButton value="1" sx={{textTransform: 'none'}}>Expensive</ToggleButton>
                <ToggleButton value="2" sx={{textTransform: 'none'}}>Cheapest</ToggleButton>
            </ToggleButtonGroup>
            <Stack spacing={2}>
                {product && (
                    <Pagination
                        count={product.totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        shape="rounded"
                    />
                )}
            </Stack>
        </Box>
      );
};

export default PaginationComponent;