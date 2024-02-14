import './App.css';
import RecipesBook from './components/RecipesBook.tsx';
import RecipeAddForm from './components/RecipeAddForm.tsx';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/add" component={RecipeAddForm} />
        <Route exact path="/" component={RecipesBook} />
      </Switch>
    </div>
  );
}

export default App;
