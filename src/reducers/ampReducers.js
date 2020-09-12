export default function updateUser(state = {
    user: {}
  }, action) {    
    switch (action.type) {  
      case 'UPDATE_USER':
        {
        return {user: action.user}
        }
  
      default:
        return state;
  
    }
  };
  