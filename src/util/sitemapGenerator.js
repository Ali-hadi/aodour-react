import routes from "../sitemapRoutes";
import { SitemapStream } from "sitemap";
import path from "path";
import { createWriteStream } from "fs";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

// console.log(routes);

const BASE_URL =
  process.env.REACT_APP_API_URL || "https://nodeapi.aodour.pk/api/";
const hasRules = (path = "", paramsConfig = {}) => {
  return !!paramsConfig[path];
};

const applyQuery = (paths = [], query = "", value = "") => {
  return paths.map((path) => path.replace(query, value));
};

const applyValues = (paths = [], param = "", values = []) => {
  const query = new RegExp(":" + param);

  values = Array.isArray(values) ? values : [values];

  return values
    .map((value) => applyQuery(paths, query, value))
    .reduce((result, path) => result.concat(path));
};

const replaceParams = (paths = [], params = [], rule = {}) => {
  if (!params.length) {
    return paths;
  }

  const param = params.shift();
  const values = rule[param];

  paths = applyValues(paths, param, values);

  return replaceParams(paths, params, rule);
};

const applyRule = (path = "", rule = {}) => {
  const params = Object.keys(rule);

  return replaceParams([path], params, rule);
};

const applyRules = (path = "", rules = []) => {
  return rules
    .map((rule) => applyRule(path, rule))
    .reduce((result, item) => result.concat(item), [])
    .map((location) => {
      // for each remaining (optional) param group that hasn't been removed, the optional group is removed from the location
      // /foo/bar(/:param) => /foo/bar
      location = location.replace(/\((.*:.*)\)/g, "");

      // remove other parenthesis that might be wrapping params that have been replaced
      // /foo(/:bar) => /foo(/bar-value) => /foo/bar-value
      location = location.replace(/(\(|\))/g, "");

      return location;
    });
};

const applyParams = (paths = [], paramsConfig) => {
  if (!paramsConfig) {
    return paths;
  }

  return paths.reduce((result, path) => {
    if (!hasRules(path, paramsConfig)) {
      return result.concat([path]);
    }

    return result.concat(applyRules(path, paramsConfig[path]));
  }, []);
};

function generateSitemap() {
  axios
    .get(BASE_URL + "menu")
    .then(function ({
      data: {
        result: {
          category: { categories, subcategories, subsubcategories },
          brands: { all_brands },
        },
      },
    }) {
      axios.get(BASE_URL + "products/productvariationlinks").then(
        ({
          data: {
            result: { products },
          },
        }) => {
          const variationLinks = products[0];
          // console.log(variationLinks.length);
          // paths.filter((p) => p !== "/brand/:brandSlug/:varSlug");
          const config = {
            "/shop/:slug": [
              {
                slug: categories.map((category) => category.slug),
              },
            ],
            "/subcategory/:subSlug": [
              {
                subSlug: subcategories.map((subcategory) => subcategory.slug),
              },
            ],
            "/brand/:slug": [
              {
                slug: all_brands.map((brand) => brand.slug),
              },
            ],
            "/shop/:catSlug/:subSubSlug": categories.map((category) => {
              return {
                catSlug: category.slug,
                subSubSlug: subsubcategories
                  .filter((subsubcategory) => {
                    for (const subcategory of subcategories) {
                      if (subsubcategory.category_id === subcategory.id) {
                        if (subcategory.category_id === category.id) {
                          return true;
                        }
                      }
                    }
                    return false;
                  })
                  .map((data) => data.slug),
              };
            }),
            "/brand/:brandSlug/:varSlug": [
              {
                brandSlug: variationLinks.map(
                  (link) => link.productVariationLink
                ),
                varSlug: "",
              },
            ],
          };
          const paths = applyParams(
            routes.map((route) => route.path),
            config
          );
          const hostname = "https://www.aodour.pk";
          const dest = path.resolve("./public", "sitemap.xml");
          // const sitemap = buildSitemap(hostname, paths);
          // fs.writeFileSync(dest, sitemap.toString());
          const sitemap = new SitemapStream({ hostname });
          const writeStream = createWriteStream(dest);
          sitemap.pipe(writeStream);
          sitemap.write({
            url: "/professional-hair",
            changefreq: "daily",
            priority: 0.9,
          });
          // sitemap.write("/page-2");
          // console.log(paths);
          for (const url of paths) {
            sitemap.write({
              url,
              changefreq: "weekly",
              priority: url === "/" ? 1 : 0.8,
            });
          }
          sitemap.end();
        }
      );
    })
    .catch(function (error) {
      console.log(error);
    });
}

generateSitemap();
