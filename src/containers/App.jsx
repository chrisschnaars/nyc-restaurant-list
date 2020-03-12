import React, { Component } from "react";
import RestaurantList from "../components/RestaurantList";
import FilterBar from "../components/FilterBar";

class App extends Component {
  constructor() {
    super();

    this.state = {
      activeFiltersCount: 0,
      filters: [
        {
          heading: "Borough",
          label: "boro",
          activeFlag: false,
          filterItems: [
            {
              label: "Brooklyn",
              active: false
            },
            {
              label: "Bronx",
              active: false
            },
            {
              label: "Manhattan",
              active: false
            },
            {
              label: "Queens",
              active: false
            },
            {
              label: "Staten Island",
              active: false
            }
          ]
        },
        {
          heading: "Health Grade",
          label: "grade",
          activeFlag: false,
          filterItems: [
            {
              label: "A",
              active: false
            },
            {
              label: "B",
              active: false
            },
            {
              label: "C",
              active: false
            },
            {
              label: "P",
              active: false
            },
            {
              label: "Z",
              active: false
            }
          ]
        },
        {
          heading: "Cuisine",
          label: "cuisine_description",
          activeFlag: false,
          filterItems: [
            {
              label: "Pizza",
              active: false
            },
            {
              label: "Bakery",
              active: false
            },
            {
              label: "Chinese",
              active: false
            },
            {
              label: "Mexican",
              active: false
            },
            {
              label: "Café",
              active: false
            },
            {
              label: "Indian",
              active: false
            },
            {
              label: "American",
              active: false
            },
            {
              label: "Japanese",
              active: false
            },
            {
              label: "French",
              active: false
            }
          ]
        },
        {
          heading: "Status",
          label: "action",
          activeFlag: false,
          filterItems: [
            {
              heading: "Shut Down",
              label: "Establishment Closed by DOHMH",
              active: false
            }
          ]
        }
      ]
    };
    this.toggleFilter = this.toggleFilter.bind(this);
    this.checkFilterGroupActiveStatus = this.checkFilterGroupActiveStatus.bind(
      this
    );
  }

  toggleFilter(groupIndex, filterIndex) {
    // Make copy of filters
    // Reference here: http://timschiller.ca/immutability-react-state-javascript/
    let updatedFilters = JSON.parse(JSON.stringify(this.state.filters));

    // Find status of selected filter and flip it
    const updatedStatus = this.state.filters[groupIndex].filterItems[
      filterIndex
    ].active
      ? false
      : true;

    // Update active state of selected filter
    updatedFilters[groupIndex].filterItems[filterIndex].active = updatedStatus;

    // Update active state of filter group
    updatedFilters[groupIndex].activeFlag = this.checkFilterGroupActiveStatus(
      updatedStatus,
      groupIndex,
      filterIndex
    );

    // Set filter state
    this.setState({
      filters: updatedFilters
    });
  }

  checkFilterGroupActiveStatus(updatedStatus, groupIndex, filterIndex) {
    let filterGroup = this.state.filters[groupIndex];
    let groupStatus = false;

    if (updatedStatus) {
      groupStatus = true;
    } else {
      for (let i = 0; i < filterGroup.filterItems.length; i++) {
        // Don't check the filter that was selected
        // it's state hasn't been updated
        if (i !== filterIndex) {
          if (filterGroup.filterItems[i].active) {
            groupStatus = true;
          }
        }
      }
    }

    return groupStatus;
  }

  render() {
    return (
      <div className="site">
        <FilterBar
          filterData={this.state.filters}
          handleClick={this.toggleFilter}
        />
        <RestaurantList filterData={this.state.filters} />
      </div>
    );
  }
}

export default App;
