let shop = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
  return (shop.innerHTML = shopItems
    .map((item) => {
      let { id, name, disc, img, price } = item;
      let search = basket.find((x) => x.id === id) || [];
      return `
    <div id="product-id-${id}" class="item">
    <img width="220" src=${img} alt="" />
    <div class="details">
      <h3>${name}</h3>
      <p>${disc}</p>
      <div class="price-quantity">
        <h2>$ ${price}</h2>
        <div class="buttons">
          <i class="bi bi-dash-lg" onClick= "decrement(${id})"></i>
          <div id=${id} class="quantity">
          ${search.item === undefined ? 0 : search.item}
          </div>
          <i class="bi bi-plus-lg" onClick= "increment(${id})"></i>
        </div>
      </div>
    </div>
  </div>
    `;
    })
    .join(""));
};

generateShop();

let increment = (id) => {
  let search = basket.find((x) => x.id === id);
  if (search === undefined) {
    basket.push({
      id: id,
      item: 1,
    });
  } else {
    search.item = search.item + 1;
  }

  // console.log(basket);
  update(id);
  localStorage.setItem("data", JSON.stringify(basket));
};
let decrement = (id) => {
  let search = basket.find((x) => x.id === id);
  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item = search.item - 1;
  }
  //console.log(basket);
  update(id);
  basket = basket.filter((x) => x.item !== 0);
  localStorage.setItem("data", JSON.stringify(basket));
};
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  //console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();
