import Card from "./components/Card/Card";
import styled from "styled-components";

const AppDiv = styled.div`
  display:flex;
  height:100%;
  justify-content:center;
  align-items:center;
`

function App() {
  return (
    <AppDiv className="App">
      <Card />
      <div className="footer">
        <p>Developed by <a href="https://github.com/kunalvirk">kunalvirk</a> | Inspired from <a href="https://devchallenges.io/">devchallenges.io</a></p>
      </div>
    </AppDiv>
  );
}

export default App;
