import Banner from "@/component/home/banner/Banner";
import HowItWork from "@/component/home/howItWork/HowItWork";
import Guaid from "@/component/home/popularGuaid/Guaid";
import Popular from "@/component/home/popularListing/Popular";
import WhyChooseUs from "@/component/home/whyChoseUs/WhyChoseUs";

export default function Home() {
  return (
    <div className="">
      <Banner />
      <HowItWork />
      <Popular />
      <Guaid />
      <WhyChooseUs />
    </div>
  );
}
