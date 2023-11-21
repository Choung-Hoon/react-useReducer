import React from "react";

const Student = ({ name, id, dispatch, isHere }) => {
  const style = {
    textDecoration: isHere ? "line-through" : "none",
    color: isHere ? "gray" : "black",
  };

  return (
    <div>
      <span style={style} onClick={() => dispatch({ type: "mark_student", payload: { id } })}>
        {name}
      </span>
      <button
        onClick={() => {
          dispatch({ type: "delete-student", payload: { id } });
        }}
      >
        삭제
      </button>
    </div>
  );
};

export default Student;
