import React, { useEffect, useState } from "react";
import { postData, updateData } from "./Api/PostApi";

function Form({ data, setData, updateDataApi, setUpdateDataApi }) {

  //* i going add the data from the user
  const [addData, setAddData] = useState({
    title: "",
    body: "",
  });
  //* this will going to chekc whether updateDataApi means the user has clicked on the edit button or not
  let isEmpty = Object.keys(updateDataApi).length === 0;

  //* this is to check if the user has clicked on the edit button to edit
  useEffect(() => {
    updateDataApi &&
      setAddData({
        title: updateDataApi.title || "",
        body: updateDataApi.body || "",
      });
  }, [updateDataApi]);

  //* here i am taking the value accessing them with the help of event.target.value and adding into the setAddData
  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setAddData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  //* here i adding the data and sending the data into the api then a response conatining the status code as well then i am adding the result.data into the setData and setAddData to defualt that is empty
  const addPostData = async () => {
    const res = await postData(addData);

    // console.log("Response", res);

    if (res.status === 201) {
      setData([...data, res.data]);
      setAddData({ title: "", body: "" });
    }
  };

  //~ i am here sending id of the currElem which is stored in updatDataApi which is coming from post component and also i am sending addData beacuse it contains the title and body of the currElem as i have done in useEffect
  const updatePostData = async () => {
    try {
      const res = await updateData(updateDataApi.id, addData);

      //  console.log(res);

      if (res.status === 200) {
        setData((prev) => {
          return prev.map((currElem) => {
            return currElem.id === updateDataApi.id ? res.data : currElem;
          });
        });

        setAddData({ title: "", body: "" });
        setUpdateDataApi({});
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const action = event.nativeEvent.submitter.value; //*this is ihave to check what is the value of the button that is ADD or EDIT

    if (action === "Add") {
      addPostData();
    } else if (action === "Edit") {
      updatePostData();
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="title"></label>
        <input
          type="text"
          autoComplete="off"
          id="title"
          name="title"
          placeholder="Add Title"
          value={addData.title}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="body"></label>
        <input
          type="text"
          autoComplete="off"
          id="body"
          name="body"
          placeholder="Add Post"
          value={addData.body}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit" value={isEmpty ? "Add" : "Edit"}>
        {isEmpty ? "Add" : "Edit"}
      </button>
    </form>
  );
}

export default Form;
