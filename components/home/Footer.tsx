import { Leaf, Heart, Sprout } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-emerald-500/10 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">

          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
              <Leaf className="h-5 w-5" />
            </div>

            <div>
              <h2 className="font-semibold text-foreground">
                আমার বাগান
              </h2>
              <p className="text-xs text-muted-foreground">
                গাছের তথ্য ও পরিচর্যা ব্যবস্থাপনা
              </p>
            </div>
          </div>

          {/* Center */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sprout className="h-4 w-4 text-emerald-500" />

            <span>
              সবুজ থাকুক আমাদের চারপাশ
            </span>
          </div>

          {/* Developer */}
          <div className="text-center text-sm text-muted-foreground md:text-right">
            <p>
              Developed with{" "}
              <Heart className="mx-1 inline h-4 w-4 fill-red-500 text-red-500" />{" "}
              by{" "}
              <a
                href="https://www.azijul.pro.bd"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-emerald-600 transition-colors hover:text-emerald-500"
              >
                Md. Azijul Hakim
              </a>
            </p>

            <p className="mt-1 text-xs">
              © {new Date().getFullYear()} আমার বাগান. All rights reserved.
            </p>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-8 border-t border-border pt-5 text-center">
          <p className="text-xs text-muted-foreground">
            🌱 গাছ লাগান, গাছের যত্ন নিন, সুন্দর ভবিষ্যৎ গড়ে তুলুন।
          </p>
        </div>
      </div>
    </footer>
  );
}