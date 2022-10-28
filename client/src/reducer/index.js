const initialState = {
    characters: [],
    allCharacters: [],
    occupations: [],
    detail: {}
}

export default function rootReducer(state=initialState, action) {
    switch (action.type) {
        case 'GET_CHARACTERS':
            return {
                ...state,
                characters: action.payload,
                allCharacters: action.payload
            };
        case 'FILTER_BY_STATUS':
            return {
                ...state,
                characters: action.payload === 'All' ? state.allCharacters : state.allCharacters.filter(el => el.status === action.payload)
            };
        case 'FILTER_CREATED':
            return {
                ...state,
                characters: action.payload === 'All' ? state.allCharacters : action.payload === 'created' ? state.allCharacters.filter(el => el.createdInDb) : state.allCharacters.filter(el => !el.createdInDb)
            };
        case 'ORDER_BY_NAME':
            const sortedArr = state.allCharacters.sort((a, b) => {
                if(a.name < b.name) return -1;
                if(a.name > b.name) return 1;
                return 0;
            });
            const arr = action.payload === 'All' ? state.allCharacters : action.payload === 'asc' ? sortedArr : sortedArr.reverse();
            return {
                ...state,
                characters: [...arr]
            };
        case 'GET_NAME_CHARACTERS':
            return {
                ...state,
                characters: action.payload
            };
        case 'GET_OCCUPATIONS':
            return {
                ...state, 
                occupations: action.payload
            };
        case 'GET_DETAIL':
            return {
                ...state, 
                detail: action.payload
            };
        case 'BACK_HOME':
            return {
                ...state,
                detail: {}
            }
        default:
            return {...state};
    }
}