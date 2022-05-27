import notification from "../components/Notification";
import moment from "moment";
import CampaignOfferNotification from "../components/Campaign/CampaignOfferNotification";
import ProductRow from "./../components/TrackOrder/ProductRow";
import { element } from "prop-types";

const OfferCard1 = "https://storage.googleapis.com/aodour_v1/campaign/new-year-sale/Notification2.png";
const OfferCard2 = "https://storage.googleapis.com/aodour_v1/campaign/new-year-sale/Notification1.png";
const OfferCardAll = "https://storage.googleapis.com/aodour_v1/campaign/new-year-sale/Notification.png"

const DeliveryCard = "https://storage.googleapis.com/aodour_v1/campaign/Feb/image1.png"
const FreeGiftCard = "https://storage.googleapis.com/aodour_v1/campaign/Feb/image2.png"
// const OfferCard1 =
//   "https://storage.googleapis.com/aodour_v1/website/campain/Offer-card-img1.png";
// const OfferCard2 =
//   "https://storage.googleapis.com/aodour_v1/website/campain/Offer-card-img2.png";
export const emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const phoneformat = /^03\d{9}$/;
export const nameFormat = /^[a-zA-Z\s]+$/;

export const filterProducts = (
  products,
  priceFilter,
  page,
  viewLimit,
  sort = "none",
  appliedFeature,
  selectedBrands,
  discount
) => {
  let filterProducts = products.filter((product) => {
    for (const variation of product.variations) {
      if (
        variation.price >= priceFilter.min &&
        variation.price <= priceFilter.max
      ) {
        return true;
      }
    }
    return false;
  });

  if (appliedFeature.length > 0) {
    filterProducts = filterProducts.filter((product) => {
      if (product.features) {
        for (let i = 0; i < product.features.length; i++) {
          for (let j = 0; j < appliedFeature.length; j++) {
            if (product.features[i].value === appliedFeature[j].value) {
              return true;
            }
          }
        }
      }
      return false;
    });
  }

  if (selectedBrands && selectedBrands.length > 0) {
    filterProducts = filterProducts.filter((product) => {
      return selectedBrands.find(({ value }) => value === product.brandName)
        ? true
        : false;
    });
  }

  if (discount) {
    filterProducts = filterProducts.filter(({ variations }) => {
      for (const {
        discountPercentage,
        discountStartTime,
        discountEndTime,
      } of variations) {
        if (
          discountPercentage > 0 &&
          moment().isSameOrAfter(discountStartTime, ) &&
          moment().isSameOrBefore(discountEndTime)
        ) {
          return true;
        }
      }
      return false;
    });
  }

  if (sort.localeCompare("none")) {
    switch (sort) {
      case "rating":
        filterProducts.sort((a, b) => a.rating - b.rating);
        break;
      case "new_arrival":
        // filterProducts.sort((a,b)=>a.rating>b.rating)
        break;
      case "low_to_high":
        // TODO: implement sort low_to_high
        // filterProducts.sort((a, b) => a.price - b.price);
        filterProducts.sort(sortFunction);
        break;
      case "high_to_low":
        // TODO: implement sort high_to_low
        // filterProducts.sort((a, b) => a.price - b.price).reverse();
        filterProducts.sort(sortFunction).reverse();
        break;
      default:
    }
  }
  return {
    length: filterProducts.length,
    Products: filterProducts.slice(
      page * parseInt(viewLimit),
      page * parseInt(viewLimit) + parseInt(viewLimit)
    ),
  };
};

const sortFunction = (a, b) => {
  let aMin = a.variations.length > 0 ? a.variations[0].price : 0;
  let bMin = b.variations.length > 0 ? b.variations[0].price : 0;

  for (const { price } of a.variations) {
    if (price < aMin) aMin = price;
  }

  for (const { price } of b.variations) {
    if (price < bMin) bMin = price;
  }

  return aMin - bMin;
};

