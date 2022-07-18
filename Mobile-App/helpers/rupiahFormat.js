import "intl";
import "intl/locale-data/jsonp/id";

function rupiahFormat(num) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(num);
}

export default rupiahFormat;
