import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const StyledForm = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > * {
    margin: 2%;
  }

  form {
    fieldset {
      margin-top: 10%;
      border-radius: 4px;
      width: 100%;
      legend {
        font-size: 1.2rem;
      }
      input {
        all: unset;
        width: 100%;
      }
      textarea {
        resize: none;
        border: none;
        outline: none;
        max-width: 100%;
      }
    }
    select {
      margin-top: 5%;
      border-radius: 4px;
      min-width: 100%;
    }
  }
  footer {
    font-size: auto;
    display: flex;
    flex-direction: column;
  }
`;

export const StyledHeader = styled.header`
  width: 100%;

  h2 {
    width: 100%;
  }
`;
