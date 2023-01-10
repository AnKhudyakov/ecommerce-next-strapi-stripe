import ShoppingList from "./ShoppingList";
import Subscribe from "./Subscribe";
import MainCarousel from "./MainCarousel";

function HomePage() {
  return (
    <div className="home">
      <MainCarousel />
      {/* <ShoppingList /> */}
      <Subscribe />
    </div>
  );
}

export default HomePage;
