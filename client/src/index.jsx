import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      tacoListings: [],
      popularListings: [],
      location: '',
      rating: '',
      price: ''
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.onChange = this.onChange.bind(this);
    this.makeFavorite = this.makeFavorite.bind(this);
  }

  componentDidMount() {
    fetch('/get-taco-restaurants')
      .then(res =>
        res.json()
      )
      .then(listings => {
        this.setState({ tacoListings: listings.data.businesses });
      })
  }

  onChange (event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSearch() {
    fetch('/search-locations', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        "location": this.state.location,
        "price": this.state.price
      })
    })
  };

  makeFavorite(event) {
    var ListingIndex = event.target.value;
    console.log(ListingIndex);
    console.log(this.state.tacoListings[ListingIndex]);
  //   fetch('/post-taco-restaurants', {
  //     method: 'POST',
  //     headers: {'Content-Type': 'application/json'}
  //   })
  };

    render() {
      return (
        <div>
          <TitleContainer>
          <Title>Taco Finder</Title>
          </TitleContainer>
          <SearchNFavorites>
            <Search>Search</Search>
            <Favorites>favorites</Favorites>
          </SearchNFavorites>
          <SearchContainer>
          <Form onSubmit={this.handleSearch}>
            <Input
              type="text"
              className="location"
              name="location"
              placeholder="Search by your city"
              value={this.state.location}
              onChange={this.onChange}
            />
            <Input
              type="text"
              className="price"
              name="price"
              placeholder="Search by price"
              value={this.state.price}
              onChange={this.onChange}
            />
            <Submit type="submit" value="Submit" />
          </Form>
          </SearchContainer>
          <ListingsContainer>
          {this.state.tacoListings.map((restaurant, index) => (
              <div key={restaurant.alias}>

                <Restaurant>
                <Favorite type="submit" placeholder="<3" value={index} onClick={this.makeFavorite}></Favorite>
                  <Image src={restaurant.image_url} height="" width="80"/>
                  <Name>{restaurant.name}</Name>
                  <Price>{restaurant.price}</Price>
                  <Rating>{restaurant.rating} star rating</Rating>
                  <ReviewCount>{restaurant.review_count} reviews</ReviewCount>
                  <Address>{restaurant.location.display_address}</Address>
                </Restaurant>
              </div>
          ))}
            </ListingsContainer>
        </div>
      )
    }
  }
// TODO place an index on each restaurant making it accessible on the tacoListings array
// TODO post restaurant to the MongoDB database using the endpoint '/post-taco-restaurants'

const SearchNFavorites = styled.div`
  display: flex;
  justify-content: center;
  height: 50px;
  width: 80%;
  margin: auto;
`;

const Search = styled.div`
  font-family: 'Abel', sans-serif;
  font-size: 200%;
  margin: 10px;
`;

const Favorites = styled.div`
  font-family: 'Abel', sans-serif;
  font-size: 200%;
  margin: 10px;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  font-family: 'Abel', sans-serif;
  border-radius: 3px;
  height: 200px;
  width: 80%;
  margin: auto;
`;

const Title = styled.div`
  font-family: 'Abel', sans-serif;
  margin: auto;
  font-size: 800%;
`;

const SearchContainer = styled.div`
  background-color: #F03E81;
  display: flex;
  border-radius: 3px;
  justify-content: center;
  width: 70%;
  height: 200px;
  margin: auto;
`;

const ListingsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-content: center;
  background-color: #FDFEFE;
  width: 70%;
  margin: auto;
`;

const Restaurant = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  height: 10%;
  width: 90%;
  margin: 3px;
  margin-left: 40px;
  background-color: #ffffff;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 200px;
  margin: 0 15px
`;

const Input = styled.input`
  padding: 12px 20px;
  margin: 15px;
  box-sizing: border-box;
  border: 2px solid white;
  border-radius: 4px;
  &:focus {
    border-color: #555;
    outline: none !important;
  }
`;

const Submit = styled.input`
  background: transparent;
  border-radius: 3px;
  border: 2px solid white;
  color: white;
  margin: 0 1em;
  padding: 0.25em 1em;
`;

const Name = styled.div`
  font-family: 'Abel', sans-serif;
  font-weight: bold;
  font-size: 160%;
  margin: 5px;
`;

const Price = styled.div`
  font-family: 'Abel', sans-serif;
  font-size: 120%;
  margin: 3px;
`;

const Rating = styled.div`
  font-family: 'Abel', sans-serif;
  font-size: 120%;
  margin: 3px;
`;

const ReviewCount = styled.div`
  font-family: 'Abel', sans-serif;
  font-size: 120%;
  margin: 3px;
`;

const Address = styled.div`
  font-family: 'Abel', sans-serif;
  font-size: 120%;
  margin: 3px;
`;

const Image = styled.img`
  font-family: 'Abel', sans-serif;
  border-radius: 20%;
`;

const Favorite = styled.button`
  background: transparent;
  align-self: flex-end;
  border-radius: 3px;
  border: 2px solid black;
  color: white;
  margin: 0 1em;
  padding: 0.25em 1em;
`;



ReactDOM.render(<App />, document.getElementById('taco'));

export default App;