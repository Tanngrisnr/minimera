import styled from "@emotion/styled";

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
        max-width: 100%;
        overflow: auto;
      }
    }
  }
`;

export const StyledHeader = styled.header`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  h2 {
    width: 100%;
  }
`;
