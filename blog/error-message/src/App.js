import { useState } from "react";

function App() {
  const [errorMessage, setErrorMessage] = useState("");
  const doSomething = () => {
    // call some api or do something, if there is any error set message
    setErrorMessage("Error: Some error has occurred.");
  };
  const clearError = () => {
    setErrorMessage("");
  };
  return (
    <div>
      <h1>Heading</h1>
      {errorMessage && <p>{errorMessage}</p>}
      <p>Do some operation below</p>
      <button onClick={doSomething}>Do Something</button>
      <button onClick={clearError}>Clear Error</button>
    </div>
  );
}

export default App;
