import { CheckCircle } from "lucide-react";
import Button from "@/components/ui/Button";

export default function VoucherSuccess() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="text-center max-w-md">
        <CheckCircle size={64} className="mx-auto text-gold" />
        <h1 className="mt-6 font-heading text-3xl font-bold">
          Děkujeme za nákup!
        </h1>
        <p className="mt-4 text-muted">
          Váš dárkový poukaz byl úspěšně zakoupen. Podrobnosti jsme vám zaslali
          na email.
        </p>
        <div className="mt-8">
          <Button href="/">Zpět na hlavní stránku</Button>
        </div>
      </div>
    </div>
  );
}
