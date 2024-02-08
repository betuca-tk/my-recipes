import React, { Component } from "react"

export interface RecipeProps {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
}

class Recipe extends Component<RecipeProps> {
  render() {
    return (
      <div key={this.props.id}>
        <h2>{this.props.name}</h2>
        <p>{this.props.description}</p>
        <ul>
        {this.props.ingredients.map((ingredient, index) => {
          return <li key={index}>{ingredient}</li>
        })}
        </ul>
      </div>
    )
  }
}

export default Recipe