export const filterbycategory = (products, categoryId, fieldinproducts) => {
  if (categoryId !== -1 && products.length > 0) {
    return products.filter(
      (product) => product[fieldinproducts] === categoryId
    );
  }
  return products;
};

export const getdynamicNumber = (min = 0, max = 9) => {
  let arr = [1, 1, 2, 1, 3, 1, 2, 1, 3, 1];
  let num = Math.floor(Math.random() * (max - min + 1)) + min;
  return arr[num];
}

export const UniqueAttribute = (data) => {
  const array = [];
  const allattribute = [];
  data.map(({ attributes, main_category_id }) => {
    // const attribute = [];
    attributes.map((itemout) => {
      if (allattribute.length === 0) {
        allattribute.push(itemout);
      } else {
        allattribute.find((item) => {
          return item.atribute_id !== itemout.atribute_id
            ? allattribute.push(item)
            : null;
        });
      }
      return;
    });
    return;
  });

  return allattribute;
};

export const AllAttributes = (data) => {
  const allattribute = [];
  data.map(({ attributes, main_category_id }) => {
    allattribute.push(...attributes);
  });

  return allattribute;
};

const getPrice = (product) => {
  if (
    product.discountPercentage > 0 &&
    moment().isSameOrAfter(product.discountStartTime, ) &&
    moment().isSameOrBefore(product.discountEndTime)
  ) {
    return Math.round(product.price - product.discountPrice);
  } else {
    return Math.round(product.price);
  }
};

const totalPrice = (cartList) => {
  let sum = 0;
  for (const product of cartList) {
    sum = sum + getPrice(product) * product.qty;
  }
  return sum;
};

export const showCampaignNotification = (list, delay = 5000, duration = 3) => {

  let qty = 0;
  for (let item of list) {
    qty += item.qty;
  }

  let isShow = list.some(item => item.extraDiscount)

  if (qty > 0 && qty < 3 && !isShow) {
    setTimeout(() => {
      CampaignOfferNotification({ image: DeliveryCard, duration, prCount: 3-qty });
    }, delay);
    return;
  }

  if (qty > 0 && qty < 5 && !isShow) {
    setTimeout(() => {
      CampaignOfferNotification({ image: FreeGiftCard, duration, prCount: 5-qty });
    }, delay);
    return;
  }

  // const total = totalPrice(list);

  //   if (total >= 10000) {
  //     return;
  //   }

  //   if (total >= 5000) {
  //     setTimeout(() => {
  //     CampaignOfferNotification({ image: OfferCard2,duration });
  //     },delay);
  //     return;
  //   }

  //   if (total > 0 && total < 5000) {
  //     setTimeout(() => {
  //       CampaignOfferNotification({ image: OfferCard1,duration });
  //     }, delay);
  //     return;
  //   }

  //   if (total === 0) {
  //   setTimeout(() => {
  //     CampaignOfferNotification({ image: OfferCardAll,duration });
  //   }, delay);
  // }
};

export const addtocartController = (list, newproduct) => {
  if (newproduct.qty <= newproduct.availableQuantity) {
    if (
      list &&
      list.length > 0 &&
      list.find((product) => product.id === newproduct.id)
    ) {
      const newList = list.map((product) => {
        if (
          newproduct.id === product.id &&
          newproduct.availableQuantity >= product.qty + newproduct.qty &&
          product.qty + newproduct.qty <= 5
        ) {
          product.qty += newproduct.qty;
          // notification({ message: "item added to cart" });
        }
        if (
          newproduct.id === product.id &&
          newproduct.availableQuantity < product.qty + newproduct.qty &&
          product.qty + newproduct.qty <= 5
        ) {
          product.qty += newproduct.qty;
          // notification({ message: "" });
        }
        product.cartDate = moment().format('YYYY-MM-DDThh:mm:ss');
        return product;
      });
      // showCampaignNotification(newList);
      return newList;
    }
    // showCampaignNotification([...list, { ...newproduct }]);
    return [...list, { ...newproduct, cartDate: moment().format('YYYY-MM-DDThh:mm:ss') }];
  }
  // putCartData(list)
  return list;
};

