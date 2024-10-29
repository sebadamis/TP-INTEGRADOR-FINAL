import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import AdminTable from "../../components/admin-table/AdminTable";
import "../../styles/form.css";
import Swal from "sweetalert2";
import "./AdminProduct.css";
import { useUser } from "../../context/UserContext";

// const URL = import.meta.env.VITE_SERVER_URL;

const URL = import.meta.env.VITE_LOCAL_SERVER;


export default function AdminProduct() {
    const [ products, setProducts ] = useState([]);
    // Estado para manejar la edición de productos
    const [ selectedProduct, setSelectedProduct ] = useState(null)

    const { register, setValue, reset, handleSubmit, formState: { errors, isValid } } = useForm();

    useEffect(() => {
      getProducts();
    }, [])

    const { token } = useUser();

    useEffect(() => {

      if(selectedProduct) {

          setValue("name", selectedProduct.name),
          setValue("price", selectedProduct.price),
          setValue("description",  selectedProduct.description),
          setValue("image", selectedProduct.image),
          setValue("category", selectedProduct.category),
          setValue("createdAt", selectedProduct.createdAt)

      }  else {
        reset();
      }

    }, [ selectedProduct, setValue, reset ])


    async function getProducts() {

      try {
        // Carga de productos
        const response = await axios.get(`${URL}/products`,
          {
          headers: {
              Authorization: token
          }
      });

        // console.log(response.data);

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

              console.log(response.data);
        
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
      // console.log(producto)
      try {

        if(selectedProduct) {
          const { _id } = selectedProduct;
          const response = await axios.put(`${URL}/products/${_id}`, producto,
            {
            headers: {
                Authorization: token
            }
        });
          console.log(response.data)
          Swal.fire({
            title:"Actualización correcta",
            text: "El producto fue actualizado correctamente",
            icon: "success",
            timer: 1500
          })

          setSelectedProduct(null)
          

        } else {
          // si no tengo estado selectedProduct (null) significa que estoy creando un producto
          const response = await axios.post(`${URL}/products`, producto,
            {
            headers: {
                Authorization: token
            }
        });
          console.log(response.data);
          Swal.fire({
            title:"Creaste un Producto Nuevo",
            text: "El usuario ha creado un nuevo producto",
            icon: "success"
            })
          

        }

        
        getProducts();
        // setSelectedProduct(null)

      } catch (error) {
        console.log(error)
        // Swal y mostrar error al user
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
                    <option value="Partes de PC">Partes de PC</option>
                    <option value="Periféricos">Periféricos</option>
                    <option value="Notebook">Notebook</option>
                    <option value="PC Escritorio">PC Escritorio</option>
                    <option value="Accesorios">Accesorios</option>

                  </select>
                </div>

                <div className="input-group">
                  <label htmlFor="createdAt">Fecha de ingreso</label>
                  <input type="date" {...register("createdAt")}  />
                </div>

                  <div className="input-group">
                    <label htmlFor="">Imagen</label>
                    <input type="url" {...register("image") } />
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
                          deleteProduct={deleteProduct}
                          handleEditProduct={handleEditProduct}
                          />
              
            </div>
        </div>
        
      </>
  )
}
