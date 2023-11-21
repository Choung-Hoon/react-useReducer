import { React, useReducer, useState } from "react";
import Student from "./Student";

// dispatch 를 통해서 실행됨
// dispatch({type:'type', paylog:'추가 정보, 보통 Object'})
const reducer = (state, action) => {
  console.log("reducer가 관리하는 상태의 변경 이전 값 : ", state);
  console.log("상태 변경 요청 내용 : ", action);

  switch (action.type) {
    case "add-student":
      const name = action.payload.name;
      const newStudent = {
        id: Date.now(),
        name,
        isHere: false, // 출석 여부, 기본값 : 미출석
      };
      // initialState 구조를 만들어 반환하면 새로운 state로 갱신됨
      const newState = {
        count: state.count + 1,
        students: [...state.students, newStudent],
      };

      return newState;
    case "delete-student":
      return {
        count: state.count - 1,
        students: state.students.filter((student) => student.id !== action.payload.id), //
      };
    case "mark_student":
      // 반환하는 값을 기준으로 다시 그린다.
      return {
        count: state.count,
        students: state.students.map((student) => {
          if (student.id === action.payload.id) {
            // 해당 학생 정보 변경(isHere 값 override)
            return { ...student, isHere: !student.isHere };
          }
          return student;
        }), //
      };
    default:
      return state;
  }
};

const initialState = {
  count: 0,
  students: [
    // {
    //   id: Date.now(),
    //   name: "James",
    //   isHere: false,
    // },
  ],
};

// reducer - state를 업데이트하는 역할
// dispatch - state 업데이트를 위한 인터페이스()
// action - 요구의 내용

function App() {
  console.log("Render");

  const [name, setName] = useState("");
  const [studentsInfo, dispatch] = useReducer(reducer, initialState);

  const onClickAdd = () => {
    dispatch({ type: "add-student", payload: { name } });
  };

  const onClickDelete = () => {};

  return (
    <div>
      <h1>출석부</h1>
      <p>총 학생 수: {studentsInfo.count}명</p>
      <input //
        type="text"
        value={name}
        placeholder="이름을 입력해세요"
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={onClickAdd}>추가</button>
      {console.log("정보가 변경된 학생만 다시 그린다.")}
      {studentsInfo.students.map((student) => {
        return (
          <Student //
            key={student.id}
            name={student.name}
            dispatch={dispatch}
            id={student.id}
            isHere={student.isHere}
          />
        );
      })}
      {console.log(studentsInfo)}
    </div>
  );
}

export default App;