export const removefromcard = (List, newproduct) => {
  const list = List.filter((product) => {
    if (newproduct.id === product.id) {
      return false;
    }
    return true;
  });
  putCartData(checkCartItemsExpiry(list));
  notification({ message: "item removed from cart" });
  return list;
};

export const QTYChanges = (List, upCommingproduct) => {
  const list = List.map((product) => {
    if (upCommingproduct.id === product.id) {
      upCommingproduct.cartDate = moment().format('YYYY-MM-DDThh:mm:ss');
      return upCommingproduct;
    }
    product.cartDate = moment().format('YYYY-MM-DDThh:mm:ss');
    return product;
  });

  putCartData(checkCartItemsExpiry(list));
  // showCampaignNotification(list);
  return list;
};

export const removeDuplicates = (myArr, prop) => {
  return myArr.filter((obj, pos, arr) => {
    return arr.map((mapObj) => mapObj[prop]).indexOf(obj[prop]) === pos;
  });
};

export const getCartData = () => {
  let value = window.localStorage.getItem("cart");
  if (value) return checkCartItemsExpiry(JSON.parse(value));
  return [];
};

export const addtocart = (list, newproduct) => {
  let NewList = checkCartItemsExpiry(addtocartController(list, newproduct));
  window.localStorage.setItem("cart", JSON.stringify(NewList));

  return NewList;
};

export const putCartData = (data) => {
  return window.localStorage.setItem("cart", JSON.stringify(data));
};
export const emptyCartData = () => {
  return window.localStorage.removeItem("cart");
};


export const isCartProductExpired = (dateTime) => {

  var returned_endate = moment().format("YYYY-MM-DDThh:mm:ss");
  var expected_enddate = moment(dateTime).add(1, 'day').format("YYYY-MM-DDThh:mm:ss")  // see the cloning?

  console.log(returned_endate, moment(returned_endate).isAfter(expected_enddate), expected_enddate);
  return moment(returned_endate).isAfter(expected_enddate);
};

export const checkCartItemsExpiry = (list) => {
  return list.filter(pr => !isCartProductExpired(pr.cartDate))
}

export const getBreadCrumbs = (
  category,
  subCategory,
  subSubCategory,
  pageName,
  brandName
) => {
  const crumbs = [];
  crumbs.push({ name: "Home", url: "/" });
  if (pageName === "SubCategory") {
    crumbs.push({ name: "Category", url: "/" });
    if (category) {
      crumbs.push({
        name: category.name,
        url: subCategory ? `/shop/${category.slug}` : "",
      });
      if (subCategory) {
        crumbs.push({
          name: subCategory.name,
          url: subSubCategory ? `/subcategory/${subCategory.slug}` : "",
        });
        if (subSubCategory) {
          crumbs.push({ name: subSubCategory.name, url: "" });
        }
      }
    }
  } else if (pageName === "miniso") {
    crumbs.push({ name: "Miniso", url: "/miniso" });
    if (category) {
      crumbs.push({
        name: category.name,
        url: subCategory ? `/miniso/${category.slug}` : "",
      });
      if (subCategory) {
        crumbs.push({
          name: subCategory.name,
          url: subSubCategory ? `/miniso/subcategory/${subCategory.slug}` : "",
        });
        if (subSubCategory) {
          crumbs.push({ name: subSubCategory.name, url: "" });
        }
      }
    }
  } else {
    const basePath = window.location.pathname;
    if (pageName === "Brands") {
      crumbs.push({ name: pageName, url: "/" });
      crumbs.push({ name: brandName, url: category ? basePath : "" });
    } else {
      crumbs.push({ name: pageName, url: category ? basePath : "" });
    }
    if (category) {
      let query = `?category=${category.slug}`;
      crumbs.push({
        name: category.name,
        url: subCategory ? `${basePath}${query}` : "",
      });
      if (subCategory) {
        query = query + `&subcategory=${subCategory.slug}`;
        crumbs.push({
          name: subCategory.name,
          url: subSubCategory ? `${basePath}${query}` : "",
        });
        if (subSubCategory) {
          query = query + `&subsubcategory=${subSubCategory.slug}`;
          crumbs.push({ name: subSubCategory.name, url: "" });
        }
      }
    }
  }
  return crumbs;
};

