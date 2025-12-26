import { useGetPopularListingQuery } from "@/redux/feature/listing/listing.api";

export default function Popular() {
  const {
    data: popularListin,
    error,
    isLoading,
  } = useGetPopularListingQuery(undefined);
  console.log(popularListin);
  console.log("error", error);
  return <div>this si popolar section</div>;
}
