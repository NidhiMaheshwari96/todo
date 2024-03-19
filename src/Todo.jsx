import React, { useState } from "react";

const Todo = () => {
  const [inputValue, setInputValue] = useState("");
  const [initialTable, setInitalTable] = useState([]);
  const [completedTable, setCompletedTable] = useState([]);
  const [isEdit, setIsedit] = useState(false);
  const [editId, setEditId] = useState("");

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    if (isEdit) {
      let updateTodo = [...initialTable];
      updateTodo[editId] = inputValue;

      setInitalTable(updateTodo);
      setIsedit(false);
    } else {
      setInitalTable([...initialTable, inputValue]);
    }

    setInputValue("");
  };

  const handleComplete = (i) => {
    const completeItem = initialTable[i];
    setCompletedTable([...completedTable, completeItem]);
    setInitalTable(initialTable.filter((data) => data !== completeItem));
  };
  const handleEdit = (data, i) => {
    setEditId(i);
    setInputValue(data);
    setIsedit(true);
  };
  const handleDelete = (i) => {
    const completeItem = initialTable[i];
    setInitalTable(initialTable.filter((data) => data !== completeItem));
  };

  return (
    <>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => handleChange(e)}
        />
        <button onClick={handleSubmit}>
          {isEdit === true ? "Edit Save" : "Add"}
        </button>
      </div>
      <div className="table-container">
        <div>
          <h2>To Do List</h2>
          <table>
            <thead>
              <tr>
                <th>Index</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {initialTable.length > 0 ? (
                initialTable.map((data, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{data}</td>
                    <td>
                      <button onClick={() => handleComplete(i)}>
                        Complete
                      </button>
                      <button onClick={() => handleEdit(data, i)}>Edit</button>
                      <button onClick={() => handleDelete(i)}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No data</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div>
          <h2>Completed Tasks</h2>
          <table>
            <thead>
              <tr>
                <th>Index</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {completedTable.length > 0 ? (
                completedTable.map((data, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{data}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">No completed tasks yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Todo;
