import AddressResponse from "./AddressResponse";
import ProductResponse from "./ProductResponse";

interface OrderResponse {
    id: string;
    buyerId: string;
    product: ProductResponse;
    address: AddressResponse;
    quantity: number;
    isPaid: boolean;
    createAt: Date;
    chargeId: string;
    status: string;
};

export default OrderResponse;