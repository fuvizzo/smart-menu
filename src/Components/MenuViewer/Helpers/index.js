import React from 'react';
import { LocalBar, RestaurantMenu, LocalPizza } from '@material-ui/icons';
import SvgIcon from '@material-ui/core/SvgIcon';
import FOOD_AND_DRINKS_IMAGE from '../../../Assets/FOOD_AND_DRINKS.jpg';
import WINE_CHART_IMAGE from '../../../Assets/WINE_CHART.jpg';
import PIZZAS_IMAGE from '../../../Assets/PIZZAS.jpg';

export function groupMenuItemsByType(items) {
  return Object.values(items).reduce((results, item) => {
    (results[item.type] = results[item.type] || []).push(item);
    return results;
  }, {});
}

export function getMenuTypeIcon(type) {
  let icon;
  switch (type) {
    case 0:
    default:
      icon = RestaurantMenu;
      break;
    case 1:
      icon = LocalBar;
      break;
    case 2:
      icon = LocalPizza;
      break;
  }

  return <SvgIcon component={icon} viewBox="0 0 25 25" />;
}

export function getMenuTypeImage(type) {
  switch (type) {
    case 0:
    default:
      return FOOD_AND_DRINKS_IMAGE;
    case 1:
      return WINE_CHART_IMAGE;
    case 2:
      return PIZZAS_IMAGE;
  }
}
