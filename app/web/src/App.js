import './App.css';
import RecipesBook from './components/RecipesBook.tsx';
import RecipeAddForm from './components/RecipeAddForm.tsx';
import { Route, Switch } from 'react-router-dom';
import { RecipeProvider } from './context/RecipeContext.tsx';

function App() {
  return (
    <div className="App">
      <RecipeProvider>
        <Switch>
          <Route exact path="/add" component={RecipeAddForm} />
          <Route exact path="/" component={RecipesBook} />
        </Switch>
      </RecipeProvider>
    </div>
  );
}

export default App;
