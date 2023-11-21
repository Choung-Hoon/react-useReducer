import { React, useReducer, useState } from "react";

const ACTION_TYPES = {
  deposit: "deposit",
  withdraw: "withdraw",
};

const reducer = (state, action) => {
  console.log("reducer가 일을 합니다.", state, action);

  switch (action.type) {
    case ACTION_TYPES.deposit:
      return Number(state) + Number(action.payload);
    case ACTION_TYPES.withdraw:
      return Number(state) - Number(action.payload);
    default:
      return state;
  }
};

// reducer - state를 업데이트하는 역할
// dispatch - state 업데이트를 위한 인터페이스
// action - 요구의 내용

function App() {
  console.log("Render");

  const [number, setNumber] = useState(0);
  // 잔고
  const [myMoney, dispatch] = useReducer(reducer, 0);
  // 입급
  const onClickDeposit = () => {
    console.log("onClickDeposit : dispatch 호출");
    dispatch({ type: ACTION_TYPES.deposit, payload: number });
  };
  // 출금
  const onClickWithdraw = () => {
    console.log("onClickWithdraw: dispatch 호출");
    dispatch({ type: ACTION_TYPES.withdraw, payload: number });
  };

  return (
    <div>
      <h2>Welcome to useReducer Bank</h2>
      <hr />
      잔고 상태를 reducer를 이용하여 수정합니다.
      <hr />
      <p>잔고:{myMoney}원</p>
      <input onChange={(e) => setNumber(e.target.value)} type="number" min="0" value={number} step="1000" />
      <button onClick={onClickDeposit}>예금</button>
      <button onClick={onClickWithdraw}>출금</button>
    </div>
  );
}

export default App;
