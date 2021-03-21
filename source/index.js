/**
 * drop's JSX pragma
 * @param {*} type
 * @param {*} props
 * @param  {...any} args
 */
 export function drop(type, props, ...args) {
    const children = args.length ? [].concat(...args) : null;
    return {
      type,
      props: props || {},
      children
    };
  }
  
  function isEventProp(name) {
    return /^on/.test(name);
  }
  
  function extractEventName(name) {
    return name.slice(2).toLowerCase();
  }
  
  function setProp(node, name, value) {
    if (name === "className") {
      name = "class";
    } else if (typeof value === "boolean") {
      setBooleanProp(node, name, value);
    }
  
    node.setAttribute(name, value);
  }
  
  function setBooleanProp(node, name, value) {
    if (value) {
      node.setAttribute(name, value);
      node[name] = true;
    } else {
      node[name] = false;
    }
  }
  
  function setAttributes(node, props = {}) {
    if (!props) {
      return;
    }
    Object.keys(props)
      .filter(prop => !isEventProp(prop))
      .forEach(name => setProp(node, name, props[name]));
  }
  
  function addEventListeners(node, props = {}) {
    if (!props) {
      return;
    }
    Object.keys(props)
      .filter(isEventProp)
      .forEach(event =>
        node.addEventListener(extractEventName(event), props[event])
      );
  }
  
  /**
   * Creates a DOM node.
   * @param {*} node
   */
  export function createElement(node) {
   
    if (typeof node === "string" || typeof node === "number") {
      return document.createTextNode(node);
    }
  
    
    if (typeof node.type === "object") {
      return createElement(node.type);
    }
  
    
    if (typeof node.type === "function") {
      return createElement(node.type(node.props));
    }
  
    const element = document.createElement(node.type);
  
   
    setAttributes(element, node.props);
  
 
    addEventListeners(element, node.props);
  
    
    node.children &&
      node.children
        .map(createElement)
        .forEach(child => element.appendChild(child));
  
    return element;
  }
  
  /**
   * Updates a DOM node.
   * @param {*} parentNode
   * @param {*} newNode
   * @param {*} oldNode
   * @param {*} index
   */
  export function updateElement(parentNode, newNode, oldNode, index = 0) {
    if (newNode && typeof newNode.type === "function") {
      newNode = newNode.type(newNode.props);
    }
  
    if (oldNode && typeof oldNode.type === "function") {
      oldNode = oldNode.type(oldNode.props);
    }
  
    
    if (oldNode === undefined || oldNode === null) {
      parentNode.appendChild(createElement(newNode));
      
    } else if (newNode === undefined || newNode === null) {
      parentNode.removeChild(parentNode.childNodes[index]);
      
    } else if (nodesAreDifferent(newNode, oldNode)) {
      parentNode.replaceChild(
        createElement(newNode),
        parentNode.childNodes[index]
      );
    } else if (newNode.type) {
      const newLength = newNode.children ? newNode.children.length : 0;
      const oldLength = oldNode.children ? oldNode.children.length : 0;
  
      
      for (let i = 0; i < newLength || i < oldLength; i++) {
        updateElement(
          parentNode.childNodes[index],
          newNode.children[i],
          oldNode.children[i],
          i
        );
      }
    }
  }
  
  /**
   * Compares two DOM nodes to decide if they are different.
   * @param {*} first
   * @param {*} second
   */
  function nodesAreDifferent(first, second) {
    return (
      typeof first !== typeof second ||
      ((typeof first === "string" || typeof first === "number") &&
        first !== second) ||
      first.type !== second.type
    );
  }
