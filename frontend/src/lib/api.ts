const API_URL = "http://localhost:8000/api";

// Produits API
export const getProduits = async (page = 1) => {
  try {
    const res = await fetch(`${API_URL}/produits/?page=${page}`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data.results || data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const createProduit = async (
  nom: string,
  prix: number,
  date_peremption: string
) => {
  try {
    const res = await fetch(`${API_URL}/produits/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nom, prix, date_peremption }),
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

export const deleteProduit = async (id: number) => {
  try {
    const res = await fetch(`${API_URL}/produits/${id}/`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

export const updateProduit = async (
  id: number,
  nom: string,
  prix: number,
  date_peremption: string
) => {
  try {
    const res = await fetch(`${API_URL}/produits/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nom, prix, date_peremption }),
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

// Factures API
export const getFactures = async (page = 1) => {
  try {
    const res = await fetch(`${API_URL}/factures/?page=${page}`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching invoices:", error);
    throw error;
  }
};

export const getFacture = async (id: number) => {
  try {
    const res = await fetch(`${API_URL}/factures/${id}/`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching invoice:", error);
    throw error;
  }
};

export const createFacture = async (lignes: {
  produits: number;
  quantite: number;
}) => {
  try {
    const res = await fetch(`${API_URL}/factures/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lignes }),
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error creating factures:", error);
    throw error;
  }
};

export const deleteFacture = async (id: number) => {
  try {
    const res = await fetch(`${API_URL}/factures/${id}/`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error deleting invoice:", error);
    throw error;
  }
};

export const updateFacture = async (
  id: number,
  lignes: {
    produits: number;
    quantite: number;
  }
) => {
  try {
    const res = await fetch(`${API_URL}/factures/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lignes }),
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error updating invoice:", error);
    throw error;
  }
};
