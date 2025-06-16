import {atom} from 'nanostores';

const initialState = {
    id: null,
    name: null,
    lastName: null,
    email: null,
    department: null,
    createdAt: null,
    photo: null
}

// crea el estado inicial ("cuadrado") y lo exporta para ser usado en otros archivos
export const $user = atom({...initialState});

// crea una función que permite actualizar el estado inicial y modificarlo en los archivos que lo necesiten
export const setUser = (user) => {
    $user.set({...$user.get(), ...user});
}

// resetea el estado inicial a su valor por defecto en todos los archivos que lo necesiten
export const resetUser = () => {
    $user.set(initialState);
}