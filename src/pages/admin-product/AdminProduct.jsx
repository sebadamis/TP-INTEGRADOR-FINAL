import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import AdminTable from "../../components/admin-table/AdminTable";
import "../../styles/form.css";
import Swal from "sweetalert2";
import "./AdminProduct.css";
import { useUser } from "../../context/UserContext";


const URL = import.meta.env.VITE_LOCAL_SERVER;


export default function AdminProduct() {
    const [ products, setProducts ] = useState([]);
    // Estado para manejar la edición de productos
    const [ selectedProduct, setSelectedProduct ] = useState(null)
    const [categories, setCategories] = useState([]);

    const { register, setValue, reset, handleSubmit, formState: { errors, isValid } } = useForm();

    useEffect(() => {
      getProducts();
      getCategories();
    }, [])

    const { token } = useUser();

    useEffect(() => {

      if(selectedProduct) {

          setValue("name", selectedProduct.name),
          setValue("price", selectedProduct.price),
          setValue("description",  selectedProduct.description),
          setValue("category", selectedProduct.category),
          setValue("createdAt", selectedProduct.createdAt)

      }  else {
        reset();
      }

    }, [ selectedProduct, setValue, reset ])

    async function getCategories(){

      try {
        
        const response = await axios.get(`${URL}/categories`);


        setCategories(response.data.categories);

      } catch (error) {
        console.log(error);
        alert("Error al obtener Categorias")
      }
    }


    async function getProducts() {

      try {
        // Carga de productos
        const response = await axios.get(`${URL}/products`,
          {
          headers: {
              Authorization: token
          }
      });


        setProducts(response.data.products);

      } catch (error) {
        console.log(error);

      } 

    } 

    function deleteProduct(_id) {

        Swal.fire({
          title: "Borrar producto?",
          text: "Realmente desea borrar este producto?",
          icon: "question",
          reverseButtons: true,
          showCancelButton: true,
        }).then(async(result) => {
          try {
            if(result.isConfirmed) {
              const response = await axios.delete(`${URL}/products/${_id}`,
                {
                headers: {
                    Authorization: token
                }
            });

              console.log(response.data.products);
        
              getProducts();
            }
          } catch (error) {
            console.log(error)
            Swal.fire({
              title: "Error al borrar",
              text: "El producto no fue borrado",
              icon: "error"
            })
          }
        })

    }

    async function onProductSubmit(producto) {

      try {

        const formData = new FormData();
        
        formData.append("name", producto.name);
        formData.append("price", producto.price);
        formData.append("description", producto.description);
        formData.append("category", producto.category);
        formData.append("createdAt", producto.createdAt);
        if(producto.image[0]){
          formData.append("image", producto.image[0]);
        }

        if(selectedProduct) {
          const { _id } = selectedProduct;
          const response = await axios.put(`${URL}/products/${_id}`, formData,
            {
            headers: {
                Authorization: token
            }
        });
        
          console.log(response.data.products)
          Swal.fire({
            title:"Actualización correcta",
            text: "El producto fue actualizado correctamente",
            icon: "success",
            timer: 1500
          })
          
          setSelectedProduct(null)

        } else {
          
          const response = await axios.post(`${URL}/products`, formData,
            {
            headers: {
                Authorization: token
            }
        });


          console.log(response.data.products);
          Swal.fire({
            title:"Creaste un Producto Nuevo",
            text: "El usuario ha creado un nuevo producto",
            icon: "success"
            })
            
        }
      
        getProducts();

      } catch (error) {
        console.log(error)
        Swal.fire({
          title:"Error al crear producto",
          text: "No se pudo crear un nuevo producto",
          icon: "error"
          })
      }
      
    }

    // # Editar productos
    // crear un función para obtener los datos del producto a editar
    function handleEditProduct(producto) {


      console.log("Producto a editar", producto);
      setSelectedProduct(producto);
    }





    return (
      <>
        <div className="admin-container">
            <div className="form-container">
              <h1>Admin Product</h1>
              <form className="admin-form" onSubmit={handleSubmit(onProductSubmit)}>

                <div className="input-group">
                  <label htmlFor="name">Nombre producto</label>

                  <input type="text" id="name" 
                          {...register("name", { required: true, minLength: 3 }) 
                  } />

                  { errors.name?.type === "required" && <div className="input-error">El campo es requerido</div> }

                  { errors.name?.type === "minLength" && <div className="input-error">Mínimo de carácteres es 3</div> }

                </div>

                <div className="input-group">
                  <label htmlFor="price">Precio</label>
                  <input type="number" {...register("price", { required: true }) } />

                  { errors.price && <div className="input-error">El campo price es requerido</div> }
                </div>

                <div className="input-group">
                  <label htmlFor="description">Descripción</label>
                  <textarea {...register("description")} rows={5}></textarea>
                </div>

                <div className="input-group">
                  <label htmlFor="">Categoría</label>
                  <select {...register("category")}>\
                  {
                    categories.map(cat => (
                      <option key={cat._id} value={cat.name}>{cat.viewValue}</option>
                    ))
                  }


                  </select>
                </div>

                <div className="input-group">
                  <label htmlFor="createdAt">Fecha de ingreso</label>
                  <input type="date" {...register("createdAt")}  />
                </div>

                  <div className="input-group">
                    <label htmlFor="">Imagen</label>
                    <input accept="image/*" type="file" {...register("image") } />
                  </div>

                <button className={`btn ${selectedProduct && 'btn-success'}`}       
                        type="submit" 
                        disabled={ !isValid }  >

                  {
                    selectedProduct ? "Editar" : "Crear"
                  }

                </button>

              </form>
            </div>
            {/* Contenedor de la tabla de productos */}
            <div className="table-container">

              <AdminTable products={products}
                          key={products._id} 
                          deleteProduct={deleteProduct}
                          handleEditProduct={handleEditProduct}
                          />
              
            </div>
        </div>
        
      </>
  )
}
