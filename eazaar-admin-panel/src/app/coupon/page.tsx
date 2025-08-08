import Wrapper from "@/layout/wrapper";
import Breadcrumb from "../components/breadcrumb/breadcrumb";
import CouponArea from "../components/coupon/coupon-area";

const CouponPage = () => {
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100 dark:bg-slate-900 transition-colors duration-300">
        <Breadcrumb title="Coupon" subtitle="Coupon List" />

        <CouponArea />
      </div>
    </Wrapper>
  );
};

export default CouponPage;
