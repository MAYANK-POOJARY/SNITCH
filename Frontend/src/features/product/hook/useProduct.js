import { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct, getSellerProducts } from "../service/product.api";
import { setSellerProducts } from "../state/product.slice";

export const useProduct = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    async function handleCreateProduct(productData) {
        try {
            setIsLoading(true);
            setError(null);
            const data = await createProduct(productData);
            return { success: true, product: data?.product || data };
        } catch (err) {
            const message = err.response?.data?.message || err.message || "Failed to create product.";
            setError(message);
            return { success: false, error: message };
        } finally {
            setIsLoading(false);
        }
    }

    async function handleGetSellerProduct() {
        try {
            setIsLoading(true);
            setError(null);
            const data = await getSellerProducts();
            dispatch(setSellerProducts(data.products || data));
            return { success: true, products: data.products || data };
        } catch (err) {
            const message = err.response?.data?.message || err.message || "Failed to fetch seller products.";
            setError(message);
            return { success: false, error: message };
        } finally {
            setIsLoading(false);
        }
    }

    return { 
        handleCreateProduct, 
        handleGetSellerProduct,
        isLoading,
        error
    };
};