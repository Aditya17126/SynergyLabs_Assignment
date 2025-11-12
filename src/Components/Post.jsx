import React, { useEffect, useState } from "react";
import { deletePost, getPost } from "./Api/PostApi";
import Form from "./Form";

function Post() {
  const [data, setData] = useState([]);
  const [updateDataApi, setUpdateDataApi] = useState({}); //* here we are passing the object

  const getPostData = async () => {
    const res = await getPost();
    // console.log(res.data);
    
    setData(res.data);
  };
  
 //* when i am clicking on the edit it will going to add data on the form feild title and body field then we update the title/body if we want 
  const handleUpdatePost = (currElem) => {
    return setUpdateDataApi(currElem);
  };

  //* deleting the data using id
  const handleDeletePost = async (id) => {
    try {
      //* here i am sending the id of which i want to delete then i am getting the respons efrom the api
      const res = await deletePost(id);

      console.log(res);
      //* I am here checking whether the res is succesful or not using status
      if (res.status === 200) {
        const newUpdatedPosts = data.filter((currPost) => {
          return currPost.id !== id;
        });
        setData(newUpdatedPosts);
      } else {
        console.log("Failed to delete the post :", res.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //* USING USEEFFECT AS A RENDER METHOD AS IT WILL CALL THE FUNCTION FOR THE FIRST TIME
  useEffect(() => {
    getPostData();
  }, []);

  return (
    <>
      {/* //* CREATING THE FORM COMPONENT SO THAT I CAN ADD DATA AND UPDATE/EDIT DATA AS WELL */}
      <section className="section-form">
        <Form
          data={data}
          setData={setData}
          updateDataApi={updateDataApi}
          setUpdateDataApi={setUpdateDataApi}
        />
      </section>

      <section className="section-post">
        <ol>
          {/* //* RUNNING THE DATA ONE BY ONE AND SHOWING     */}
          {data.map((currElem) => {
            const { id, body, title } = currElem;
            return (
              <li key={id}>
                <p>Title : {title}</p>
                <p>Body : {body}</p>

                {/* //* BUTTON 1 FOR UPDATING THE POST */}
                <button onClick={() => handleUpdatePost(currElem)}>Edit</button>
                {/* //* BUTTON 2 FOR DELETING THE POST */}
                <button
                  className="btn-delete"
                  onClick={() => {
                    handleDeletePost(id);
                  }}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ol>
      </section>
    </>
  );
}

export default Post;
