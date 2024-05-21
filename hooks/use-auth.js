import { useContext } from 'react';
import {  Context as AuthContext  } from '../contextApi/AuthContext.js';

export const useAuth = () => useContext(AuthContext);
