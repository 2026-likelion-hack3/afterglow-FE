// src/api/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'accessToken';

export const saveAccessToken = async (token: string) => {
  await AsyncStorage.setItem(TOKEN_KEY, token);
};

export const getAccessToken = async () => {
  return await AsyncStorage.getItem(TOKEN_KEY);
};