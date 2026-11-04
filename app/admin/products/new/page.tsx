import ProductForm from "@/components/admin/product-form";
import { dbReady } from "@/lib/store";
export const dynamic = "force-dynamic";
export default function NewProduct() { return <ProductForm canSave={dbReady()} />; }
