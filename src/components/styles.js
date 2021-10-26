import styled from "styled-components";

export const StyledForm = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-content: center;
  & > * {
    margin: 2%;
  }

  form {
    fieldset {
      border-radius: 4px;
      legend {
        font-size: 0.8rem;
      }
      width: 100%;
      select {
        width: 100%;
      }
      input {
        all: unset;
      }
      textarea {
        all: unset;
        resize: none;
      }
    }
  }
`;
