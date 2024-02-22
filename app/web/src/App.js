import './App.css';
import RecipesBook from './components/RecipesBook.tsx';
import RecipeForm from './components/RecipeForm.tsx';
import { Route, Switch } from 'react-router-dom';
import { RecipeProvider } from './context/RecipeContext.tsx';
import { RecipeActionTypes } from './context/types.tsx';

function App() {
  return (
    <div className="App">
      <div className="center">
        <RecipeProvider>
          <Switch>
            <Route exact path="/add" render={() => <RecipeForm actionType={RecipeActionTypes.ADD_RECIPE} />} />
            <Route exact path="/update/:id" render={() => <RecipeForm actionType={RecipeActionTypes.UPDATE_RECIPE} />} />
            <Route exact path="*" component={RecipesBook} />
          </Switch>
        </RecipeProvider>
      </div>
    </div>
  );
}

export default App;
