import { SubscribeForm } from "@/components/subscribe-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@v1/ui/dialog";
import Link from "next/link";
import { SocialLinks } from "./social-links";

export function Footer() {
  return (
    <footer className="border-t-[1px] border-border px-4 md:px-6 pt-10 md:pt-16 overflow-hidden md:max-h-[820px]">
      <div className="container">
        <div className="flex flex-col md:flex-row w-full">
          <div className="flex flex-col space-y-8 md:space-y-0 md:flex-row md:w-6/12 justify-between leading-8">
            <div>
              <span className="font-medium">Features</span>
              <ul>
                <li className="transition-colors text-[#878787]">
                  <Link href="/overview">Overview</Link>
                </li>
                <li className="transition-colors text-[#878787]">
                  <Link href="/inbox">Inbox</Link>
                </li>
                <li className="transition-colors text-[#878787]">
                  <Link href="/vault">Vault</Link>
                </li>
                <li className="transition-colors text-[#878787]">
                  <Link href="/tracker">Tracker</Link>
                </li>
                <li className="transition-colors text-[#878787]">
                  <Link href="/invoice">Invoice</Link>
                </li>
                <li className="transition-colors text-[#878787]">
                  <Link href="/pricing">Pricing</Link>
                </li>
                <li className="transition-colors text-[#878787]">
                  <Link href="/engine">Engine</Link>
                </li>
                <li className="transition-colors text-[#878787]">
                  <Link href="/download">Download</Link>
                </li>
              </ul>
            </div>

            <div>
              <span>Resources</span>
              <ul>
                <li className="transition-colors text-[#878787]">
                  <Link href="https://git.new/midday">Github</Link>
                </li>
                <li className="transition-colors text-[#878787]">
                  <Link href="/support">Support</Link>
                </li>
                <li className="transition-colors text-[#878787]">
                  <Link href="/policy">Privacy policy</Link>
                </li>
                <li className="transition-colors text-[#878787]">
                  <Link href="/terms">Terms and Conditions</Link>
                </li>
                <li className="transition-colors text-[#878787]">
                  <Link href="/branding">Branding</Link>
                </li>
                <li className="transition-colors text-[#878787]">
                  <Link href="/feature-request">Feature Request</Link>
                </li>
              </ul>
            </div>

            <div>
              <span>Company</span>
              <ul>
                <li className="transition-colors text-[#878787]">
                  <Link href="/story">Story</Link>
                </li>
                <li className="transition-colors text-[#878787]">
                  <Link href="/updates">Updates</Link>
                </li>
                <li className="transition-colors text-[#878787]">
                  <Link href="/open-startup">Open startup</Link>
                </li>
                <li className="transition-colors text-[#878787]">
                  <Link href="/oss-friends">OSS friends</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="md:w-6/12 flex mt-8 md:mt-0 md:justify-end">
            <div className="flex md:items-end flex-col">
              <div className="flex items-start md:items-center flex-col md:flex-row space-y-6 md:space-y-0 mb-8">
                <SocialLinks />
              </div>

              <div className="mb-8">
                <Dialog>
                  <DialogTrigger
                    className="text-sm px-4 py-2 bg-secondary text-primary rounded-full font-medium cursor-pointer"
                    asChild
                  >
                    <span>Subscribe</span>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Stay updated</DialogTitle>
                      <DialogDescription>
                        Subscribe to our newsletter to get the latest news and
                        updates.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-4">
                      <SubscribeForm
                        group="v1-newsletter"
                        placeholder="Email your email"
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
