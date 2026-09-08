import axios from 'axios';

// URL de tu Backend Spring Boot (desde variable de entorno)
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

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
        console.log(`Fetching products for category slug: ${slug}`);
        const response = await axios.get(`${API_URL}/products/category/${slug}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching products for category ${slug}:`, error);
        return [];
    }
};

export const getProductBySlug = async (slug) => {
    try {
        // Llama al endpoint de Java: ProductController.getProductBySlug
        const response = await axios.get(`${API_URL}/products/${slug}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching product details for slug ${slug}:`, error);
        return null;
    }
};

export const searchProducts = async (query) => {
  try {
    // Retorna array de productos
    const response = await axios.get(`${API_URL}/products/search?query=${query}`);
    return response.data;
  } catch (error) {
    console.error("Error buscando:", error);
    return [];
  }
};

export const submitContact = async (contactData) => {
  try {
    const response = await axios.post(`${API_URL}/contacts`, contactData);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al enviar formulario de contacto:", error);
    const errorMessage = error.response?.data?.error || 'Error al enviar el mensaje. Por favor, intenta nuevamente.';
    return { success: false, error: errorMessage };
  }
};

export const submitNewsUser = async (email, verificationState) => {
    try {
        const payload = {
            email: email,
            verificacion: verificationState
        };

        const response = await axios.post(`${API_URL}/contacts/subscribe`, payload);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error al suscribir al usuario:", error);
        const errorMessage = error.response?.data?.error || 'Error al suscribir. Por favor, intenta nuevamente.';
        return { success: false, error: errorMessage };
    }
};

// ===== CMS: Contenido de páginas estáticas =====

export const getAboutPageContent = async () => {
    try {
        const response = await axios.get(`${API_URL}/pages/about`);
        return response.data;
    } catch {
        return null;
    }
};

export const getContactPageContent = async () => {
    try {
        const response = await axios.get(`${API_URL}/pages/contact-info`);
        return response.data;
    } catch {
        return null;
    }
};

export const getLegalPageContent = async (slug) => {
    try {
        const response = await axios.get(`${API_URL}/pages/legal/${slug}`);
        return response.data;
    } catch {
        return null;
    }
};

export const getCompanyInfo = async () => {
    try {
        const response = await axios.get(`${API_URL}/pages/company-info`);
        return response.data;
    } catch {
        return null;
    }
};