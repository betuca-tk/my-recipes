import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)`
    text-decoration: none;
    color: #333;
    float: right;
    background: #dedede;
    color: #c48a8a;
    border-radius: 3px;
    border: 1px solid #a2a2a2;
    padding: 8px 16px;
    outline: none;
    cursor: pointer;
    font-size: 15px;
    padding: 8px 16px;
    margin-left: 5px;
`;

export const RecipesBookContainer = styled.div`
    margin: 10px auto;
    font-size: 15px;
    border: 1px solid #eeeeee;
    background-color: #f9f9f9;
    padding: 30px;
`;

export const StyleTitle = styled.label`
    font-size: 40px;
    color: #333;`;

export const StyledLinkHeader = styled(StyledLink)`
    margin-top: 8px;
`;

export const StyledHeader = styled.div`
    margin-bottom: 20px;
`;

export const RecipesListContainer = styled.div`
    margin: 10px auto;
    font-size: 15px;
    border: 1px solid #eeeeee;
    background-color: #f9f9f9;
    padding: 30px;
`;

export const StyledButton = styled.button`
    text-decoration: none;
    color: #333;
    float: right;
    background: #dedede;
    color: #c48a8a;
    border-radius: 3px;
    border: 1px solid #a2a2a2;
    padding: 8px 16px;
    outline: none;
    cursor: pointer;
    font-size: 15px;
    padding: 8px 16px;
    margin-left: 5px;
`;

export const RecipeItemContainer = styled.div`
  border: 1px solid #ccc;
  padding: 10px 10px 0px 10px;
  margin: 2px 2px 10px 2px;  
`;

export const RecipeName = styled.label`
  font-size: 20px;
  color: #333;
  margin-bottom: 5px;
  padding-top: 15px;
`;

export const RecipeLabel = styled.label`
  color: #666;
`;
