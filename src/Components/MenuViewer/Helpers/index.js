import React from 'react';
import {
  LocalBar,
  Fastfood,
} from '@material-ui/icons';
import SvgIcon from "@material-ui/core/SvgIcon";

export function groupMenuItemsByType(items) {
  return Object.values(items).reduce((results, item) => {
    (results[item.type] = results[item.type] || []).push(item);
    return results;
  }, {});
}

export function getCategoryIcon(type) {
  let icon;
  switch (type) {
    case 0:
      icon = Fastfood;
      break;
    case 1:
      icon = LocalBar;
      break;
    default:
      icon = Fastfood;
      break;
  }

  return <SvgIcon component={icon} viewBox="0 0 25 25" />;
}
