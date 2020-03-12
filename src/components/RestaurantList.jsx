import React from "react";
import RestaurantListHeader from "./RestaurantListHeader";
import RestaurantItem from "./RestaurantItem";
import RestaurantListPagination from "./RestaurantListPagination";

class RestaurantList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      restaurants: null,
      filteredRestaurants: null,
      paginatedList: null,
      currentPage: 0,
      prevPageStatus: false,
      nextPageStatus: true
    };
    this.createFilteredList = this.createFilteredList.bind(this);
    this.createPaginatedList = this.createPaginatedList.bind(this);
    this.toggleItemState = this.toggleItemState.bind(this);
    this.changePage = this.changePage.bind(this);
    this.resultsPerPage = 30;
    this.firstItemOnPage = null;
    this.lastItemOnPage = null;
  }

  // Get list of restaurants from API
  async componentDidMount() {
    // Create api request
    const endpoint = "https://data.cityofnewyork.us/resource/43nn-pn8j.json?";
    const apikey = `$$app_token=${process.env.REACT_APP_NYCDATA_APP_TOKEN}`;
    const where = "&$where=score IS NOT NULL";
    const url = `${endpoint}${apikey}${where}`;

    // Fetch data
    const response = await fetch(url);
    const data = await response.json();

    // Set state with restaurant data
    this.setState({
      loading: false,
      restaurants: data
    });

    // Create a filtered list
    this.createFilteredList();
  }

  // Update the filtered list when filter data changes
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.filterData !== this.props.filterData) {
      this.createFilteredList();
    }

    if (prevState.currentPage !== this.state.currentPage) {
      this.createPaginatedList();
      window.scrollTo(0, 0);
    }
  }

  // Create a filtered result list based on active filters
  createFilteredList() {
    // Create a filtered list variable
    let filteredList = this.state.restaurants.map(item => item);

    // If there are active filters, loop through them
    // Remove any items that match an inactive filter
    const filters = this.props.filterData;
    filters.forEach(filterGroup => {
      if (filterGroup.activeFlag) {
        const { filterItems } = filterGroup;

        // Create an array of all active filter values
        let activeFilters = [];
        filterItems.forEach(filter => {
          // Create an array of all active filters
          if (filter.active) {
            activeFilters.push(filter.label);
          }
        });

        // Loop through restaurant list
        // Remove from array if they don't match any filter from the list
        for (let i = filteredList.length - 1; i >= 0; i--) {
          // Set remove flag to true
          let remove = true;

          // Loop through filters
          // If value matches a filter, flip remove flag to false
          for (let j = 0; j < activeFilters.length; j++) {
            if (
              filteredList[i][filterGroup.label] !== undefined &&
              filteredList[i][filterGroup.label].includes(activeFilters[j])
            ) {
              remove = false;
            }
          }

          // Remove from list if flag is true
          if (remove) {
            filteredList.splice(i, 1);
          }
        }
      }
    });

    // Set filtered list state
    // After set, create paginated list
    this.setState(
      {
        filteredRestaurants: filteredList,
        currentPage: 0
      },
      () => {
        this.createPaginatedList();
      }
    );
  }

  // Created paginated results list
  createPaginatedList() {
    // Set paginated list to filtered list
    let paginatedList = [];

    // Get length of filtered list
    const numberOfFilteredItems = this.state.filteredRestaurants.length;

    // Determine the index of the first items on the page
    this.firstItemOnPage = this.state.currentPage * this.resultsPerPage;

    // Determien the index of the last item on page
    if (this.firstItemOnPage + this.resultsPerPage > numberOfFilteredItems) {
      this.lastItemOnPage = numberOfFilteredItems;
    } else {
      this.lastItemOnPage = this.firstItemOnPage + this.resultsPerPage;
    }

    // Cut down list to current page worth of items
    if (this.firstItemOnPage <= numberOfFilteredItems) {
      paginatedList = this.state.filteredRestaurants.slice(
        this.firstItemOnPage,
        this.lastItemOnPage
      );
    } else {
      paginatedList = this.state.filteredRestaurants.map(item => item);
    }

    // Set prev and next page statuses
    const prevPageStatus = this.state.currentPage > 0 ? true : false;
    const nextPageStatus =
      this.lastItemOnPage === numberOfFilteredItems ? false : true;

    this.setState({
      paginatedList: paginatedList,
      prevPageStatus: prevPageStatus,
      nextPageStatus: nextPageStatus
    });
  }

  // Handle clicking on/off of each listing
  toggleItemState(id) {
    // Grab DOM elements for item and details container
    const items = document.querySelectorAll(".restaurant-list__item");
    const detailContainers = document.querySelectorAll(
      ".restaurant-list__item-details-container"
    );

    // Remove active
    for (let i = 0; i < items.length; i++) {
      if (id !== i) {
        items[i].classList.remove("restaurant-list__item--active");
        detailContainers[i].classList.remove(
          "restaurant-list__item-details-container--active"
        );
      }
    }

    // Activate new item
    items[id].classList.toggle("restaurant-list__item--active");
    detailContainers[id].classList.toggle(
      "restaurant-list__item-details-container--active"
    );
  }

  // Change page
  changePage(e) {
    // Increment values tells whether to go up or down a page
    const incrementValue = parseInt(e.target.value);

    // Get value of current page
    const currentPage = this.state.currentPage;

    // Set value of new page
    let newPage = currentPage + incrementValue;
    if (newPage < 0) {
      newPage = 0;
    }

    this.setState({
      currentPage: newPage,
      paginatedList: null
    });
  }

  render() {
    // Loading state
    if (this.state.loading === true) {
      return <RestaurantListHeader content={"Loading restaurant data..."} />;
    }

    // No data
    if (this.state.paginatedList === null) {
      return (
        <RestaurantListHeader
          content={"We couldn't get any restaurant data."}
        />
      );
    }

    // No results
    if (this.state.paginatedList.length === 0) {
      return (
        <RestaurantListHeader
          content={"No restaurants have matched your filters"}
        />
      );
    }

    // If there are restaurants to display
    return (
      <div className="restaurant-list">
        <RestaurantListHeader
          content={`Showing ${this.firstItemOnPage + 1} – ${
            this.lastItemOnPage
          } of ${this.state.filteredRestaurants.length} restaurants`}
        />
        <ul className="restaurant-list__list">
          <RestaurantItem
            itemData={this.state.paginatedList}
            handleClick={this.toggleItemState}
          />
        </ul>
        <RestaurantListPagination
          prevPageStatus={this.state.prevPageStatus}
          nextPageStatus={this.state.nextPageStatus}
          handleClick={this.changePage}
        />
      </div>
    );
  }
}

export default RestaurantList;
