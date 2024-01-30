import { BreadCrumbs } from "~/components/BreadCrumbs";
import { pathname } from "~/configs/path";

export default function ProductPage() {
  return (
    <div>
      <BreadCrumbs hrefs={[pathname.home, pathname.product]} />
    </div>
  );
}
