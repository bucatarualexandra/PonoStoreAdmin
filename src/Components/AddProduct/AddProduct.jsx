import React, { useState } from "react";
import "./AddProduct.css"
import upload_area from "../../assets/upload_area.png"

const AddProduct = () => {

  const [images, setImages] = useState([null, null, null, null]);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image_urls: [],
    category: "nunta",
    new_price: "",
    old_price: ""
  })

  const imageHandler = (e, index) => {
    const newImages = [...images];
    newImages[index] = e.target.files[0];
    setImages(newImages);
  }


  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value })
  }

  const Add_Product = async () => {
    console.log(productDetails);
    let responseData;
    let product = {...productDetails};

    let formData = new FormData();
    images.forEach((image, index) => {
      formData.append(`images`, image);
    })

    await fetch("http://localhost:4000/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    }).then((resp) => resp.json())
    .then((data) => { responseData = data })

    if (responseData.success) {
      product.image_urls= responseData.image_urls;
      console.log(product);

      await fetch("http://localhost:4000/addproduct", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
      .then((resp) => resp.json())
      .then((data) => {
        data.success ? alert("Product Added") : alert("Failed")
      })
      .catch((error)=>{
        console.error("Error in addproduct fetch:", error);
      });
    }
  }


  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p> Denumire produs </p>
        <input value={productDetails.name} onChange={changeHandler} type="text" name="name" placeholder="Type here" />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p> Prețul vechi</p>
          <input value={productDetails.old_price} onChange={changeHandler} type="text" name="old_price" placeholder="Type here" />
        </div>
        <div className="addproduct-itemfield">
          <p>Prețul nou</p>
          <input value={productDetails.new_price} onChange={changeHandler} type="text" name="new_price" placeholder="Type here" />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Categoria</p>
        <select value={productDetails.category} onChange={changeHandler} name="category" className="addproduct-selector">
          <option value="nunta">Nuntă</option>
          <option value="botez">Botez</option>
          <option value="proiect">Proiecte</option>
        </select>
      </div>
      <div className="addproduct-itemfields">
        {images.map((image, index) => (
          <div key={index} className="addproduct-itemfield">
            <label htmlFor={`file-input-${index}`}>
              <img src={image ? URL.createObjectURL(image) : upload_area} className="addproduct-thumnail-img" alt={`Thumbnail ${index+1}`} />
            </label>
            <input onChange={(e) => imageHandler(e, index)} type="file" name={`image${index + 1}`} id={`file-input-${index}`} hidden />
          </div>
        ))}
        <button onClick={Add_Product} className="addproduct-btn"> Adaugă produsul</button>
      </div>
      </div>
      )
}

      export default AddProduct