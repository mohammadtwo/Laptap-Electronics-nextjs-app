import { Suspense } from "react";

import AmazingSliderClient from "./AmazingSliderClient";
import AmazingSliderContent from "./AmazingSliderContent";


export default function AmazingSlider() {
  return (
    <Suspense fallback={<AmazingSliderClient />}>
      <AmazingSliderContent />
    </Suspense>
  );
}
