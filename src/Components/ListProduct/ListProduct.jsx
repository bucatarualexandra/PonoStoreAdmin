import React, { useEffect, useState } from "react";
import "./ListProduct.css"
import cross_icon from "../../assets/cross_icon.png"

const ListProduct = () => {

const [allproducts, setAllProducts]=useState([]);

const fetchInfo = async ()=>{
  await fetch("http://localhost:4000/allproducts")
  .then((res)=>res.json())
  .then((data)=>{setAllProducts(data)});
}
useEffect (()=>{
  fetchInfo();
},[])

const removeproduct =async (id)=>{
  await fetch("http://localhost:4000/removeproduct", {
    method: "POST",
    headers:{
      Accept: "application/json",
      "Content-type" : "application/json",
    },
    body:JSON.stringify({id:id})
  })
  await fetchInfo();
}

  return (
    <div className="list-product">

      <h1>All Product List</h1>
      <div className="listproduct-format-main">
        <p> Produse</p>
        <p> Denumire</p>
        <p> Prețul vechi</p>
        <p> Prețul nou</p>
        <p> Categorie</p>
        <p> Șterge</p>
      </div>
<div className="listproduct-allproducts">
  <hr/>
{allproducts.map((product, index)=>{
  return <><div key={index} className="listproduct-format-main listproduct-format">
    <img  src={product.image} alt="" className="listproduct-product-icon"/> 
    <p>{product.name}</p>
    <p>${product.old_price}</p>
    <p>${product.new_price}</p>
    <p>{product.category}</p>
    <img onClick={()=>{removeproduct(product.id)}}  src={cross_icon} className="listproduct-remove-icon" alt=""/>

  </div> 
  <hr/>
  </>
})}

</div>
    </div>
  )
}
export default ListProduct