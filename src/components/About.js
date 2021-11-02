import React from "react";
import { StyledHeader } from "./styles";
import styled from "@emotion/styled";

const AboutCard = styled.article`
  padding: 16px 8px 8px 24px;
  background: #ffffff;
  box-shadow: 0px 16px 24px rgba(0, 0, 0, 0.14),
    0px 6px 30px rgba(0, 0, 0, 0.12), 0px 8px 10px rgba(0, 0, 0, 0.2);

  display: flex;
  flex-wrap: wrap;
  max-width: 80%;
  margin: 4% 2%;
  h4 {
    font-style: normal;
    font-weight: normal;
    width: 100%;
  }
  p {
    width: 100%;
    color: rgba(0, 0, 0, 0.6);
  }
  ul {
    padding-inline-start: 4px;
    width: 100%;
    color: rgba(0, 0, 0, 0.6);
  }
`;

export default function About() {
  return (
    <>
      <StyledHeader>
        <h2>Hur funkar det?</h2>
      </StyledHeader>
      <AboutCard>
        <h4>Varför?</h4>
        <p>
          För att spara miljön och minska vår konsumtion av varor och saker som
          vi annars kan dela med varandra.
        </p>
      </AboutCard>
      <AboutCard>
        <h4>Att låna av någon</h4>
        <ul>
          <li>Hitta den annons som du är intresserad av</li>
          <li>Klicka på “Kontakta annonsör” och skicka ett meddelande</li>
          <li>
            Om utlånaren godkänner förfrågan så kommer ni överens om tid för
            upphämtning och återlämning själva
          </li>
        </ul>
      </AboutCard>
      <AboutCard>
        <h4>Låna saker snabbt</h4>
        <p>
          Det är enkelt och smidigt att låna från dina vänner med minimera. Det
          kostar ingenting att använda vår app och du kan välja vilken grupp du
          vill tillhöra eller skapa din egen.
        </p>
      </AboutCard>
      <AboutCard>
        <h4>Låna ut till dina vänner</h4>
        <p>
          Nu kan du både bidra till en mer hållbar ekonomi och hjälpa dina
          vänner. Skapa et konto och lägg till något du sällan använder i en
          vängrupp.
        </p>
      </AboutCard>
    </>
  );
}
