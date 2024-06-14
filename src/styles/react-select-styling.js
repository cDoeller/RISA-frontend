// REACT SELECT STYLING
// https://react-select.com/styles#inner-components
const selectStles = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    border: "0",
    boxShadow: "0 0 1rem var(--greydark)",
    padding: "0",
  }),
  container: (baseStyles, state) => ({
    ...baseStyles,
    outline: "red",
    border: "1px solid black",
    borderRadius: "0",
    padding: "0",
    //   padding: "0.4rem"
    // borderBottom: "2px solid black",
  }),
  dropdownIndicator: (baseStyles, state) => ({
    ...baseStyles,
    border: "none",
    outline: "none",
    color: "black",
  }),
  menu: (baseStyles, state) => ({
    ...baseStyles,
    margin: "0",
    borderRadius: "0",
    maxHeight: "7rem",
    overflow: "scroll",
    boxSizing: "border-box",
    outline: "1px solid black"
  }),
};

export default selectStles;
