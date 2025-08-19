"use client";

import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

const Card: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="card2">
          {children}
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    width: 100%;
    height: 100%;
    background-image: linear-gradient(163deg, #00ff75 0%, #3700ff 100%);
    border-radius: 28px;
    transition: all 0.3s;
    padding: 4px; /* thicker gradient border for visibility */
  }

  .card2 {
    width: 100%;
    height: 100%;
    background-color: #ffffff; /* match site cards */
    border-radius: 24px;
    transition: all 0.2s;
    overflow: hidden; /* clip inner content to rounded corners */
  }

  .card2:hover {
    transform: scale(0.98);
    border-radius: 26px;
  }

  .card:hover {
    box-shadow: 0px 0px 30px 1px rgba(0, 255, 117, 0.3);
  }
`;

export default Card;
