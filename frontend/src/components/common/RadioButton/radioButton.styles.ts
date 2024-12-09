/**
 * @summary Styling for RadioButton component
 */
import styled from '@emotion/styled';
import * as tokens from '@bcgov/design-tokens/js';

export const RadioButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledLabel = styled.label`
  margin-left: 8px;
  font-size: 14px;
  color: ${tokens.typographyColorPrimary};
`;

export const StyledInput = styled.input`
  accent-color: ${tokens.colorPrimary}; // Customize the radio button color
`;
