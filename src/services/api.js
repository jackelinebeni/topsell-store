import axios from 'axios';

// URL de tu Backend Spring Boot
const API_URL = 'http://localhost:8080/api';

export const getBanners = async () => {
    try {
        const response = await axios.get(`${API_URL}/banners`);
        return response.data;
    } catch (error) {
        console.error("Error fetching banners:", error);
        return [];
    }
};

export const getCategories = async () => {
    try {
        const response = await axios.get(`${API_URL}/categories`);
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
};

export const getProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/products`);
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
};

export const getBrands = async () => {
    try {
        const response = await axios.get(`${API_URL}/brands`);
        return response.data;
    } catch (error) {
        console.error("Error fetching brands:", error);
        return [];
    }
};

export const getProductsByCategory = async (slug) => {
    try {
        const response = await axios.get(`${API_URL}/products/category/${slug}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching products for category ${slug}:`, error);
        return [];
    }
};