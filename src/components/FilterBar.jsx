import React from "react";
import FilterGroup from "./FilterGroup";

const FilterBar = props => {
  const { filterData, handleClick } = props;

  const filterGroups = filterData.map((item, index) => {
    return (
      <FilterGroup
        groupIndex={index}
        filterData={item}
        handleClick={handleClick}
        key={index}
      />
    );
  });

  return (
    <div className="filter-bar">
      <h1 className="filter-bar__header">NYC Restaurant Search</h1>
      {filterGroups}
    </div>
  );
};

export default FilterBar;
