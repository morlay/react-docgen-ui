import React from "react";
import Component from "../Component.jsx"

const instance = (
  <Component requiredFunc={function(){}} requiredAny={1}/>
);

React.render(instance, mountNode);