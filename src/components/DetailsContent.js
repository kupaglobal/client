import React from "react";
import { LiaCircleSolid } from "react-icons/lia";
import styled from "styled-components";

const DetailsContentWrapper = styled.div`
  display: flex;
`;

const DetailsContent2 = styled.div`
  padding-left: 10px;
`;

const DetailsPara = styled.p`
  font-size: 13px;
  padding-bottom: 5px;
`;

const DetailsPara2 = styled.p`
  font-size: 12px;
  font-weight: 600;
  color: #8a92a6;
`;

const TsDetailsContainer = styled.div`
  padding: 10px;
`;

const DetailsTitle = styled.div`
  background-color: #2c8997;
  padding: 8px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
`;

const IconWrapper = styled(LiaCircleSolid)`
  color: #3a57e8;
`;

const DetailsContent = ({ heading, paragraph }) => {
  return (
    <TsDetailsContainer>
      <DetailsContentWrapper>
        <IconWrapper color="#3A57E8" />
        <DetailsContent2>
          <DetailsPara>{heading}</DetailsPara>
          <DetailsPara2>{paragraph}</DetailsPara2>
        </DetailsContent2>
      </DetailsContentWrapper>
    </TsDetailsContainer>
  );
};

export default DetailsContent;