export const validateName = (value, setError) => {
  if (value.length >= 3) {
    if (setError) setError(false);
    return true;
  } else {
    if (setError) setError(true);
    return false;
  }
};

export const validatePhone = (value, setError) => {
  if (value.match(phoneformat)) {
    if (setError) setError(false);
    return true;
  } else {
    if (setError) setError(true);
    return false;
  }
};

export const validatePassword = (value, setError) => {
  if (value.length > 7) {
    if (setError) setError(false);
    return true;
  } else {
    if (setError) setError(true);
    return false;
  }
};

export const validateEmail = (value, setError) => {
  if (value.match(emailformat)) {
    if (setError) setError(false);
    return true;
  } else {
    if (setError) setError(true);
    return false;
  }
};

export const saveUserToken = (userToken, verified) => {
  window.localStorage.setItem("userToken", userToken ? userToken : "");
  setUserVerified(verified);
};

export const getUserToken = () => {
  return window.localStorage.getItem("userToken");
};

export const isUserLoggedIn = () => {
  const token = getUserToken();

  if (token && token !== "") {
    return true;
  }
  return false;
};

export const isUserVerified = () => {
  const verified = window.localStorage.getItem("userVerified");
  if (verified && verified == 1) {
    return true;
  }
  return false;
};

export const setUserVerified = (verified) => {
  window.localStorage.setItem("userVerified", verified);
};

export const deleteUserToken = () => {
  window.localStorage.removeItem("userToken");
  window.localStorage.removeItem("userVerified");
};

function partition(array, isValid) {
  return array.reduce(
    ([pass, fail], elem) => {
      return isValid(elem) ? [[...pass, elem], fail] : [pass, [...fail, elem]];
    },
    [[], []]
  );
}

//Buy 1 Get 1 Free
export const BuyOneGetOneFree = (products) => {
  return products;
  let [inncommingGift, filterproducts] = partition(
    products,
    (item) => item.free
  );

  for (const p of inncommingGift) {
    const index = filterproducts.findIndex((item) => item.id === p.pid);
    if (index > -1) {
      filterproducts[index] = {
        ...filterproducts[index],
        qty: p.qty + filterproducts[index].qty,
      };
    } else {
      filterproducts = [...filterproducts, { ...p, id: p.pid, free: false }];
    }
  }

  let [productsIncampaigns, remains] = partition(
    filterproducts,
    (element) =>
      element.activeCampaignName == 'Buy 1 Get 1 Free' &&
      // element.activeCampaignName !== null &&
      element.activeCampaignName.length > 1
    // &&
    // moment().isSameOrAfter(element.discountStartTime) &&
    // moment().isSameOrBefore(element.discountEndTime)
  );

  productsIncampaigns = productsIncampaigns.sort((a, b) => a.price - b.price);

  let totalQuantity = 0;
  for (const { qty } of productsIncampaigns)
    totalQuantity = totalQuantity + qty;

  const freeqty = Math.floor(totalQuantity / 2);

  let remainQty = freeqty;
  let freegift = [],
    others = [];
  for (const p of productsIncampaigns) {
    if (remainQty > 0) {
      if (p.qty > remainQty) {
        freegift = [
          ...freegift,
          { ...p, id: `${p.id}-free`, qty: remainQty, pid: p.id, free: true },
        ];
        others = [...others, { ...p, qty: p.qty - remainQty }];
        remainQty = 0;
      } else {
        freegift = [
          ...freegift,
          { ...p, id: `${p.id}-free`, pid: p.id, free: true },
        ];
        remainQty = remainQty - p.qty;
      }
    } else {
      others = [...others, p];
    }
  }

  return [...freegift, ...others, ...remains];
  // return final;
};
