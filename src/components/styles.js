import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const StyledForm = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50%;
  & > * {
    margin: 2%;
  }

  form {
    fieldset {
      margin-top: 10%;
      border-radius: 4px;
      width: 100%;
      legend {
        font-size: 1rem;
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
  justify-self: flex-start;

  h2 {
    width: 100%;
  }
`;

export const StyledLink = styled(Link)`
  color: #0a8b74;
  :visited {
    color: #076151;
  }
`;
