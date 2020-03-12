import React from "react";
import FilterGroupHeader from "./FilterGroupHeader";

const FilterGroup = props => {
  const filters = props.filterData.filterItems.map((item, index) => {
    return (
      <button
        key={index}
        type="button"
        className={
          item.active
            ? "filter-group__filter-btn filter-group__filter-btn--active"
            : "filter-group__filter-btn"
        }
        onClick={() => {
          props.handleClick(props.groupIndex, index);
        }}
      >
        {item.heading ? item.heading : item.label}
      </button>
    );
  });

  return (
    <div className="filter-group">
      <FilterGroupHeader heading={props.filterData.heading} />
      <div className="filter-group__filters">{filters}</div>
    </div>
  );
};

export default FilterGroup;
