import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import { Recipe } from '../../global/recipe.types';
import { getRecipes } from './util';
import { UserContextType } from '../../global/context.types';
import { UserContext } from '../../context/UserContext';

const SavedRecipes = () => {
  const { user, loggedIn } = useContext(UserContext) as UserContextType;
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const { isPending, error, data, isError, isSuccess } = useQuery<Recipe[]>({
    queryKey: ['savedRecipes', user?.email],
    queryFn: ({ queryKey }) => {
      const email = queryKey[1] as string; // Ensure email is a string
      return getRecipes(email ?? '');
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setRecipes(data);
    }
  }, [data, isSuccess]);

  if (isPending) {
    return <div>Loading</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div className='container p-5'>
      <h1 className='text-3xl font-bold mr-2'>Saved Recipes</h1>
      {recipes?.map((recipe, i) => (
        <div key={i} className='m-2'>
          <RecipeCard
            recipes={recipes}
            setRecipes={setRecipes}
            recipe={recipe}
          ></RecipeCard>
        </div>
      ))}
    </div>
  );
};

export default SavedRecipes;
