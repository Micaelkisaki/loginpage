import { Separator } from "@/components/ui/separator";
import { useState } from "react";

export function AjusteAppPage({ onBack }) {
  const [filter, setFilter] = useState("ajusteApp");
  return (
    <div className="w-full flex-1 flex flex-col">
      {filter === "ajusteApp" ? (
        <div className="flex flex-col items-start w-full">
          <button onClick={onBack}>Voltar</button>
          <Separator />
        </div>
      ) : null}
    </div>
  );
}

export default AjusteAppPage;
