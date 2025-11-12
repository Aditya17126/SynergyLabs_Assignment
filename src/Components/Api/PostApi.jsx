import axios from "axios";

const api = axios.create({
   baseURL : "https://jsonplaceholder.typicode.com"
})

//* here i am get/fetching/reading the data
//* GET METHOD
export const getPost = ()=>{
   return api.get("/posts");
}
//* HERE I AM DELETING THE POST USING THE ID WHICH I AMGETTING FROM THE handleDeletePost
//* DELETE METHOD
export const deletePost = (id)=>{
   return api.delete(`/posts/${id}`)
}

//*HERE I AM POSTING/ADDING THE DATA FROM USER FROM <FROM/> COMPONENT
//* POST METHOD
export const  postData = (data)=>{
   return api.post("/posts",data);
}

//* here i receiving the id and the data thta needed to be updated
//? Put Method
export const updateData = (id , data)=>{
  return api.put(`/posts/${id}` , data);
}