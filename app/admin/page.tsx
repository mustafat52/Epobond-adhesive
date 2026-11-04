import ProductTable from "@/components/admin/product-table";
import { adminList } from "@/lib/store";
export const dynamic = "force-dynamic";
export default async function AdminHome({ searchParams }: { searchParams: { msg?: string } }) {
  const { products, status, message } = await adminList();
  return <ProductTable products={products} status={status} message={message} flash={searchParams.msg} />;
}
