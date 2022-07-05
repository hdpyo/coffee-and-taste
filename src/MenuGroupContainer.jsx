import { useLocation, useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { useEffect } from 'react';

import { loadMenuGroups } from './store';

import MenuGroup from './MenuGroup';

export default function MenuGroupContainer() {
  const { categoryId } = useParams();

  const dispatch = useDispatch();

  const selectedCategory = useLocation().state.categoryId;

  useEffect(() => {
    dispatch(loadMenuGroups(categoryId));
  }, [categoryId]);

  const menuGroups = useSelector((state) => state.menuGroups);

  return (
    <MenuGroup menuGroups={menuGroups} selectedCategory={selectedCategory} />
  );
}
