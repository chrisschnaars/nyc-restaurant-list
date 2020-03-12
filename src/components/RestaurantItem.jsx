import React from "react";
import capFirstLetterEachWord from "../utils/capFirstLetterEachWord";

const RestaurantItem = props => {
  const items = props.itemData.map((item, index) => {
    // Set animation delay for each item
    const animationDelay = `${0.04 * index}s`;

    return (
      <li
        style={{ animationDelay: animationDelay }}
        className="restaurant-list__item"
        key={item.camis}
        onClick={() => {
          props.handleClick(index);
        }}
      >
        <h2 className="restaurant-list__item-name">
          {capFirstLetterEachWord(item.dba)}
        </h2>
        <div className="restaurant-list__item-meta-container">
          <p className="restaurant-list__item-meta">{item.boro}</p>
          <p className="restaurant-list__item-meta">
            {item.cuisine_description}
          </p>
          <p className="restaurant-list__item-meta">Score: {item.score}</p>
          <p className="restaurant-list__item-meta">
            Grade: {item.grade ? item.grade : "Pending"}
          </p>
        </div>
        <div className="restaurant-list__item-details-container">
          <h4 className="restaurant-list__item-details-header">
            Health Violations
          </h4>
          <p className="restaurant-list__item-details-content">
            {item.violation_description}
          </p>
        </div>
      </li>
    );
  });

  return items;
};

export default RestaurantItem;
