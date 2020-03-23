//  a function which will return the component passed to it based on the boolean value passed to it.
// https://stackoverflow.com/questions/30266831/hide-show-components-in-react-native
'use strict';
const isFunction = input => typeof input === 'function';
export default predicate => elemOrThunk =>
  predicate ? (isFunction(elemOrThunk) ? elemOrThunk() : elemOrThunk) : null;