const getElementsByClassName = function(className){
  const elements = document.getElementsByClassName(className);
  const result = [];
  for(let index=0; index < elements.length; index++){
    result.push(elements.item(index));
  }
  return result;
}