import axios from "axios";
import swal from "sweetalert2";

// Read ( GET )
export const getProduct = (setProducts) => async (dispatch) => {
    try {
        axios.get(`${process.env.REACT_APP_API_BACKEND}/products/`).then(function (response) {
            setProducts(response.data.data);
        });
        dispatch({ type: "GET_ALL_PRODUCT", payload: "success" });
    } catch (error) {
        swal.fire({
            text: error.response.data.message,
            icon: "warning",
        });
    }

};

// Create
export const createProduct =
    (data, saveImage) => async (dispatch) => {
        try {
            const formData = new FormData();
            const token = localStorage.getItem("token");

            formData.append("name", data.name);
            formData.append("price", data.price);
            formData.append("color", data.color);
            formData.append("size", data.size);
            formData.append("stock", data.stock);
            formData.append("description", data.description);
            formData.append("photo", saveImage);
            formData.append("id_category", "1");

            axios
                .post(process.env.REACT_APP_API_BACKEND + "/products", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    console.log(res.data);
                    swal.fire({
                        title: "Product Added",
                        text: `New product have been added`,
                        icon: "success",
                    });
                    window.location.reload()
                });
            dispatch({ type: "CREATE_PRODUCT", payload: "success" });
        } catch (err) {
            swal.fire({
                text: err.response.data.message,
                icon: "warning",
            });
        }
    };

// Update
export const updateProduct = (data, saveImage) => async (dispatch) => {
    try {
        const formData = new FormData();
        const token = localStorage.getItem("token");

        formData.append("id", data.id);
        formData.append("name", data.name);
        formData.append("price", data.price);
        formData.append("color", data.color);
        formData.append("size", data.size);
        formData.append("stock", data.stock);
        formData.append("description", data.description);
        formData.append("photo", saveImage);
        formData.append("id_category", "1");


        const res = await axios
            .put(`${process.env.REACT_APP_API_BACKEND}/products/${data.id}`, formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((res) => {
                console.log(res);
                swal.fire({
                    title: "Product Update",
                    text: `Update Product Success`,
                    icon: "success",
                });
                window.location.reload()
                dispatch({
                    type: "UPDATE_PRODUCT",
                    payload: res.data,
                });
            }).catch(err => {
                swal.fire({
                    text: "error",
                    icon: "error",
                });
            })
    } catch (error) {
        console.log(error);
    }
};


// Delete
export const deleteProducts = (id) => async (dispatch) => {
    try {
        const token = localStorage.getItem("token");
        axios
            .delete(`${process.env.REACT_APP_API_BACKEND}/products/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log(res);
                swal.fire({
                    title: "Product Delete",
                    text: `Delete Product Success`,
                    icon: "success",
                });
                window.location.reload();
                dispatch({ type: "DELETE_PRODUCT", payload: "success" });
            }).catch(err => {
                swal.fire({
                    text: "error",
                    icon: "error",
                });
            })

    } catch (error) {
        console.log();
    }
};