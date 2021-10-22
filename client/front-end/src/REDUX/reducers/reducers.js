//IDENTIFIES WHERE DATA STORES
const initialValue = {
    posts: []
}

export default function posts (state=initialValue, action){
    switch (action.type){
        case "LIKE_POST": 
        return state.map((post) => post._id === action.payload._id ? action.payload : post )// that will send data to state posts
        case "DELETE" :
            return state.filter(post => post._id !== action.payload) // Checking the identity of id of single posts and attach to update posts
        case "UPDATE_POST" :
            return state.map((post)=> post._id === action.payload._id ? action.payload : post) //Checking the similarity of posts's id coming from backend 
        case "FETCH_ALL": 
      return state = action.payload; //takes data and sends to store
        case "CREATE_POST" :
            return [...state,  action.payload]; //spreads data and take the specific data coming from backend
        default: return state
    }
}
