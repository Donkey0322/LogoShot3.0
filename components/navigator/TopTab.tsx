import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { withLayoutContext } from 'expo-router';

const Tab = createMaterialTopTabNavigator();

export const Toptab = withLayoutContext(Tab.Navigator);
