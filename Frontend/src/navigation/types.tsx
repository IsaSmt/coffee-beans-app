import { NavigationProp } from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  Roasteries: { reload?: boolean };
  AddRoastery: undefined;
  RoasteryProfile: { roasteryId: string };
  CoffeeBeans: { reload?: boolean };
  AddCoffeeBean: undefined;
  BeanProfile: { beanId: string };
  CountryOfOrigin: { reload?: boolean };
  AddCountry: undefined;
};

export type NavigationProps<T extends keyof RootStackParamList> = {
  navigation: NavigationProp<RootStackParamList, T>;
};

