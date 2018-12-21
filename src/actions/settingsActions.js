import { UPDATE_SETTINGS,  GET_SETTINGS } from './types';

import unit from '../constants/units';

const defaultSettings = {
  temperature: {
    name: unit.temperature.celsius.name,
    symbol: unit.temperature.celsius.symbol
  },
  windSpeed: {
    name: unit.windSpeed.kilometersPerHour.name,
    symbol: unit.windSpeed.kilometersPerHour.symbol
  },
  pressure: {
    name: unit.pressure.milliBar.name,
    symbol: unit.pressure.milliBar.symbol
  },
  distance: {
    name: unit.distance.kilometers.name,
    symbol: unit.distance.kilometers.symbol
  }
}

export const updateSettings = (setting,newValue) =>{
  // get from local storage and update
  const settings = JSON.parse(localStorage.getItem('settings'));
  if(settings !== null){
    settings[setting] = newValue;
    localStorage.setItem('settings',JSON.stringify(settings)); 
  } else {
    defaultSettings[setting] = newValue;
    localStorage.setItem('settings',JSON.stringify(defaultSettings));
  }
  return{
    type: UPDATE_SETTINGS,
    payload: {
      setting,
      newValue
    }
  }
  // console.warn("There is no 'settings' file in localstorage, application can't save your settings changes");
}

export const getSettings = () =>{
  // get from local storage and send to reducer
  const settings = JSON.parse(localStorage.getItem('settings'));
  if(settings !== null){
    return {
      type: GET_SETTINGS,
      payload: settings
    }
  }
  // default values if no settings were saved
  return {
    type: GET_SETTINGS,
    payload: defaultSettings
  }
}