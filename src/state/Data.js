export default function Data(state = "", action) {
  switch (action.type) {
    case "add":
      return action.Data;
    default:
      return state;
  }
}
