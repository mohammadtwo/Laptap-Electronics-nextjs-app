// components/footer/SocialIcons.tsx
import SocialItem from "./SocialItem";

// آیکون‌های مورد نیاز را از کتابخانه جدید ایمپورت کنید
import { SiInstagram, SiTelegram, SiX } from "@icons-pack/react-simple-icons";

export default function SocialIcons() {
  return (
    <div className="flex items-center gap-4">
      {/* سایز آیکون‌ها را به دلخواه تنظیم کنید */}
      <SocialItem href="#" icon={<SiInstagram size={20} />} />
      <SocialItem href="#" icon={<SiTelegram size={20} />} />
      <SocialItem href="#" icon={<SiX size={20} />} />
    </div>
  );
}
